import { Workout } from './workout';

export interface UserProfile {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  birthDate?: string; // ISO string
  weight: number; // in kg
  height?: number; // in cm
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active';
  weightUnit: 'kg' | 'lbs';
  restTimerDefault: number; // in seconds
}

export interface DBTemplate extends Omit<Workout, 'date' | 'isTemplate'> {
  // Templates might not have a specific date, but just act as a blueprint
  isTemplate: true;
}

export interface IronLogDatabase {
  workouts: Workout;
  templates: DBTemplate;
  profile: UserProfile;
}
