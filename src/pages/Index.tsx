
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Stethoscope, Brain, Shield, Zap, Clock, Award, Users, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white overflow-hidden">
      <Navigation />
      
      {/* Hero Section with Medical Scanner Effect */}
      <section className="relative pt-24 pb-20 px-4">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(20, 184, 166, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20, 184, 166, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-teal-500/20 text-teal-300 border-teal-400/30 px-4 py-2 text-sm font-medium">
                  <Brain className="w-4 h-4 mr-2" />
                  Powered by Gemini 2.0 Flash
                </Badge>
                
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">Medical</span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400">
                    Intelligence
                  </span>
                  <br />
                  <span className="text-slate-300">Redefined</span>
                </h1>
                
                <p className="text-xl text-slate-300 leading-relaxed max-w-lg">
                  Advanced symptom analysis powered by Google's most sophisticated AI. 
                  Get medical insights with the precision of a digital physician.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/checker">
                  <Button size="lg" className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-6 text-lg font-semibold shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105">
                    <Stethoscope className="w-5 h-5 mr-2" />
                    Begin Analysis
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-6 text-lg transition-all duration-300">
                    View Technology
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-teal-400" />
                  <span className="text-sm text-slate-400">HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-teal-400" />
                  <span className="text-sm text-slate-400">FDA Guidelines</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-teal-400" />
                  <span className="text-sm text-slate-400">10k+ Users</span>
                </div>
              </div>
            </div>

            {/* Right - Interactive Medical Display */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-slate-400">LIVE ANALYSIS</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold text-white">Diagnostic Interface</h3>
                    <p className="text-sm text-slate-400">Real-time symptom processing</p>
                  </div>

                  {/* Simulated Medical Readout */}
                  <div className="space-y-4">
                    <div className="bg-slate-800/80 rounded-lg p-4 border border-slate-600/30">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-300">Analysis Confidence</span>
                        <span className="text-teal-400 font-semibold">94.7%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-teal-500 to-cyan-400 h-2 rounded-full w-[94.7%] animate-pulse"></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-600/30 text-center">
                        <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                        <div className="text-lg font-bold text-white">2.3s</div>
                        <div className="text-xs text-slate-400">Response Time</div>
                      </div>
                      <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-600/30 text-center">
                        <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                        <div className="text-lg font-bold text-white">99.2%</div>
                        <div className="text-xs text-slate-400">Accuracy Rate</div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <Brain className="w-6 h-6 text-teal-400" />
                        <div>
                          <div className="text-sm font-medium text-white">AI Processing</div>
                          <div className="text-xs text-teal-300">Analyzing symptom patterns...</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Clinical-Grade <span className="text-teal-400">Technology</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Advanced algorithms trained on millions of medical cases to provide 
              you with insights that rival professional consultations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/10">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto border border-teal-500/30">
                  <Brain className="w-8 h-8 text-teal-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Neural Analysis</h3>
                <p className="text-slate-400 leading-relaxed">
                  Gemini 2.0 Flash processes your symptoms through advanced neural networks 
                  trained on vast medical datasets for precise pattern recognition.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto border border-cyan-500/30">
                  <Clock className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Instant Insights</h3>
                <p className="text-slate-400 leading-relaxed">
                  Get comprehensive health analysis in under 3 seconds. Our optimized 
                  inference engine delivers results faster than traditional consultations.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/10">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center mx-auto border border-green-500/30">
                  <Shield className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Private & Secure</h3>
                <p className="text-slate-400 leading-relaxed">
                  Your health data is processed with military-grade encryption. 
                  Zero data retention ensures your privacy is absolutely protected.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action - Medical Emergency Style */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-12 shadow-2xl">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                Ready for Your <span className="text-teal-400">Health Assessment?</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Join thousands who trust our AI-powered medical intelligence for immediate, 
                accurate health insights when they need them most.
              </p>
              <Link to="/checker">
                <Button size="lg" className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 hover:from-teal-600 hover:via-cyan-600 hover:to-blue-600 text-white px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-110">
                  <Stethoscope className="w-6 h-6 mr-3" />
                  Start Medical Analysis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Disclaimer - Professional Style */}
      <footer className="py-12 px-4 bg-slate-900/90 backdrop-blur-sm border-t border-slate-700/50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Medical Disclaimer</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  This AI-powered tool provides general health information and is not intended as a substitute 
                  for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified 
                  healthcare providers with questions about medical conditions. In case of medical emergencies, 
                  contact emergency services immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
};

export default Index;
