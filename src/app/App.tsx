import { AppRouter } from './Router';
import { ThemeProvider } from '@/components/theme-provider';

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ironlog-theme">
      <AppRouter />
    </ThemeProvider>
  );
}
