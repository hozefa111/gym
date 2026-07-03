import { motion } from 'framer-motion';

export function HistoryPage() {
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
    </motion.div>
  );
}
