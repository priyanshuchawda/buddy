
import { useState, useEffect } from 'react';

interface UserProfile {
  name: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  conditions: string[];
  medications: string;
  allergies: string;
}

export const useProfileValidation = () => {
  const [isProfileComplete, setIsProfileComplete] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkProfile = () => {
      const savedProfile = localStorage.getItem('userProfile');
      
      if (!savedProfile) {
        setIsProfileComplete(false);
        setIsLoading(false);
        return;
      }

      try {
        const profile: UserProfile = JSON.parse(savedProfile);
        
        // Check if required fields are filled
        const requiredFields = ['name', 'age', 'gender', 'height', 'weight'];
        const isComplete = requiredFields.every(field => 
          profile[field as keyof UserProfile] && 
          String(profile[field as keyof UserProfile]).trim() !== ''
        );
        
        setIsProfileComplete(isComplete);
      } catch (error) {
        console.error('Error parsing profile:', error);
        setIsProfileComplete(false);
      }
      
      setIsLoading(false);
    };

    checkProfile();
  }, []);

  return { isProfileComplete, isLoading };
};
