import { Workout } from '../types/workout';
import { exercises } from '../data/exercises';
import { UserProfile } from '../types/database.types';

/**
 * Calculate calories burned for a given workout based on its exercises and duration.
 * Formula: Calories = MET * Weight (kg) * Duration (hours)
 */

export function calculateCalories(workout: Workout, profile: UserProfile): number {
  if (!workout.startTime || !workout.endTime) return 0;
  
  const start = new Date(workout.startTime).getTime();
  const end = new Date(workout.endTime).getTime();
  const durationMs = end - start;
  
  if (durationMs <= 0) return 0;
  
  const durationHours = durationMs / (1000 * 60 * 60);
  const weightKg = profile.weightUnit === 'lbs' ? profile.weight * 0.453592 : profile.weight;

  // Compute average MET for the exercises performed
  let totalMETs = 0;
  let count = 0;
  
  for (const we of workout.exercises) {
    const exData = exercises.find((e) => e.id === we.exerciseId);
    if (exData && exData.metValue) {
      totalMETs += exData.metValue;
      count++;
    }
  }
  
  // If no exercises with METs, default to general weightlifting MET (3.5)
  const averageMET = count > 0 ? totalMETs / count : 3.5;
  
  return Math.round(averageMET * weightKg * durationHours);
}

/**
 * More granular calculation per set if duration is tracked
 */
export function calculateSetCalories(metValue: number, weightKg: number, durationSeconds: number): number {
  const durationHours = durationSeconds / 3600;
  return metValue * weightKg * durationHours;
}
