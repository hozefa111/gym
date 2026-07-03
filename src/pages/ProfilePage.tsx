import { motion } from 'framer-motion';
import { useProfileStore } from '@/stores/useProfileStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast'; // Wait, let's see if we have toast or we can just use normal feedback.
// Let's use simple local state feedback instead of useToast since we don't know if toast is configured.
import { useState } from 'react';

export function ProfilePage() {
  const { profile, updateProfile } = useProfileStore();
  const [name, setName] = useState(profile?.name || '');
  const [weight, setWeight] = useState(profile?.weight || 70);
  const [weightUnit, setWeightUnit] = useState(profile?.weightUnit || 'kg');
  const [restTimer, setRestTimer] = useState(profile?.restTimerDefault || 90);
  const [saved, setSaved] = useState(false);

  if (!profile) {
    return <div className="text-center py-10 text-muted-foreground">Loading profile...</div>;
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      name,
      weight: Number(weight),
      weightUnit: weightUnit as 'kg' | 'lbs',
      restTimerDefault: Number(restTimer),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your settings and preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
          <CardDescription>Configure your profile to estimate calories burned correctly.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Lifter" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Weight</label>
                <Input type="number" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Unit</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={weightUnit} 
                  onChange={(e) => setWeightUnit(e.target.value)}
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Default Rest Timer (seconds)</label>
              <Input type="number" value={restTimer} onChange={(e) => setRestTimer(parseInt(e.target.value))} />
            </div>

            <Button type="submit" className="w-full font-bold">
              {saved ? 'Saved!' : 'Save Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
