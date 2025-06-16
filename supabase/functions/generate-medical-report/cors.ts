
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export function handleOptionsRequest(): Response {
  return new Response(null, { headers: corsHeaders });
}

export function createErrorResponse(
  error: string,
  code: string,
  status: number = 500,
  details?: string
): Response {
  return new Response(
    JSON.stringify({ 
      success: false,
      error,
      code,
      ...(details && { details })
    }), 
    { 
      status, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    }
  );
}

export function createSuccessResponse(
  analysis: any,
  message: string,
  rawResponse?: string
): Response {
  return new Response(
    JSON.stringify({ 
      success: true,
      analysis,
      message,
      ...(rawResponse && { rawResponse })
    }), 
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    }
  );
}
