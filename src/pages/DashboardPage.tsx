import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';

export function DashboardPage() {
  const navigate = useNavigate();
  
  const workouts = useLiveQuery(() => db.workouts.toArray());
  
  const totalWorkouts = workouts?.length || 0;
  
  let totalVolume = 0;
  workouts?.forEach(workout => {
    workout.exercises.forEach(ex => {
      ex.sets.forEach(set => {
        if (set.completed && set.weight && set.reps) {
          totalVolume += set.weight * set.reps;
        }
      });
    });
  });

  const displayVolume = totalVolume > 1000 ? (totalVolume / 1000).toFixed(1) + 'k' : totalVolume.toString();

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
          <CardTitle>Next Workout</CardTitle>
          <CardDescription>Upper Body Power</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full gap-2" onClick={() => navigate('/workout')}>
            <Play className="w-4 h-4" /> Start Workout
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardDescription>Workouts</CardDescription>
            <CardTitle className="text-2xl">{workouts ? totalWorkouts : '--'}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardDescription>Volume (kg)</CardDescription>
            <CardTitle className="text-2xl">{workouts ? displayVolume : '--'}</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </motion.div>
  );
}
