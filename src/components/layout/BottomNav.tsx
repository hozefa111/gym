import { Home, Activity, BarChart2, History, User } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Activity, label: 'Workout', path: '/workout' },
  { icon: History, label: 'History', path: '/history' },
  { icon: BarChart2, label: 'Analytics', path: '/analytics' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 z-50 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-area-bottom">
      <div className="container max-w-md mx-auto flex h-16 items-center justify-around px-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <NavLink
              key={path}
              to={path}
              className={cn(
                "relative flex flex-col items-center justify-center w-16 h-full space-y-1 text-muted-foreground transition-colors hover:text-foreground",
                isActive && "text-primary"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{label}</span>
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute -top-[1px] h-[2px] w-8 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
