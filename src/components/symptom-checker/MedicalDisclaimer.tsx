
import { Shield } from "lucide-react";

export const MedicalDisclaimer = () => {
  return (
    <div className="mt-8 bg-amber-500/10 border border-amber-400/30 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <Shield className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
        <div className="space-y-2">
          <h4 className="font-semibold text-amber-300">Medical Disclaimer</h4>
          <p className="text-sm text-amber-100/80 leading-relaxed">
            This AI-powered diagnostic tool provides general health information based on symptom analysis. 
            It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult 
            qualified healthcare providers for medical emergencies or serious health concerns. In emergency 
            situations, contact emergency services immediately.
          </p>
        </div>
      </div>
    </div>
  );
};
