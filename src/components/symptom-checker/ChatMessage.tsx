import { Card, CardContent } from "@/components/ui/card";
import { Brain, AlertCircle } from "lucide-react";
import { AnalysisDisplay } from "./AnalysisDisplay";
import { ReportGenerator } from "../report/ReportGenerator";

interface Analysis {
  conditions: Array<{ name: string; probability: number; description?: string }>;
  recommendations: string[];
  warnings: string[];
  urgency?: string;
  next_steps?: string;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  analysis?: Analysis;
  error?: string;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isError = message.error !== undefined;
  
  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <Card className={`max-w-2xl ${
        message.type === 'user' 
          ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-teal-500/50' 
          : isError
          ? 'bg-red-900/40 border-red-500/50 backdrop-blur-sm text-white'
          : 'bg-slate-800/80 border-slate-700/50 backdrop-blur-sm text-white'
      }`}>
        <CardContent className="p-6">
          <div className="flex items-start gap-3 mb-4">
            {message.type === 'ai' && (
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isError 
                  ? 'bg-gradient-to-br from-red-500 to-red-600' 
                  : 'bg-gradient-to-br from-teal-500 to-cyan-500'
              }`}>
                {isError ? (
                  <AlertCircle className="w-4 h-4 text-white" />
                ) : (
                  <Brain className="w-4 h-4 text-white" />
                )}
              </div>
            )}
            <div className="flex-1">
              <p className={`font-medium mb-2 ${isError ? 'text-red-100' : ''}`}>
                {message.content}
              </p>
              {isError && (
                <div className="text-xs bg-red-800/30 border border-red-600/30 rounded px-2 py-1 mb-2">
                  Error Code: {message.error}
                </div>
              )}
              <p className="text-xs opacity-70">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
          
          {message.analysis && !isError && (
            <div className="space-y-6">
              <AnalysisDisplay analysis={message.analysis} />
              <ReportGenerator 
                analysis={message.analysis} 
                symptoms={message.content}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
