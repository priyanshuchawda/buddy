
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SymptomRequest } from './types.ts';
import { handleOptionsRequest, createErrorResponse, createSuccessResponse } from './cors.ts';
import { buildProfileContext } from './profile-processor.ts';
import { generateAnalysisPrompt } from './prompt-generator.ts';
import { GeminiService } from './gemini-service.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return handleOptionsRequest();
  }

  try {
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    
    if (!geminiApiKey) {
      console.error('GEMINI_API_KEY not found in environment variables');
      return createErrorResponse(
        'API key not configured. Please contact support.',
        'API_KEY_MISSING',
        500
      );
    }

    const { symptoms, userProfile }: SymptomRequest = await req.json();

    if (!symptoms || symptoms.trim().length === 0) {
      return createErrorResponse(
        'Symptoms description is required',
        'INVALID_INPUT',
        400
      );
    }

    console.log('Processing symptoms analysis request:', {
      symptomsLength: symptoms.length,
      hasProfile: !!userProfile,
      profileKeys: userProfile ? Object.keys(userProfile) : []
    });

    const profileContext = buildProfileContext(userProfile);
    const prompt = generateAnalysisPrompt(symptoms, profileContext);
    
    console.log('Generated comprehensive prompt for Gemini 2.0 Flash analysis');
    
    const geminiService = new GeminiService(geminiApiKey);
    
    try {
      const data = await geminiService.analyzeSymptoms(prompt);
      const analysis = geminiService.parseAnalysisResponse(data);
      
      console.log('Analysis result:', {
        conditionsCount: analysis.conditions?.length || 0,
        recommendationsCount: analysis.recommendations?.length || 0,
        warningsCount: analysis.warnings?.length || 0,
        urgency: analysis.urgency,
        hasNextSteps: !!analysis.next_steps
      });
      
      return createSuccessResponse(
        analysis,
        'Comprehensive symptom analysis with detailed medical guidance completed using Gemini 2.0 Flash'
      );
    } catch (geminiError: any) {
      console.error('Gemini service error:', geminiError);
      
      if (geminiError.message.includes('safety reasons')) {
        return createErrorResponse(geminiError.message, 'SAFETY_BLOCK', 400);
      }
      if (geminiError.message.includes('too long')) {
        return createErrorResponse(geminiError.message, 'MAX_TOKENS', 400);
      }
      if (geminiError.message.includes('AI service error')) {
        return createErrorResponse(geminiError.message, 'GEMINI_API_ERROR', 500);
      }
      return createErrorResponse(geminiError.message, 'ANALYSIS_ERROR', 500);
    }

  } catch (error) {
    console.error('Unexpected error in analyze-symptoms function:', error);
    
    return createErrorResponse(
      'An unexpected error occurred. Please try again later.',
      'INTERNAL_ERROR',
      500,
      error.message
    );
  }
});
