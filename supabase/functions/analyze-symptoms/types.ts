
export interface UserProfile {
  name?: string;
  age?: string;
  gender?: string;
  height?: string;
  weight?: string;
  conditions?: string[];
  medications?: string;
  allergies?: string;
}

export interface SymptomRequest {
  symptoms: string;
  userProfile?: UserProfile;
}

export interface AnalysisCondition {
  name: string;
  probability: number;
  description: string;
}

export interface Analysis {
  conditions: AnalysisCondition[];
  recommendations: string[];
  warnings: string[];
  urgency: string;
  next_steps: string;
}

export interface ApiResponse {
  success: boolean;
  analysis?: Analysis;
  message?: string;
  error?: string;
  code?: string;
  details?: string;
  rawResponse?: string;
}
