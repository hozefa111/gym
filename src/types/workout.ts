export interface Set {
  id: string;
  reps?: number;
  weight?: number; // in kg or lbs depending on user preference
  duration?: number; // in seconds
  distance?: number; // in km or miles depending on user preference
  completed: boolean;
}

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  sets: Set[];
  notes?: string;
}

export interface Workout {
  id: string;
  name: string;
  date: string; // ISO string
  startTime?: string; // ISO string
  endTime?: string; // ISO string
  duration?: number; // in seconds
  exercises: WorkoutExercise[];
  caloriesBurned?: number;
  notes?: string;
  isTemplate?: boolean;
}
