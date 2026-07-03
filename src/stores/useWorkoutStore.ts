import { create } from 'zustand';
import { Workout, WorkoutExercise, Set } from '../types/workout';
import { db } from '../lib/db';
import { v4 as uuidv4 } from 'uuid';
import { calculateCalories } from '../lib/calories';
import { useProfileStore } from './useProfileStore';

interface WorkoutState {
  activeWorkout: Workout | null;
  startWorkout: (template?: Workout) => void;
  endWorkout: () => Promise<void>;
  cancelWorkout: () => void;
  
  addExercise: (exerciseId: string) => void;
  removeExercise: (id: string) => void; // WorkoutExercise id
  
  addSet: (workoutExerciseId: string) => void;
  removeSet: (workoutExerciseId: string, setId: string) => void;
  updateSet: (workoutExerciseId: string, setId: string, updates: Partial<Set>) => void;
  toggleSetComplete: (workoutExerciseId: string, setId: string) => void;
  
  updateWorkoutData: (updates: Partial<Workout>) => void;
}

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  activeWorkout: null,

  startWorkout: (template) => {
    let exercises: WorkoutExercise[] = [];
    if (template) {
      exercises = template.exercises.map(ex => ({
        ...ex,
        id: uuidv4(),
        sets: ex.sets.map(s => ({ ...s, id: uuidv4() })),
      }));
    }
    const newWorkout: Workout = {
      id: uuidv4(),
      name: template ? template.name : 'New Workout',
      date: new Date().toISOString(),
      startTime: new Date().toISOString(),
      exercises,
    };
    set({ activeWorkout: newWorkout });
  },

  endWorkout: async () => {
    const { activeWorkout } = get();
    if (!activeWorkout) return;
    
    // Calculate calories
    const profile = useProfileStore.getState().profile;
    const caloriesBurned = profile ? calculateCalories(activeWorkout, profile) : 0;
    
    const completedWorkout = {
      ...activeWorkout,
      endTime: new Date().toISOString(),
      caloriesBurned,
    };
    
    // Save to dexie
    await db.workouts.put(completedWorkout);
    
    set({ activeWorkout: null });
  },

  cancelWorkout: () => {
    set({ activeWorkout: null });
  },

  addExercise: (exerciseId) => {
    set((state) => {
      if (!state.activeWorkout) return state;
      const newExercise: WorkoutExercise = {
        id: uuidv4(),
        exerciseId,
        sets: [{ id: uuidv4(), completed: false }],
      };
      return {
        activeWorkout: {
          ...state.activeWorkout,
          exercises: [...state.activeWorkout.exercises, newExercise],
        },
      };
    });
  },

  removeExercise: (id) => {
    set((state) => {
      if (!state.activeWorkout) return state;
      return {
        activeWorkout: {
          ...state.activeWorkout,
          exercises: state.activeWorkout.exercises.filter((e) => e.id !== id),
        },
      };
    });
  },

  addSet: (workoutExerciseId) => {
    set((state) => {
      if (!state.activeWorkout) return state;
      const exercises = state.activeWorkout.exercises.map((ex) => {
        if (ex.id === workoutExerciseId) {
          const lastSet = ex.sets[ex.sets.length - 1];
          return {
            ...ex,
            sets: [
              ...ex.sets,
              { 
                id: uuidv4(), 
                reps: lastSet?.reps, 
                weight: lastSet?.weight,
                duration: lastSet?.duration,
                distance: lastSet?.distance,
                completed: false 
              },
            ],
          };
        }
        return ex;
      });
      return { activeWorkout: { ...state.activeWorkout, exercises } };
    });
  },

  removeSet: (workoutExerciseId, setId) => {
    set((state) => {
      if (!state.activeWorkout) return state;
      const exercises = state.activeWorkout.exercises.map((ex) => {
        if (ex.id === workoutExerciseId) {
          return {
            ...ex,
            sets: ex.sets.filter((s) => s.id !== setId),
          };
        }
        return ex;
      });
      return { activeWorkout: { ...state.activeWorkout, exercises } };
    });
  },

  updateSet: (workoutExerciseId, setId, updates) => {
    set((state) => {
      if (!state.activeWorkout) return state;
      const exercises = state.activeWorkout.exercises.map((ex) => {
        if (ex.id === workoutExerciseId) {
          return {
            ...ex,
            sets: ex.sets.map((s) => (s.id === setId ? { ...s, ...updates } : s)),
          };
        }
        return ex;
      });
      return { activeWorkout: { ...state.activeWorkout, exercises } };
    });
  },

  toggleSetComplete: (workoutExerciseId, setId) => {
    set((state) => {
      if (!state.activeWorkout) return state;
      const exercises = state.activeWorkout.exercises.map((ex) => {
        if (ex.id === workoutExerciseId) {
          return {
            ...ex,
            sets: ex.sets.map((s) => (s.id === setId ? { ...s, completed: !s.completed } : s)),
          };
        }
        return ex;
      });
      return { activeWorkout: { ...state.activeWorkout, exercises } };
    });
  },

  updateWorkoutData: (updates) => {
    set((state) => {
      if (!state.activeWorkout) return state;
      return { activeWorkout: { ...state.activeWorkout, ...updates } };
    });
  },
}));
