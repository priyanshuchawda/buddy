
import { Analysis } from './types.ts';

export class GeminiService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async analyzeSymptoms(prompt: string): Promise<any> {
    console.log('Sending comprehensive request to Gemini 2.0 Flash API...');

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`,
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
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.3,
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
      console.error('Gemini API error:', response.status, errorText);
      throw new Error(`AI service error: ${response.status}. Please try again later.`);
    }

    return await response.json();
  }

  parseAnalysisResponse(data: any): Analysis {
    console.log('Comprehensive Gemini 2.0 Flash API response received');

    if (!data.candidates || data.candidates.length === 0) {
      console.error('No candidates in Gemini response:', data);
      throw new Error('No analysis could be generated. Please try rephrasing your symptoms.');
    }

    const candidate = data.candidates[0];
    console.log('Candidate finish reason:', candidate.finishReason);
    
    if (candidate.finishReason === 'SAFETY') {
      throw new Error('Content was blocked for safety reasons. Please rephrase your symptoms.');
    }

    if (candidate.finishReason === 'MAX_TOKENS') {
      console.log('Response truncated due to token limit');
      throw new Error('Response was too long. Please try describing fewer symptoms or be more specific.');
    }

    const aiResponse = candidate.content?.parts?.[0]?.text;
    
    if (!aiResponse) {
      console.error('No text content in Gemini response:', candidate);
      throw new Error('Invalid response from AI service. Please try again.');
    }

    console.log('Comprehensive medical analysis received from Gemini 2.0 Flash');

    try {
      const cleanedResponse = aiResponse.replace(/```json\n?|\n?```/g, '').trim();
      const analysis = JSON.parse(cleanedResponse);
      
      this.validateAnalysisStructure(analysis);
      
      console.log('Comprehensive medical analysis completed successfully with Gemini 2.0 Flash');
      return analysis;
    } catch (parseError) {
      console.error('Failed to parse Gemini JSON response:', parseError);
      console.log('Attempting to extract key information from text response...');
      
      // Fallback analysis
      return {
        conditions: [{ 
          name: "Analysis Available", 
          probability: 0, 
          description: "Please see detailed response below" 
        }],
        recommendations: [aiResponse.substring(0, 1500) + (aiResponse.length > 1500 ? '...' : '')],
        warnings: ["Please consult a healthcare professional for proper diagnosis"],
        urgency: "medium",
        next_steps: "Consider consulting with a healthcare provider for comprehensive evaluation and personalized treatment plan"
      };
    }
  }

  private validateAnalysisStructure(analysis: any): void {
    if (!analysis.conditions || !Array.isArray(analysis.conditions)) {
      throw new Error('Invalid analysis structure: missing conditions array');
    }
    
    if (!analysis.recommendations || !Array.isArray(analysis.recommendations)) {
      throw new Error('Invalid analysis structure: missing recommendations array');
    }
    
    if (!analysis.warnings || !Array.isArray(analysis.warnings)) {
      throw new Error('Invalid analysis structure: missing warnings array');
    }
  }
}
