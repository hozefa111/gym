import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Play } from 'lucide-react';
import { defaultTemplates } from '@/data/splits';

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

      <Button className="w-full h-14 text-lg font-semibold gap-2 shadow-lg shadow-primary/20">
        <Plus className="w-5 h-5" /> Start Empty Workout
      </Button>

      <div className="space-y-4 pt-4">
        <h2 className="text-xl font-semibold tracking-tight">Routines</h2>
        <div className="grid gap-4">
          {defaultTemplates.map((template) => (
            <Card key={template.id} className="bg-card hover:bg-accent/5 transition-colors border-border/50">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <CardDescription>
                  {template.exercises.length} exercises
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <Button variant="secondary" className="w-full gap-2 mt-2">
                  <Play className="w-4 h-4" /> Start Routine
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
