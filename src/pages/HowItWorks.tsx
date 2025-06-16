
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { ArrowDown } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Describe Your Symptoms",
      description: "Tell our AI about how you're feeling using natural language. Be as detailed as possible.",
      icon: "💬"
    },
    {
      number: "02", 
      title: "AI Analysis",
      description: "Google's Gemini 2.0 Flash model processes your symptoms using advanced medical knowledge.",
      icon: "🤖"
    },
    {
      number: "03",
      title: "Get Insights",
      description: "Receive possible conditions, personalized recommendations, and important warnings.",
      icon: "🩺"
    },
    {
      number: "04",
      title: "Take Action",
      description: "Follow the AI's guidance while always consulting healthcare professionals when needed.",
      icon: "✅"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered symptom checker uses Google's latest Gemini 2.0 Flash model 
              to provide you with intelligent health insights in four simple steps.
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={step.number}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-2xl">{step.icon}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <span className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                            STEP {step.number}
                          </span>
                          <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                        </div>
                        <p className="text-gray-600 text-lg">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-4">
                    <ArrowDown className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Technology Section */}
          <div className="mt-16">
            <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
              <CardHeader>
                <CardTitle className="text-center text-2xl md:text-3xl">
                  Powered by Google Gemini 2.0 Flash
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg mb-6 opacity-90">
                  Our symptom checker leverages the latest AI technology from Google, 
                  providing fast, accurate, and contextually aware health insights.
                </p>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl mb-2">⚡</div>
                    <h4 className="font-semibold">Lightning Fast</h4>
                    <p className="text-sm opacity-80">Results in seconds</p>
                  </div>
                  <div>
                    <div className="text-3xl mb-2">🎯</div>
                    <h4 className="font-semibold">Highly Accurate</h4>
                    <p className="text-sm opacity-80">Advanced AI reasoning</p>
                  </div>
                  <div>
                    <div className="text-3xl mb-2">🧠</div>
                    <h4 className="font-semibold">Contextual</h4>
                    <p className="text-sm opacity-80">Considers your profile</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Important Disclaimers */}
          <div className="mt-12 space-y-4">
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-6">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Medical Disclaimer</h4>
                <p className="text-yellow-700 text-sm">
                  This AI tool is designed for informational purposes only and should not replace 
                  professional medical advice, diagnosis, or treatment. Always consult with qualified 
                  healthcare professionals for medical concerns.
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <h4 className="font-semibold text-red-800 mb-2">🚨 Emergency Situations</h4>
                <p className="text-red-700 text-sm">
                  For medical emergencies, call emergency services (911) immediately. 
                  Do not rely on this tool for emergency medical situations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
