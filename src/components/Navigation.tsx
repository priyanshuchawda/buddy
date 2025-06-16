
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Stethoscope, Brain, Activity, User, Settings, BookOpen, FileText } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-teal-500/25 transition-all duration-300 transform group-hover:scale-110">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">MedicalAI</span>
              <Badge className="bg-teal-500/20 text-teal-300 border-teal-400/30 text-xs px-2 py-0">
                <Brain className="w-3 h-3 mr-1" />
                Gemini 2.0
              </Badge>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/checker" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive('/checker') 
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-400/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span className="font-medium">Symptom Checker</span>
            </Link>
            
            <Link 
              to="/how-it-works" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive('/how-it-works') 
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-400/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="font-medium">Technology</span>
            </Link>
            
            <Link 
              to="/health-log" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive('/health-log') 
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-400/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span className="font-medium">Health Log</span>
            </Link>
            
            <Link 
              to="/settings" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive('/settings') 
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-400/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span className="font-medium">Settings</span>
            </Link>
            
            <Link to="/profile">
              <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold px-6 py-2 shadow-lg hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-800/50 transition-all duration-300"
            >
              <span className="sr-only">Open menu</span>
              <div className="w-6 h-6 relative">
                {isMenuOpen ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-0.5 bg-current transform rotate-45 absolute"></div>
                    <div className="w-4 h-0.5 bg-current transform -rotate-45 absolute"></div>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="w-6 h-0.5 bg-current"></div>
                    <div className="w-6 h-0.5 bg-current"></div>
                    <div className="w-6 h-0.5 bg-current"></div>
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-700/50">
            <div className="px-4 py-6 space-y-4 bg-slate-900/95">
              <Link 
                to="/checker" 
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <Activity className="w-5 h-5" />
                <span className="font-medium">Symptom Checker</span>
              </Link>
              <Link 
                to="/how-it-works" 
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="w-5 h-5" />
                <span className="font-medium">Technology</span>
              </Link>
              <Link 
                to="/health-log" 
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText className="w-5 h-5" />
                <span className="font-medium">Health Log</span>
              </Link>
              <Link 
                to="/settings" 
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </Link>
              <Link 
                to="/profile"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Profile</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
