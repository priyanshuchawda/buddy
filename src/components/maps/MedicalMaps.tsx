
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Hospital, Clock, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  area?: string;
  city?: string;
  state?: string;
  country?: string;
}

export const MedicalMaps = () => {
  const [mapUrl, setMapUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'requesting' | 'success' | 'fallback'>('idle');
  const { toast } = useToast();

  const getUserLocation = () => {
    setIsLoading(true);
    setLocationStatus('requesting');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const url = `https://www.google.com/maps?q=clinics+hospitals+near+me&ll=${lat},${lng}&z=14&output=embed`;
          setMapUrl(url);
          setLocationStatus('success');
          setIsLoading(false);
          
          toast({
            title: "Location Found",
            description: "Showing nearby medical facilities based on your current location.",
          });
        },
        (error) => {
          console.log('Geolocation error:', error);
          useFallbackLocation();
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes cache
        }
      );
    } else {
      useFallbackLocation();
    }
  };

  const useFallbackLocation = () => {
    const savedProfile = localStorage.getItem('userProfile');
    let fallbackQuery = "clinics+hospitals+near+me";
    
    if (savedProfile) {
      try {
        const profile: UserProfile = JSON.parse(savedProfile);
        const locationParts = [profile.area, profile.city, profile.state, profile.country].filter(Boolean);
        
        if (locationParts.length > 0) {
          const location = locationParts.join('+');
          fallbackQuery = `clinics+hospitals+in+${location}`;
        }
      } catch (error) {
        console.error('Error parsing profile:', error);
      }
    }
    
    const url = `https://www.google.com/maps?q=${fallbackQuery}&z=12&output=embed`;
    setMapUrl(url);
    setLocationStatus('fallback');
    setIsLoading(false);
    
    toast({
      title: "Using Profile Location",
      description: "Showing medical facilities based on your profile location.",
      variant: "default"
    });
  };

  const searchSpecificType = (type: string) => {
    if (locationStatus === 'success') {
      // Use current location if available
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const url = `https://www.google.com/maps?q=${type}&ll=${lat},${lng}&z=14&output=embed`;
        setMapUrl(url);
      });
    } else {
      // Use fallback location
      const savedProfile = localStorage.getItem('userProfile');
      let locationQuery = "";
      
      if (savedProfile) {
        try {
          const profile: UserProfile = JSON.parse(savedProfile);
          const locationParts = [profile.area, profile.city, profile.state, profile.country].filter(Boolean);
          locationQuery = locationParts.length > 0 ? `+in+${locationParts.join('+')}` : "";
        } catch (error) {
          console.error('Error parsing profile:', error);
        }
      }
      
      const url = `https://www.google.com/maps?q=${type}${locationQuery}&z=12&output=embed`;
      setMapUrl(url);
    }
  };

  useEffect(() => {
    // Auto-load general medical facilities on component mount
    getUserLocation();
  }, []);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-green-900/40 to-teal-900/40 border-green-500/30 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-white">
              <MapPin className="w-6 h-6 text-green-400" />
              Nearby Medical Facilities
            </CardTitle>
            <div className="flex items-center gap-2">
              {locationStatus === 'success' && (
                <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                  <Navigation className="w-3 h-3 mr-1" />
                  Live Location
                </Badge>
              )}
              {locationStatus === 'fallback' && (
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                  <MapPin className="w-3 h-3 mr-1" />
                  Profile Location
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              onClick={() => searchSpecificType("emergency+hospital")}
              variant="outline"
              size="sm"
              className="border-red-500/30 text-red-300 hover:bg-red-500/20"
            >
              <Hospital className="w-4 h-4 mr-2" />
              Emergency
            </Button>
            <Button
              onClick={() => searchSpecificType("clinic")}
              variant="outline"
              size="sm"
              className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20"
            >
              <Clock className="w-4 h-4 mr-2" />
              Clinics
            </Button>
            <Button
              onClick={() => searchSpecificType("pharmacy")}
              variant="outline"
              size="sm"
              className="border-green-500/30 text-green-300 hover:bg-green-500/20"
            >
              Pharmacy
            </Button>
            <Button
              onClick={() => searchSpecificType("dentist")}
              variant="outline"
              size="sm"
              className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
            >
              Dental
            </Button>
          </div>

          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
                <div className="text-center space-y-3">
                  <Loader2 className="w-8 h-8 animate-spin text-green-400 mx-auto" />
                  <p className="text-slate-300">Loading medical facilities...</p>
                </div>
              </div>
            )}
            
            {mapUrl && (
              <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-600/30">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Button
              onClick={getUserLocation}
              variant="outline"
              size="sm"
              className="border-green-500/30 text-green-300 hover:bg-green-500/20"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Refresh Location
            </Button>
            
            <p className="text-xs text-slate-400">
              {locationStatus === 'success' 
                ? "Using your current GPS location" 
                : "Using location from your profile"
              }
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <h4 className="font-medium text-white">Location Privacy</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                We use your location only to show nearby medical facilities. Your location data is not stored or shared. 
                If you deny location access, we'll use the area information from your profile instead.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
