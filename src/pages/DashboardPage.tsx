import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Dumbbell, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { useWorkoutStore } from '@/stores/useWorkoutStore';

export function DashboardPage() {
  const navigate = useNavigate();
  const startWorkout = useWorkoutStore((state) => state.startWorkout);
  
  const workouts = useLiveQuery(() => db.workouts.toArray());
  
  const totalWorkouts = workouts?.length || 0;
  
  let totalVolume = 0;
  let totalCalories = 0;
  workouts?.forEach(workout => {
    totalCalories += workout.caloriesBurned || 0;
    workout.exercises.forEach(ex => {
      ex.sets.forEach(set => {
        if (set.completed && set.weight && set.reps) {
          totalVolume += set.weight * set.reps;
        }
      });
    });
  });

  const displayVolume = totalVolume > 1000 ? (totalVolume / 1000).toFixed(1) + 'k' : totalVolume.toString();

  const handleQuickStart = () => {
    startWorkout();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back. Ready to crush your goals?</p>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
          <CardDescription>Jump right into a new workout session</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button className="flex-1 gap-2 h-12" onClick={handleQuickStart}>
            <Play className="w-4 h-4" /> Start Workout
          </Button>
          <Button variant="secondary" className="flex-1 gap-2 h-12" onClick={() => navigate('/workout')}>
            <Dumbbell className="w-4 h-4" /> Routines
          </Button>
        </CardContent>
      </Card>

      {totalWorkouts === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-6 text-center space-y-2">
            <TrendingUp className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
            <h3 className="font-semibold text-lg">No workouts yet</h3>
            <p className="text-sm text-muted-foreground">Complete your first workout to see your stats here!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardHeader className="p-3 pb-1">
              <CardDescription className="text-xs">Workouts</CardDescription>
              <CardTitle className="text-xl">{totalWorkouts}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="p-3 pb-1">
              <CardDescription className="text-xs">Volume</CardDescription>
              <CardTitle className="text-xl">{displayVolume}kg</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="p-3 pb-1">
              <CardDescription className="text-xs">Calories</CardDescription>
              <CardTitle className="text-xl">{totalCalories}</CardTitle>
            </CardHeader>
          </Card>
        </div>
      )}
    </motion.div>
  );
}
