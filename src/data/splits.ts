import { DBTemplate } from '../types/database.types';

export const defaultTemplates: DBTemplate[] = [
  {
    id: 'template_ppl_push',
    name: 'Push (Chest, Shoulders, Triceps)',
    isTemplate: true,
    exercises: [
      {
        id: 'ex_1',
        exerciseId: 'chest_1', // Bench Press
        sets: [
          { id: 's1', reps: 8, completed: false },
          { id: 's2', reps: 8, completed: false },
          { id: 's3', reps: 8, completed: false },
        ]
      },
      {
        id: 'ex_2',
        exerciseId: 'shoulders_1', // Overhead Press
        sets: [
          { id: 's4', reps: 10, completed: false },
          { id: 's5', reps: 10, completed: false },
          { id: 's6', reps: 10, completed: false },
        ]
      },
      {
        id: 'ex_3',
        exerciseId: 'arms_3', // Triceps Pushdown
        sets: [
          { id: 's7', reps: 12, completed: false },
          { id: 's8', reps: 12, completed: false },
          { id: 's9', reps: 12, completed: false },
        ]
      }
    ]
  },
  {
    id: 'template_ppl_pull',
    name: 'Pull (Back, Biceps)',
    isTemplate: true,
    exercises: [
      {
        id: 'ex_4',
        exerciseId: 'back_1', // Deadlift
        sets: [
          { id: 's10', reps: 5, completed: false },
          { id: 's11', reps: 5, completed: false },
          { id: 's12', reps: 5, completed: false },
        ]
      },
      {
        id: 'ex_5',
        exerciseId: 'back_2', // Pull-up
        sets: [
          { id: 's13', reps: 8, completed: false },
          { id: 's14', reps: 8, completed: false },
          { id: 's15', reps: 8, completed: false },
        ]
      },
      {
        id: 'ex_6',
        exerciseId: 'arms_1', // Bicep Curl
        sets: [
          { id: 's16', reps: 12, completed: false },
          { id: 's17', reps: 12, completed: false },
          { id: 's18', reps: 12, completed: false },
        ]
      }
    ]
  },
  {
    id: 'template_ppl_legs',
    name: 'Legs',
    isTemplate: true,
    exercises: [
      {
        id: 'ex_7',
        exerciseId: 'legs_1', // Squat
        sets: [
          { id: 's19', reps: 8, completed: false },
          { id: 's20', reps: 8, completed: false },
          { id: 's21', reps: 8, completed: false },
        ]
      },
      {
        id: 'ex_8',
        exerciseId: 'legs_3', // Romanian Deadlift
        sets: [
          { id: 's22', reps: 10, completed: false },
          { id: 's23', reps: 10, completed: false },
          { id: 's24', reps: 10, completed: false },
        ]
      },
      {
        id: 'ex_9',
        exerciseId: 'legs_6', // Calf Raise
        sets: [
          { id: 's25', reps: 15, completed: false },
          { id: 's26', reps: 15, completed: false },
          { id: 's27', reps: 15, completed: false },
        ]
      }
    ]
  }
];
