
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Trash2, Calendar, Clock, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HealthLogEntry {
  id: string;
  date: string;
  symptoms: string;
  analysis: {
    conditions: Array<{ name: string; probability: number }>;
    recommendations: string[];
    warnings: string[];
  };
}

const HealthLog = () => {
  const [healthLog, setHealthLog] = useState<HealthLogEntry[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedLog = localStorage.getItem('healthLog');
    if (savedLog) {
      setHealthLog(JSON.parse(savedLog));
    }
  }, []);

  const deleteEntry = (id: string) => {
    const updatedLog = healthLog.filter(entry => entry.id !== id);
    setHealthLog(updatedLog);
    localStorage.setItem('healthLog', JSON.stringify(updatedLog));
    toast({
      title: "Entry Deleted",
      description: "Health log entry has been removed.",
    });
  };

  const clearAllEntries = () => {
    setHealthLog([]);
    localStorage.setItem('healthLog', JSON.stringify([]));
    toast({
      title: "Log Cleared",
      description: "All health log entries have been removed.",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navigation />
      
      <div className="pt-20 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Health Log
            </h1>
            <p className="text-lg text-gray-600">
              Track your symptom checks and health insights over time
            </p>
          </div>

          {healthLog.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Health Records Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start using the symptom checker to build your health log
                </p>
                <Button asChild>
                  <a href="/checker">Check Symptoms Now</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="text-sm">
                    {healthLog.length} {healthLog.length === 1 ? 'Entry' : 'Entries'}
                  </Badge>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearAllEntries}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>

              <div className="space-y-6">
                {healthLog.map((entry) => (
                  <Card key={entry.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            {formatDate(entry.date)}
                          </CardTitle>
                          <p className="text-gray-600 mt-2">
                            <strong>Symptoms:</strong> {entry.symptoms}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteEntry(entry.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-6">
                        {/* Conditions */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Possible Conditions
                          </h4>
                          <div className="space-y-2">
                            {entry.analysis.conditions.map((condition, index) => (
                              <div key={index} className="flex justify-between items-center text-sm">
                                <span>{condition.name}</span>
                                <Badge variant="secondary">{condition.probability}%</Badge>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Recommendations */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Recommendations
                          </h4>
                          <ul className="space-y-1">
                            {entry.analysis.recommendations.slice(0, 3).map((rec, index) => (
                              <li key={index} className="text-sm text-gray-700 flex items-start">
                                <span className="text-green-600 mr-2">•</span>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Warnings */}
                        <div>
                          <h4 className="font-semibold text-red-700 mb-3">
                            Warnings
                          </h4>
                          <ul className="space-y-1">
                            {entry.analysis.warnings.slice(0, 2).map((warning, index) => (
                              <li key={index} className="text-sm text-red-700 flex items-start">
                                <span className="text-red-600 mr-2">•</span>
                                {warning}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthLog;
