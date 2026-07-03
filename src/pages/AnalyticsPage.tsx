import { motion } from 'framer-motion';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { exercises as exerciseLibrary } from '@/data/exercises';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

export function AnalyticsPage() {
  const workouts = useLiveQuery(() => db.workouts.toArray());

  // Filter workouts for the last 7 days
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const weeklyWorkouts = workouts?.filter(w => new Date(w.date) >= sevenDaysAgo) || [];
  
  let weeklyCalories = 0;
  let weeklyVolume = 0;
  const muscleCounts: Record<string, number> = {};

  weeklyWorkouts.forEach(workout => {
    weeklyCalories += workout.caloriesBurned || 0;
    
    workout.exercises.forEach(we => {
      const exDetails = exerciseLibrary.find(e => e.id === we.exerciseId);
      if (exDetails) {
        const muscle = exDetails.primaryMuscle;
        const completedSetsCount = we.sets.filter(s => s.completed).length;
        
        if (completedSetsCount > 0) {
          muscleCounts[muscle] = (muscleCounts[muscle] || 0) + completedSetsCount;
        }

        we.sets.forEach(s => {
          if (s.completed && s.weight && s.reps) {
            weeklyVolume += s.weight * s.reps;
          }
        });
      }
    });
  });

  const muscleData = Object.entries(muscleCounts).sort((a, b) => b[1] - a[1]);
  const maxSets = muscleData.length > 0 ? Math.max(...muscleData.map(m => m[1])) : 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Track your progress over the last 7 days.</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="p-3 pb-1">
            <CardDescription className="text-xs font-semibold text-primary">Workouts</CardDescription>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <CardTitle className="text-2xl">{weeklyWorkouts.length}</CardTitle>
            <p className="text-[10px] text-muted-foreground mt-0.5">Last 7 days</p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="p-3 pb-1">
            <CardDescription className="text-xs font-semibold text-primary">Calories</CardDescription>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <CardTitle className="text-2xl">{weeklyCalories}</CardTitle>
            <p className="text-[10px] text-muted-foreground mt-0.5">kcal burned</p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="p-3 pb-1">
            <CardDescription className="text-xs font-semibold text-primary">Volume</CardDescription>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <CardTitle className="text-2xl">{weeklyVolume > 1000 ? (weeklyVolume / 1000).toFixed(1) + 'k' : weeklyVolume}</CardTitle>
            <p className="text-[10px] text-muted-foreground mt-0.5">kg lifted</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="p-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Muscle Groups Targeted</CardTitle>
          </div>
          <CardDescription>Based on completed sets in the last 7 days.</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-4">
          {muscleData.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground text-sm">
              No sets completed this week yet.
            </div>
          ) : (
            muscleData.map(([muscle, sets]) => {
              const percentage = (sets / maxSets) * 100;
              return (
                <div key={muscle} className="space-y-1">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{muscle}</span>
                    <span className="text-muted-foreground font-mono">{sets} sets</span>
                  </div>
                  <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full transition-all duration-500" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
