
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send, Shield, Brain } from "lucide-react";

interface SymptomInputProps {
  currentInput: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const SymptomInput = ({ currentInput, isLoading, onInputChange, onSubmit }: SymptomInputProps) => {
  return (
    <Card className="bg-slate-800/80 border-slate-700/50 backdrop-blur-sm shadow-2xl">
      <CardContent className="p-6">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="relative">
            <Textarea
              value={currentInput}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Describe your symptoms in detail (e.g., 'I have a headache, fever of 101°F, and feel extremely tired for the past 2 days')"
              className="min-h-[120px] bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-teal-400/50 focus:ring-teal-400/20 text-base leading-relaxed"
              disabled={isLoading}
            />
            {isLoading && (
              <div className="absolute top-4 right-4">
                <div className="flex items-center gap-2 text-teal-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Analyzing...</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>End-to-end encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                <span>AI-powered analysis</span>
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoading || !currentInput.trim()}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold px-8 py-3 shadow-lg hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Analyze Symptoms
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
