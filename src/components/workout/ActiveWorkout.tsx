import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWorkoutStore } from '@/stores/useWorkoutStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Check, X, Timer, Trash2 } from 'lucide-react';
import { exercises } from '@/data/exercises';
import { ExerciseModal } from './ExerciseModal';

export function ActiveWorkout() {
  const { 
    activeWorkout, 
    endWorkout, 
    cancelWorkout, 
    addSet, 
    updateSet, 
    toggleSetComplete,
    addExercise,
    removeExercise 
  } = useWorkoutStore();
  
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  const [elapsedTime, setElapsedTime] = useState('00:00');
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  useEffect(() => {
    if (!activeWorkout?.startTime) return;
    
    const interval = setInterval(() => {
      const start = new Date(activeWorkout.startTime!).getTime();
      const now = new Date().getTime();
      const diff = Math.floor((now - start) / 1000);
      
      const hrs = Math.floor(diff / 3600);
      const mins = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
      const secs = (diff % 60).toString().padStart(2, '0');
      setElapsedTime(hrs > 0 ? `${hrs}:${mins}:${secs}` : `${mins}:${secs}`);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [activeWorkout?.startTime]);

  if (!activeWorkout) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[60] bg-background flex flex-col safe-area-bottom"
    >
      {/* Cancel Confirmation Overlay */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-6">
          <div className="bg-card rounded-xl p-6 w-full max-w-sm space-y-4 border">
            <h3 className="text-xl font-bold">Discard Workout?</h3>
            <p className="text-muted-foreground text-sm">All logged sets will be lost. This cannot be undone.</p>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setShowCancelConfirm(false)}>
                Keep Going
              </Button>
              <Button variant="destructive" className="flex-1" onClick={() => { cancelWorkout(); setShowCancelConfirm(false); }}>
                Discard
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setShowCancelConfirm(true)} className="text-destructive">
            <X className="w-6 h-6" />
          </Button>
          <Timer className="w-5 h-5 text-primary ml-2" />
          <span className="font-mono text-lg font-bold">{elapsedTime}</span>
        </div>
        <Button onClick={endWorkout} className="font-bold">
          Finish
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-32">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">{activeWorkout.name}</h1>
          <p className="text-muted-foreground">
            {new Date(activeWorkout.startTime || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {activeWorkout.exercises.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            <p className="text-lg mb-2">No exercises yet</p>
            <p className="text-sm">Tap "Add Exercise" below to get started!</p>
          </div>
        )}

        {activeWorkout.exercises.map((workoutEx) => {
          const exerciseDetails = exercises.find((e) => e.id === workoutEx.exerciseId);
          return (
            <div key={workoutEx.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-primary">
                  {exerciseDetails?.name || 'Unknown Exercise'}
                </h3>
                <Button variant="ghost" size="icon" onClick={() => removeExercise(workoutEx.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>

              <div className="bg-card rounded-lg border overflow-hidden">
                <div className="grid grid-cols-4 gap-2 p-2 border-b bg-muted/30 text-xs font-semibold text-center text-muted-foreground uppercase tracking-wider">
                  <div>Set</div>
                  <div>kg</div>
                  <div>Reps</div>
                  <div><Check className="w-4 h-4 mx-auto" /></div>
                </div>

                <div className="p-2 space-y-2">
                  {workoutEx.sets.map((set, setIndex) => (
                    <div key={set.id} className="grid grid-cols-4 gap-2 items-center">
                      <div className="text-center font-medium text-sm">
                        {setIndex + 1}
                      </div>
                      <Input
                        type="number"
                        placeholder="--"
                        className="h-10 text-center font-mono text-lg bg-background"
                        value={set.weight === undefined ? '' : set.weight}
                        onChange={(e) => updateSet(workoutEx.id, set.id, { 
                          weight: e.target.value === '' ? undefined : parseFloat(e.target.value) 
                        })}
                      />
                      <Input
                        type="number"
                        placeholder="--"
                        className="h-10 text-center font-mono text-lg bg-background"
                        value={set.reps === undefined ? '' : set.reps}
                        onChange={(e) => updateSet(workoutEx.id, set.id, { 
                          reps: e.target.value === '' ? undefined : parseInt(e.target.value) 
                        })}
                      />
                      <Button
                        variant={set.completed ? 'default' : 'secondary'}
                        size="icon"
                        className="w-full h-10 transition-colors"
                        onClick={() => toggleSetComplete(workoutEx.id, set.id)}
                      >
                        <Check className="w-5 h-5" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  className="w-full h-12 rounded-none border-t text-primary hover:text-primary hover:bg-primary/10"
                  onClick={() => addSet(workoutEx.id)}
                >
                  <Plus className="w-5 h-5 mr-2" /> Add Set
                </Button>
              </div>
            </div>
          );
        })}

        <Button
          variant="outline"
          className="w-full h-14 border-primary/50 text-primary hover:bg-primary/10"
          onClick={() => setIsExerciseModalOpen(true)}
        >
          <Plus className="w-5 h-5 mr-2" /> Add Exercise
        </Button>
      </div>

      <ExerciseModal
        isOpen={isExerciseModalOpen}
        onClose={() => setIsExerciseModalOpen(false)}
        onAddExercise={addExercise}
      />
    </motion.div>
  );
}
