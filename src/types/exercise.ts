export type MuscleGroup = 
  | 'Chest' 
  | 'Back' 
  | 'Legs' 
  | 'Shoulders' 
  | 'Arms' 
  | 'Core' 
  | 'Full Body'
  | 'Cardio';

export type Equipment = 
  | 'Barbell' 
  | 'Dumbbell' 
  | 'Machine' 
  | 'Cable' 
  | 'Bodyweight' 
  | 'Kettlebell'
  | 'None';

export type ExerciseType = 'strength' | 'cardio' | 'flexibility';

export interface Exercise {
  id: string;
  name: string;
  primaryMuscle: MuscleGroup;
  secondaryMuscles?: MuscleGroup[];
  equipment: Equipment;
  type: ExerciseType;
  metValue: number; // Metabolic Equivalent of Task
  instructions?: string;
  videoUrl?: string;
}
