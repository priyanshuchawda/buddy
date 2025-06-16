
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Stethoscope, MapPin, FileText } from "lucide-react";
import { MedicalMaps } from "./maps/MedicalMaps";

interface TabsWithMapsProps {
  children: React.ReactNode;
  reportTab?: React.ReactNode;
}

export const TabsWithMaps = ({ children, reportTab }: TabsWithMapsProps) => {
  return (
    <Tabs defaultValue="analysis" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700/50">
        <TabsTrigger 
          value="analysis" 
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500/20 data-[state=active]:to-cyan-500/20 data-[state=active]:text-white"
        >
          <Stethoscope className="w-4 h-4 mr-2" />
          Analysis
        </TabsTrigger>
        <TabsTrigger 
          value="maps"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500/20 data-[state=active]:to-teal-500/20 data-[state=active]:text-white"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Find Care
        </TabsTrigger>
        {reportTab && (
          <TabsTrigger 
            value="report"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-white"
          >
            <FileText className="w-4 h-4 mr-2" />
            Report
          </TabsTrigger>
        )}
      </TabsList>
      
      <TabsContent value="analysis" className="mt-6">
        {children}
      </TabsContent>
      
      <TabsContent value="maps" className="mt-6">
        <MedicalMaps />
      </TabsContent>
      
      {reportTab && (
        <TabsContent value="report" className="mt-6">
          {reportTab}
        </TabsContent>
      )}
    </Tabs>
  );
};
