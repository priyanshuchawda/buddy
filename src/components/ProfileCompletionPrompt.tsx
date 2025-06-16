
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ProfileCompletionPrompt = () => {
  const navigate = useNavigate();

  const handleCompleteProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="max-w-md mx-auto bg-amber-50 border-amber-200">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <AlertCircle className="w-8 h-8 text-amber-600" />
            </div>
          </div>
          <CardTitle className="text-amber-800">Profile Required</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-amber-700">
            To provide accurate health analysis, we need your basic information including age, height, weight, and medical history.
          </p>
          <p className="text-sm text-amber-600">
            This information helps our AI provide personalized recommendations based on your profile.
          </p>
          <Button 
            onClick={handleCompleteProfile}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
          >
            <User className="w-4 h-4 mr-2" />
            Complete Your Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
