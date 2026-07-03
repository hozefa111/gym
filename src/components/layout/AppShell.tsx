import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { AnimatePresence } from 'framer-motion';

export function AppShell() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans antialiased text-foreground selection:bg-primary/30">
      <Header />
      <main className="flex-1 w-full max-w-md mx-auto p-4 pb-24 relative overflow-x-hidden">
        <AnimatePresence mode="wait">
          <div key={location.pathname} className="w-full h-full">
            <Outlet />
          </div>
        </AnimatePresence>
      </main>
      <BottomNav />
    </div>
  );
}
