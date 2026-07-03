import { create } from 'zustand';

interface AppState {
  isLoading: boolean;
  activeTab: 'workout' | 'history' | 'profile';
  setLoading: (isLoading: boolean) => void;
  setActiveTab: (tab: 'workout' | 'history' | 'profile') => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: false,
  activeTab: 'workout',
  setLoading: (isLoading) => set({ isLoading }),
  setActiveTab: (activeTab) => set({ activeTab }),
}));
