
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ReportDisplay } from "./ReportDisplay";

interface Analysis {
  conditions: Array<{ name: string; probability: number; description?: string }>;
  recommendations: string[];
  warnings: string[];
  urgency?: string;
  next_steps?: string;
}

interface ReportGeneratorProps {
  analysis: Analysis;
  symptoms: string;
}

export const ReportGenerator = ({ analysis, symptoms }: ReportGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportContent, setReportContent] = useState<string | null>(null);
  const { toast } = useToast();

  const generateReport = async () => {
    setIsGenerating(true);
    console.log('Starting medical report generation...');
    
    try {
      // Get user profile from localStorage
      const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
      
      const { data, error } = await supabase.functions.invoke('generate-medical-report', {
        body: { 
          analysisData: analysis,
          userProfile,
          symptoms
        }
      });

      if (error) {
        console.error('Report generation error:', error);
        throw new Error(`Report generation failed: ${error.message}`);
      }

      if (!data || !data.success) {
        console.error('Report generation service error:', data);
        throw new Error(data?.error || 'Failed to generate report');
      }

      console.log('Medical report generated successfully:', data);
      
      // Extract the report content from the response
      const reportText = data.analysis?.reportContent || data.reportContent;
      
      if (!reportText) {
        throw new Error('No report content received from the service');
      }
      
      setReportContent(reportText);
      
      // Save report to health log
      const healthLog = JSON.parse(localStorage.getItem('healthLog') || '[]');
      const reportEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        type: 'medical-report',
        symptoms,
        analysis,
        reportContent: reportText,
        source: 'gemini-2.0-flash-report-generator'
      };
      healthLog.push(reportEntry);
      localStorage.setItem('healthLog', JSON.stringify(healthLog));

      toast({
        title: "Report Generated",
        description: "Your medical report has been generated successfully.",
        variant: "default"
      });

    } catch (error) {
      console.error('Error generating report:', error);
      
      toast({
        title: "Report Generation Failed",
        description: error.message || "Failed to generate report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (reportContent) {
    return <ReportDisplay reportContent={reportContent} symptoms={symptoms} />;
  }

  return (
    <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-500/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-white">
          <FileText className="w-6 h-6 text-blue-400" />
          Generate Medical Report
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-slate-300">
          Generate a comprehensive medical report based on your symptom analysis. 
          This report will be formatted professionally and can be downloaded as a PDF.
        </p>
        
        <div className="space-y-2">
          <h4 className="font-medium text-white">Report will include:</h4>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>• Patient summary and clinical assessment</li>
            <li>• Differential diagnosis with medical reasoning</li>
            <li>• Recommended investigations and treatments</li>
            <li>• Follow-up care and patient education</li>
            <li>• Professional medical disclaimers</li>
          </ul>
        </div>

        <Button 
          onClick={generateReport} 
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating Report...
            </>
          ) : (
            <>
              <FileText className="w-5 h-5 mr-2" />
              Generate Medical Report
            </>
          )}
        </Button>

        <p className="text-xs text-slate-400">
          This report is generated using AI analysis and should be reviewed by a qualified healthcare professional.
        </p>
      </CardContent>
    </Card>
  );
};
