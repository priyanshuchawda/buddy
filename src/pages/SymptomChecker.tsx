import { useState, useRef, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { StatusIndicators } from "@/components/symptom-checker/StatusIndicators";
import { QuickSymptomSelection } from "@/components/symptom-checker/QuickSymptomSelection";
import { ChatMessage } from "@/components/symptom-checker/ChatMessage";
import { SymptomInput } from "@/components/symptom-checker/SymptomInput";
import { MedicalDisclaimer } from "@/components/symptom-checker/MedicalDisclaimer";
import { ProfileCompletionPrompt } from "@/components/ProfileCompletionPrompt";
import { useProfileValidation } from "@/hooks/useProfileValidation";
import { supabase } from "@/integrations/supabase/client";

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

const SymptomChecker = () => {
  const { isProfileComplete, isLoading: profileLoading } = useProfileValidation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSymptomClick = (symptom: string) => {
    setCurrentInput(prev => prev ? `${prev}, ${symptom.toLowerCase()}` : symptom.toLowerCase());
  };

  const analyzeSymptoms = async (symptoms: string) => {
    setIsLoading(true);
    console.log('Starting symptom analysis for:', symptoms);
    
    try {
      // Get user profile from localStorage
      const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
      
      const { data, error } = await supabase.functions.invoke('analyze-symptoms', {
        body: { 
          symptoms,
          userProfile 
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Analysis failed: ${error.message}`);
      }

      if (!data) {
        throw new Error('No response received from analysis service');
      }

      if (!data.success) {
        console.error('Analysis service error:', data);
        
        const aiMessage: Message = {
          id: Date.now().toString(),
          type: 'ai',
          content: `Analysis failed: ${data.error || 'Unknown error'}`,
          timestamp: new Date(),
          error: data.code || 'ANALYSIS_ERROR'
        };

        setMessages(prev => [...prev, aiMessage]);
        
        toast({
          title: "Analysis Error",
          description: data.error || "Failed to analyze symptoms. Please try again.",
          variant: "destructive"
        });
        
        return;
      }

      console.log('Analysis completed successfully:', data);

      const aiMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: data.message || `Analysis complete for symptoms: ${symptoms}`,
        timestamp: new Date(),
        analysis: data.analysis
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Save to health log
      const healthLog = JSON.parse(localStorage.getItem('healthLog') || '[]');
      healthLog.push({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        symptoms,
        analysis: data.analysis,
        source: 'gemini-2.5-flash-preview-05-20'
      });
      localStorage.setItem('healthLog', JSON.stringify(healthLog));

      // Show success message
      toast({
        title: "Analysis Complete",
        description: "Your symptoms have been analyzed successfully.",
        variant: "default"
      });

    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: `Error: ${error.message}`,
        timestamp: new Date(),
        error: 'NETWORK_ERROR'
      };

      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Failed to connect to analysis service. Please check your connection and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    console.log('Submitting symptoms:', currentInput);

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const symptoms = currentInput;
    setCurrentInput("");

    await analyzeSymptoms(symptoms);
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
        <Navigation />
        <div className="pt-24 pb-8 px-4 flex items-center justify-center">
          <div className="text-center">
            <Brain className="w-12 h-12 mx-auto mb-4 text-teal-400 animate-pulse" />
            <p className="text-white">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isProfileComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
        <Navigation />
        <div className="pt-24 pb-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 space-y-6">
              <div className="inline-flex items-center gap-3 bg-teal-500/20 border border-teal-400/30 rounded-full px-6 py-3">
                <Brain className="w-5 h-5 text-teal-400" />
                <span className="text-teal-300 font-medium">Medical Intelligence Console</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Complete Your <span className="text-teal-400">Health Profile</span>
              </h1>
            </div>
            <ProfileCompletionPrompt />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
      <Navigation />
      
      <div className="pt-24 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 space-y-6">
            <div className="inline-flex items-center gap-3 bg-teal-500/20 border border-teal-400/30 rounded-full px-6 py-3">
              <Brain className="w-5 h-5 text-teal-400" />
              <span className="text-teal-300 font-medium">Gemini 2.5 Flash Preview Analysis</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Medical Intelligence <span className="text-teal-400">Console</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Advanced symptom analysis powered by Google's latest Gemini 2.5 Flash Preview model. 
              Describe your symptoms for instant medical insights with comprehensive error handling.
            </p>
          </div>

          <StatusIndicators />

          {messages.length === 0 && (
            <QuickSymptomSelection onSymptomClick={handleSymptomClick} />
          )}

          {/* Chat Messages */}
          <div className="space-y-6 mb-8 max-h-[600px] overflow-y-auto custom-scrollbar">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <SymptomInput
            currentInput={currentInput}
            isLoading={isLoading}
            onInputChange={setCurrentInput}
            onSubmit={handleSubmit}
          />

          <MedicalDisclaimer />
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(20, 184, 166, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(20, 184, 166, 0.7);
        }
      `}</style>
    </div>
  );
};

export default SymptomChecker;
