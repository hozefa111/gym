import { Exercise } from '../types/exercise';

export const exercises: Exercise[] = [
  // Chest
  {
    id: 'chest_1',
    name: 'Barbell Bench Press',
    primaryMuscle: 'Chest',
    secondaryMuscles: ['Shoulders', 'Arms'],
    equipment: 'Barbell',
    type: 'strength',
    metValue: 6.0,
    instructions: 'Lie on a flat bench, grip the barbell slightly wider than shoulder-width. Lower it to your mid-chest and push back up.'
  },
  {
    id: 'chest_2',
    name: 'Dumbbell Incline Press',
    primaryMuscle: 'Chest',
    secondaryMuscles: ['Shoulders', 'Arms'],
    equipment: 'Dumbbell',
    type: 'strength',
    metValue: 6.0,
  },
  {
    id: 'chest_3',
    name: 'Push-up',
    primaryMuscle: 'Chest',
    secondaryMuscles: ['Shoulders', 'Arms', 'Core'],
    equipment: 'Bodyweight',
    type: 'strength',
    metValue: 8.0, // vigorous calisthenics
  },
  {
    id: 'chest_4',
    name: 'Cable Crossover',
    primaryMuscle: 'Chest',
    equipment: 'Cable',
    type: 'strength',
    metValue: 3.5,
  },
  
  // Back
  {
    id: 'back_1',
    name: 'Deadlift',
    primaryMuscle: 'Back',
    secondaryMuscles: ['Legs', 'Core', 'Full Body'],
    equipment: 'Barbell',
    type: 'strength',
    metValue: 6.0,
  },
  {
    id: 'back_2',
    name: 'Pull-up',
    primaryMuscle: 'Back',
    secondaryMuscles: ['Arms'],
    equipment: 'Bodyweight',
    type: 'strength',
    metValue: 8.0,
  },
  {
    id: 'back_3',
    name: 'Bent Over Barbell Row',
    primaryMuscle: 'Back',
    secondaryMuscles: ['Arms'],
    equipment: 'Barbell',
    type: 'strength',
    metValue: 6.0,
  },
  {
    id: 'back_4',
    name: 'Lat Pulldown',
    primaryMuscle: 'Back',
    secondaryMuscles: ['Arms'],
    equipment: 'Cable',
    type: 'strength',
    metValue: 3.5,
  },
  {
    id: 'back_5',
    name: 'Seated Cable Row',
    primaryMuscle: 'Back',
    secondaryMuscles: ['Arms'],
    equipment: 'Cable',
    type: 'strength',
    metValue: 3.5,
  },

  // Legs
  {
    id: 'legs_1',
    name: 'Barbell Squat',
    primaryMuscle: 'Legs',
    secondaryMuscles: ['Core', 'Full Body'],
    equipment: 'Barbell',
    type: 'strength',
    metValue: 6.0,
  },
  {
    id: 'legs_2',
    name: 'Leg Press',
    primaryMuscle: 'Legs',
    equipment: 'Machine',
    type: 'strength',
    metValue: 3.5,
  },
  {
    id: 'legs_3',
    name: 'Romanian Deadlift',
    primaryMuscle: 'Legs',
    secondaryMuscles: ['Back'],
    equipment: 'Barbell',
    type: 'strength',
    metValue: 6.0,
  },
  {
    id: 'legs_4',
    name: 'Leg Extension',
    primaryMuscle: 'Legs',
    equipment: 'Machine',
    type: 'strength',
    metValue: 3.5,
  },
  {
    id: 'legs_5',
    name: 'Lying Leg Curl',
    primaryMuscle: 'Legs',
    equipment: 'Machine',
    type: 'strength',
    metValue: 3.5,
  },
  {
    id: 'legs_6',
    name: 'Standing Calf Raise',
    primaryMuscle: 'Legs',
    equipment: 'Machine',
    type: 'strength',
    metValue: 3.5,
  },

  // Shoulders
  {
    id: 'shoulders_1',
    name: 'Overhead Press',
    primaryMuscle: 'Shoulders',
    secondaryMuscles: ['Arms'],
    equipment: 'Barbell',
    type: 'strength',
    metValue: 6.0,
  },
  {
    id: 'shoulders_2',
    name: 'Dumbbell Lateral Raise',
    primaryMuscle: 'Shoulders',
    equipment: 'Dumbbell',
    type: 'strength',
    metValue: 3.5,
  },
  {
    id: 'shoulders_3',
    name: 'Face Pull',
    primaryMuscle: 'Shoulders',
    secondaryMuscles: ['Back'],
    equipment: 'Cable',
    type: 'strength',
    metValue: 3.5,
  },

  // Arms
  {
    id: 'arms_1',
    name: 'Barbell Bicep Curl',
    primaryMuscle: 'Arms',
    equipment: 'Barbell',
    type: 'strength',
    metValue: 3.5,
  },
  {
    id: 'arms_2',
    name: 'Dumbbell Hammer Curl',
    primaryMuscle: 'Arms',
    equipment: 'Dumbbell',
    type: 'strength',
    metValue: 3.5,
  },
  {
    id: 'arms_3',
    name: 'Triceps Pushdown',
    primaryMuscle: 'Arms',
    equipment: 'Cable',
    type: 'strength',
    metValue: 3.5,
  },
  {
    id: 'arms_4',
    name: 'Skull Crusher',
    primaryMuscle: 'Arms',
    equipment: 'Barbell',
    type: 'strength',
    metValue: 3.5,
  },

  // Core
  {
    id: 'core_1',
    name: 'Crunch',
    primaryMuscle: 'Core',
    equipment: 'Bodyweight',
    type: 'strength',
    metValue: 3.8, // moderate effort
  },
  {
    id: 'core_2',
    name: 'Plank',
    primaryMuscle: 'Core',
    equipment: 'Bodyweight',
    type: 'strength',
    metValue: 3.8,
  },
  {
    id: 'core_3',
    name: 'Hanging Leg Raise',
    primaryMuscle: 'Core',
    equipment: 'Bodyweight',
    type: 'strength',
    metValue: 8.0, // vigorous
  },

  // Cardio / Full Body
  {
    id: 'cardio_1',
    name: 'Treadmill Running',
    primaryMuscle: 'Cardio',
    secondaryMuscles: ['Legs'],
    equipment: 'Machine',
    type: 'cardio',
    metValue: 9.0, // running 5.2 mph
  },
  {
    id: 'cardio_2',
    name: 'Stationary Bike',
    primaryMuscle: 'Cardio',
    secondaryMuscles: ['Legs'],
    equipment: 'Machine',
    type: 'cardio',
    metValue: 7.0, // vigorous cycling
  },
  {
    id: 'cardio_3',
    name: 'Rowing Machine',
    primaryMuscle: 'Cardio',
    secondaryMuscles: ['Back', 'Legs', 'Arms'],
    equipment: 'Machine',
    type: 'cardio',
    metValue: 7.0,
  },
  {
    id: 'cardio_4',
    name: 'Kettlebell Swing',
    primaryMuscle: 'Full Body',
    secondaryMuscles: ['Legs', 'Back', 'Core'],
    equipment: 'Kettlebell',
    type: 'strength',
    metValue: 8.0, // dynamic
  },
  {
    id: 'cardio_5',
    name: 'Burpees',
    primaryMuscle: 'Full Body',
    secondaryMuscles: ['Chest', 'Legs', 'Core'],
    equipment: 'Bodyweight',
    type: 'cardio',
    metValue: 8.0,
  }
];
