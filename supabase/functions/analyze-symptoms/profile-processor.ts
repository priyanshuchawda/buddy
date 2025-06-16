
import { UserProfile } from './types.ts';

export function buildProfileContext(userProfile?: UserProfile): string {
  if (!userProfile) {
    return 'No patient profile provided';
  }

  const profileParts = [];
  
  if (userProfile.name) profileParts.push(`Name: ${userProfile.name}`);
  if (userProfile.age) profileParts.push(`Age: ${userProfile.age} years`);
  if (userProfile.gender) profileParts.push(`Gender: ${userProfile.gender}`);
  if (userProfile.height) profileParts.push(`Height: ${userProfile.height} cm`);
  if (userProfile.weight) profileParts.push(`Weight: ${userProfile.weight} kg`);
  
  // Calculate BMI if height and weight are available
  if (userProfile.height && userProfile.weight) {
    const heightInM = parseFloat(userProfile.height) / 100;
    const weightInKg = parseFloat(userProfile.weight);
    if (!isNaN(heightInM) && !isNaN(weightInKg) && heightInM > 0) {
      const bmi = (weightInKg / (heightInM * heightInM)).toFixed(1);
      profileParts.push(`BMI: ${bmi}`);
    }
  }
  
  if (userProfile.conditions && userProfile.conditions.length > 0) {
    profileParts.push(`Medical History: ${userProfile.conditions.join(', ')}`);
  }
  if (userProfile.medications) profileParts.push(`Current Medications: ${userProfile.medications}`);
  if (userProfile.allergies) profileParts.push(`Known Allergies: ${userProfile.allergies}`);
  
  return `Patient Profile:\n${profileParts.join('\n')}`;
}
