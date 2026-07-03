import { useEffect } from 'react';
import { AppRouter } from './Router';
import { ThemeProvider } from '@/components/theme-provider';
import { useProfileStore } from '@/stores/useProfileStore';

export function App() {
  const loadProfile = useProfileStore((state) => state.loadProfile);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="ironlog-theme">
      <AppRouter />
    </ThemeProvider>
  );
}
