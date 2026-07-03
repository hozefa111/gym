import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { DashboardPage } from '@/pages/DashboardPage';
import { WorkoutPage } from '@/pages/WorkoutPage';
import { HistoryPage } from '@/pages/HistoryPage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';
import { ProfilePage } from '@/pages/ProfilePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'workout', element: <WorkoutPage /> },
      { path: 'history', element: <HistoryPage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
], { basename: import.meta.env.BASE_URL });

export function AppRouter() {
  return <RouterProvider router={router} />;
}
