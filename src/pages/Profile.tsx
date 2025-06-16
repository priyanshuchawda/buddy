import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Navigation } from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { User, Save, MapPin } from "lucide-react";

interface UserProfile {
  name: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  conditions: string[];
  medications: string;
  allergies: string;
  area: string;
  city: string;
  state: string;
  country: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    conditions: [],
    medications: "",
    allergies: "",
    area: "",
    city: "",
    state: "",
    country: ""
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const healthConditions = [
    "Diabetes", "Hypertension", "Asthma", "Heart Disease", "Arthritis",
    "Thyroid Issues", "Kidney Disease", "Depression", "Anxiety", "Migraines"
  ];

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleConditionChange = (condition: string, checked: boolean) => {
    setProfile(prev => ({
      ...prev,
      conditions: checked 
        ? [...prev.conditions, condition]
        : prev.conditions.filter(c => c !== condition)
    }));
  };

  const handleSave = () => {
    // Validate required fields
    const requiredFields = ['name', 'age', 'gender', 'height', 'weight'];
    const missingFields = requiredFields.filter(field => 
      !profile[field as keyof UserProfile] || 
      String(profile[field as keyof UserProfile]).trim() === ''
    );

    if (missingFields.length > 0) {
      toast({
        title: "Incomplete Profile",
        description: `Please fill in the following required fields: ${missingFields.join(', ')}`,
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem('userProfile', JSON.stringify(profile));
    toast({
      title: "Profile Saved",
      description: "Your health profile has been updated successfully. Redirecting to symptom checker...",
    });

    // Redirect to symptom checker after a short delay
    setTimeout(() => {
      navigate('/checker');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navigation />
      
      <div className="pt-20 pb-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <User className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Profile</h1>
            <p className="text-gray-600">
              Complete your profile to access personalized AI health insights
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Personal Information *</CardTitle>
              <p className="text-sm text-gray-600">All fields marked with * are required</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={profile.age}
                    onChange={(e) => setProfile(prev => ({ ...prev, age: e.target.value }))}
                    placeholder="Your age"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="height">Height (cm) *</Label>
                  <Input
                    id="height"
                    type="number"
                    value={profile.height}
                    onChange={(e) => setProfile(prev => ({ ...prev, height: e.target.value }))}
                    placeholder="Height in cm"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg) *</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={profile.weight}
                    onChange={(e) => setProfile(prev => ({ ...prev, weight: e.target.value }))}
                    placeholder="Weight in kg"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="gender">Gender *</Label>
                <select
                  id="gender"
                  value={profile.gender}
                  onChange={(e) => setProfile(prev => ({ ...prev, gender: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Location Information
              </CardTitle>
              <p className="text-sm text-gray-600">
                Used as fallback for finding nearby medical facilities
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="area">Area/Neighborhood</Label>
                  <Input
                    id="area"
                    value={profile.area}
                    onChange={(e) => setProfile(prev => ({ ...prev, area: e.target.value }))}
                    placeholder="Your area or neighborhood"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={profile.city}
                    onChange={(e) => setProfile(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Your city"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    value={profile.state}
                    onChange={(e) => setProfile(prev => ({ ...prev, state: e.target.value }))}
                    placeholder="Your state or province"
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={profile.country}
                    onChange={(e) => setProfile(prev => ({ ...prev, country: e.target.value }))}
                    placeholder="Your country"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Existing Health Conditions</Label>
                <p className="text-sm text-gray-600 mb-3">
                  Select any conditions that apply to you
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {healthConditions.map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox
                        id={condition}
                        checked={profile.conditions.includes(condition)}
                        onCheckedChange={(checked) => handleConditionChange(condition, checked as boolean)}
                      />
                      <Label htmlFor={condition} className="text-sm">{condition}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="medications">Current Medications</Label>
                <Input
                  id="medications"
                  value={profile.medications}
                  onChange={(e) => setProfile(prev => ({ ...prev, medications: e.target.value }))}
                  placeholder="List your current medications"
                />
              </div>

              <div>
                <Label htmlFor="allergies">Known Allergies</Label>
                <Input
                  id="allergies"
                  value={profile.allergies}
                  onChange={(e) => setProfile(prev => ({ ...prev, allergies: e.target.value }))}
                  placeholder="List any allergies (food, medicine, etc.)"
                />
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-center">
            <Button onClick={handleSave} className="px-8">
              <Save className="w-4 h-4 mr-2" />
              Save Profile
            </Button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Privacy Notice:</strong> Your health information is stored locally on your device 
              and used only to provide personalized AI recommendations. We do not share your data with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
