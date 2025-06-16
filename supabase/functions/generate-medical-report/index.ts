
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { handleOptionsRequest, createErrorResponse, createSuccessResponse } from './cors.ts';

interface ReportRequest {
  analysisData: any;
  userProfile: any;
  symptoms: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return handleOptionsRequest();
  }

  try {
    const geminiApiKey2 = Deno.env.get('GEMINI_API_KEY_2');
    
    if (!geminiApiKey2) {
      console.error('GEMINI_API_KEY_2 not found in environment variables');
      return createErrorResponse(
        'Report generation API key not configured. Please contact support.',
        'API_KEY_MISSING',
        500
      );
    }

    const { analysisData, userProfile, symptoms }: ReportRequest = await req.json();

    if (!analysisData) {
      return createErrorResponse(
        'Analysis data is required for report generation',
        'INVALID_INPUT',
        400
      );
    }

    console.log('Processing medical report generation request');

    const reportPrompt = generateReportPrompt(analysisData, userProfile, symptoms);
    
    console.log('Generated comprehensive prompt for medical report using Gemini API Key 2');
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey2}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: reportPrompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            topK: 32,
            topP: 1,
            maxOutputTokens: 4096,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH", 
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API 2 error:', response.status, errorText);
      throw new Error(`Report generation service error: ${response.status}. Please try again later.`);
    }

    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      console.error('No candidates in Gemini response:', data);
      throw new Error('No report could be generated. Please try again.');
    }

    const candidate = data.candidates[0];
    
    if (candidate.finishReason === 'SAFETY') {
      throw new Error('Content was blocked for safety reasons. Please try again.');
    }

    const reportContent = candidate.content?.parts?.[0]?.text;
    
    if (!reportContent) {
      console.error('No text content in Gemini response:', candidate);
      throw new Error('Invalid response from report generation service. Please try again.');
    }

    console.log('Medical report generated successfully using Gemini API Key 2');
    
    return createSuccessResponse(
      { reportContent },
      'Medical report generated successfully'
    );

  } catch (error) {
    console.error('Unexpected error in generate-medical-report function:', error);
    
    return createErrorResponse(
      'An unexpected error occurred while generating the report. Please try again later.',
      'INTERNAL_ERROR',
      500,
      error.message
    );
  }
});

function generateReportPrompt(analysisData: any, userProfile: any, symptoms: string): string {
  const patientInfo = userProfile ? `
Patient Information:
- Name: ${userProfile.name || 'N/A'}
- Age: ${userProfile.age || 'N/A'}
- Gender: ${userProfile.gender || 'N/A'}
- Height: ${userProfile.height || 'N/A'} cm
- Weight: ${userProfile.weight || 'N/A'} kg
- Medical Conditions: ${userProfile.conditions?.join(', ') || 'None reported'}
- Current Medications: ${userProfile.medications || 'None reported'}
- Known Allergies: ${userProfile.allergies || 'None reported'}
` : 'Patient information not provided';

  const conditionsText = analysisData.conditions?.map((c: any) => 
    `${c.name} (${c.probability}% probability): ${c.description}`
  ).join('\n') || 'No conditions analyzed';

  const recommendationsText = analysisData.recommendations?.join('\n') || 'No recommendations provided';
  const warningsText = analysisData.warnings?.join('\n') || 'No warnings provided';

  return `You are a medical professional creating a comprehensive medical report. Based on the AI analysis provided below, generate a professional medical report in a structured format suitable for healthcare providers.

${patientInfo}

Chief Complaint: ${symptoms}

AI Analysis Results:
Urgency Level: ${analysisData.urgency || 'Not specified'}

Possible Conditions:
${conditionsText}

Recommendations:
${recommendationsText}

Warnings and Precautions:
${warningsText}

Next Steps:
${analysisData.next_steps || 'Not specified'}

Please create a comprehensive medical report that includes:

1. **PATIENT SUMMARY** - Brief overview of patient demographics and chief complaint
2. **CLINICAL ASSESSMENT** - Professional interpretation of the symptoms and possible conditions
3. **DIFFERENTIAL DIAGNOSIS** - List of potential conditions with clinical reasoning
4. **RECOMMENDED INVESTIGATIONS** - Suggested tests, examinations, or consultations
5. **TREATMENT RECOMMENDATIONS** - Proposed management plan including medications, lifestyle changes
6. **FOLLOW-UP CARE** - Monitoring plan and when to seek further medical attention
7. **PATIENT EDUCATION** - Important information for the patient about their condition
8. **MEDICAL DISCLAIMERS** - Professional disclaimers about AI-assisted analysis

Format the report professionally with clear headings, proper medical terminology, and maintain a clinical tone throughout. The report should be suitable for sharing with healthcare providers and serve as a comprehensive medical document.

IMPORTANT: This is an AI-assisted analysis and should be clearly stated in the report. Include appropriate medical disclaimers about the need for professional medical evaluation.`;
}
