import { motion } from 'framer-motion';

export function WorkoutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Workout</h1>
        <p className="text-muted-foreground">Select a routine or start empty.</p>
      </div>
    </motion.div>
  );
}
