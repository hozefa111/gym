import { motion } from 'framer-motion';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Dumbbell } from 'lucide-react';

export function HistoryPage() {
  const workouts = useLiveQuery(() => db.workouts.orderBy('date').reverse().toArray());

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">History</h1>
        <p className="text-muted-foreground">Your past accomplishments.</p>
      </div>

      {!workouts ? (
        <div className="text-center py-10 text-muted-foreground">Loading...</div>
      ) : workouts.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          No workouts completed yet. Time to lift!
        </div>
      ) : (
        <div className="space-y-4">
          {workouts.map((workout) => {
            const date = new Date(workout.date);
            const startTime = workout.startTime ? new Date(workout.startTime).getTime() : 0;
            const endTime = workout.endTime ? new Date(workout.endTime).getTime() : 0;
            const durationMins = startTime && endTime ? Math.round((endTime - startTime) / 60000) : 0;
            
            let totalSets = 0;
            let totalVolume = 0;
            workout.exercises.forEach(ex => {
              ex.sets.forEach(set => {
                if (set.completed) {
                  totalSets++;
                  if (set.weight && set.reps) totalVolume += set.weight * set.reps;
                }
              });
            });

            return (
              <Card key={workout.id} className="bg-card">
                <CardHeader className="p-4 pb-2 border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{workout.name}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground gap-1 mt-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">{durationMins}m</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Dumbbell className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">{totalSets} sets</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-mono">
                    <span className="font-medium text-foreground">{totalVolume}kg</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
