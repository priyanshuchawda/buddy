
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

interface QuickSymptomSelectionProps {
  onSymptomClick: (symptom: string) => void;
}

export const QuickSymptomSelection = ({ onSymptomClick }: QuickSymptomSelectionProps) => {
  const commonSymptoms = [
    "Headache", "Fever", "Cough", "Fatigue", "Nausea", 
    "Sore throat", "Body aches", "Dizziness", "Chest pain", "Shortness of breath"
  ];

  return (
    <Card className="mb-8 bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-teal-400" />
          Quick Symptom Selection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {commonSymptoms.map((symptom) => (
            <Badge
              key={symptom}
              variant="outline"
              className="cursor-pointer bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-teal-500/20 hover:border-teal-400/50 hover:text-teal-300 transition-all duration-300 px-4 py-2"
              onClick={() => onSymptomClick(symptom)}
            >
              {symptom}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
