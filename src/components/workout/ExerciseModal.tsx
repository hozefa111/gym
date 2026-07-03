import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { exercises } from '@/data/exercises';

interface ExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExercise: (exerciseId: string) => void;
}

export function ExerciseModal({ isOpen, onClose, onAddExercise }: ExerciseModalProps) {
  const [search, setSearch] = useState('');

  const filteredExercises = exercises.filter((ex) =>
    ex.name.toLowerCase().includes(search.toLowerCase()) ||
    ex.primaryMuscle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[100] bg-background flex flex-col safe-area-bottom"
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">Add Exercise</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search exercises or muscles..."
                className="pl-10 h-12 text-base"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {filteredExercises.map((ex) => (
              <div
                key={ex.id}
                className="flex items-center justify-between p-4 rounded-lg bg-card border hover:border-primary/50 transition-colors"
                onClick={() => {
                  onAddExercise(ex.id);
                  onClose();
                }}
              >
                <div>
                  <h3 className="font-semibold text-lg">{ex.name}</h3>
                  <p className="text-sm text-muted-foreground">{ex.primaryMuscle}</p>
                </div>
                <Button size="icon" variant="secondary" className="rounded-full">
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            ))}
            
            {filteredExercises.length === 0 && (
              <div className="text-center text-muted-foreground py-10">
                No exercises found.
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
