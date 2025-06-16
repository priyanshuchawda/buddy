
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Zap, Brain, Shield } from "lucide-react";

export const StatusIndicators = () => {
  return (
    <div className="grid md:grid-cols-4 gap-4 mb-8">
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-green-400" />
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div className="text-sm font-medium text-white">AI Status</div>
          <div className="text-xs text-green-400">Online</div>
        </CardContent>
      </Card>
      
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardContent className="p-4 text-center">
          <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
          <div className="text-sm font-medium text-white">Response Time</div>
          <div className="text-xs text-yellow-400">~2.3s avg</div>
        </CardContent>
      </Card>
      
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardContent className="p-4 text-center">
          <Brain className="w-5 h-5 text-teal-400 mx-auto mb-2" />
          <div className="text-sm font-medium text-white">Model</div>
          <div className="text-xs text-teal-400">Gemini 2.0 Flash</div>
        </CardContent>
      </Card>
      
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardContent className="p-4 text-center">
          <Shield className="w-5 h-5 text-blue-400 mx-auto mb-2" />
          <div className="text-sm font-medium text-white">Privacy</div>
          <div className="text-xs text-blue-400">Encrypted</div>
        </CardContent>
      </Card>
    </div>
  );
};
