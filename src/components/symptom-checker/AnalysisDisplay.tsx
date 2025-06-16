
import { Badge } from "@/components/ui/badge";
import { Info, CheckCircle, AlertTriangle, Clock, ArrowRight } from "lucide-react";

interface Analysis {
  conditions: Array<{ name: string; probability: number; description?: string }>;
  recommendations: string[];
  warnings: string[];
  urgency?: string;
  next_steps?: string;
}

interface AnalysisDisplayProps {
  analysis: Analysis;
}

export const AnalysisDisplay = ({ analysis }: AnalysisDisplayProps) => {
  const getUrgencyColor = (urgency?: string) => {
    switch (urgency?.toLowerCase()) {
      case 'high':
        return 'bg-red-500/20 text-red-300 border-red-400/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      case 'low':
        return 'bg-green-500/20 text-green-300 border-green-400/30';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
    }
  };

  return (
    <div className="space-y-6 pt-4 border-t border-slate-600/50">
      {/* Urgency Level */}
      {analysis.urgency && (
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-slate-400" />
          <span className="text-slate-300 font-medium">Urgency Level:</span>
          <Badge className={getUrgencyColor(analysis.urgency)}>
            {analysis.urgency.toUpperCase()}
          </Badge>
        </div>
      )}

      {/* Possible Conditions */}
      <div>
        <h4 className="font-semibold text-white mb-4 flex items-center">
          <Info className="w-5 h-5 mr-2 text-blue-400" />
          Diagnostic Possibilities
        </h4>
        <div className="space-y-3">
          {analysis.conditions.map((condition, index) => (
            <div key={index} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/30">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-white">{condition.name}</span>
                {condition.probability > 0 && (
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                    {condition.probability}% match
                  </Badge>
                )}
              </div>
              {condition.description && (
                <p className="text-sm text-slate-300 mb-2">{condition.description}</p>
              )}
              {condition.probability > 0 && (
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${condition.probability}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h4 className="font-semibold text-white mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
          Treatment Recommendations
        </h4>
        <div className="space-y-3">
          {analysis.recommendations.map((rec, index) => (
            <div key={index} className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                </div>
                <span className="text-green-100 leading-relaxed">{rec}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warnings */}
      <div>
        <h4 className="font-semibold text-red-300 mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
          Important Warnings
        </h4>
        <div className="space-y-3">
          {analysis.warnings.map((warning, index) => (
            <div key={index} className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-red-100 leading-relaxed">{warning}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      {analysis.next_steps && (
        <div>
          <h4 className="font-semibold text-white mb-4 flex items-center">
            <ArrowRight className="w-5 h-5 mr-2 text-cyan-400" />
            Next Steps
          </h4>
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span className="text-cyan-100 leading-relaxed">{analysis.next_steps}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
