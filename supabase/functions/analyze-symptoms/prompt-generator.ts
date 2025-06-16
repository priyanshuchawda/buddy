
export function generateAnalysisPrompt(symptoms: string, profileContext: string): string {
  return `As a comprehensive medical AI assistant, analyze the following symptoms and provide detailed medical insights with practical guidance.

${profileContext}

Symptoms: ${symptoms}

Please provide an exhaustive analysis in this exact JSON format (no additional text):
{
  "conditions": [
    {
      "name": "Condition Name",
      "probability": 75,
      "description": "Detailed description including pathophysiology, causes, typical progression, complications, and how it specifically relates to the presented symptoms. Include differential diagnosis considerations."
    }
  ],
  "recommendations": [
    "MEDICATIONS: List specific over-the-counter medications, dosages, and frequency. Include prescription medications that might be needed (patient should consult doctor for prescription).",
    "HOME REMEDIES: Detailed natural treatments, herbal remedies, dietary modifications, rest recommendations, hydration guidelines, and self-care measures.",
    "LIFESTYLE CHANGES: Specific modifications to daily routine, exercise recommendations, sleep hygiene, stress management techniques.",
    "DIETARY RECOMMENDATIONS: Foods to eat, foods to avoid, nutritional supplements, meal timing and portion recommendations.",
    "PHYSICAL THERAPY: Exercises, stretches, posture corrections, movement restrictions or recommendations.",
    "MONITORING: What symptoms to track, how often to check vitals, when to measure improvement."
  ],
  "warnings": [
    "RED FLAGS: Immediate emergency signs that require 911/emergency care (e.g., chest pain, difficulty breathing, severe bleeding).",
    "SEEK IMMEDIATE CARE: Symptoms requiring urgent medical attention within hours.",
    "MEDICATION WARNINGS: Drug interactions, contraindications based on allergies and current medications, side effects to watch for.",
    "SAFETY PRECAUTIONS: Activities to avoid, when not to drive, work restrictions, isolation recommendations if contagious.",
    "COMPLICATION ALERTS: Signs that condition is worsening or developing complications."
  ],
  "urgency": "low",
  "next_steps": "IMMEDIATE ACTIONS: What to do in the next 24-48 hours. FOLLOW-UP CARE: When to schedule doctor appointments, what type of specialist to see, what tests might be needed. MONITORING PLAN: How to track symptoms, when to reassess, criteria for seeking additional care. PREVENTION: Steps to prevent recurrence or worsening. EXPECTED TIMELINE: How long symptoms typically last and when to expect improvement."
}

IMPORTANT ANALYSIS REQUIREMENTS:
- Consider patient's age, gender, BMI, medical history, current medications, and known allergies for ALL recommendations
- Provide specific medication names, dosages, and frequencies where appropriate
- Include detailed home remedies with preparation instructions
- List specific foods, exercises, and lifestyle modifications
- Mention safety precautions and contraindications
- Include progressive care plans (what to try first, then what to try if no improvement)
- Address medication interactions with current medications and allergies
- Provide realistic timelines for improvement
- Include prevention strategies for future occurrences
- Consider cultural and dietary preferences when possible
- Provide both conventional and alternative treatment options
- Include mental health considerations if relevant
- Address work/activity restrictions if needed`;
}
