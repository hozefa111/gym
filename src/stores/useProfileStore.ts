import { create } from 'zustand';
import { UserProfile } from '../types/database.types';
import { db } from '../lib/db';

interface ProfileState {
  profile: UserProfile | null;
  loadProfile: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const DEFAULT_PROFILE: UserProfile = {
  id: 'default_user',
  name: 'Lifter',
  gender: 'other',
  weight: 70,
  activityLevel: 'moderately_active',
  weightUnit: 'kg',
  restTimerDefault: 90,
};

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: null,
  
  loadProfile: async () => {
    let profile = await db.profile.get('default_user');
    if (!profile) {
      profile = DEFAULT_PROFILE;
      await db.profile.put(profile);
    }
    set({ profile });
  },

  updateProfile: async (updates) => {
    const currentProfile = get().profile || DEFAULT_PROFILE;
    const updatedProfile = { ...currentProfile, ...updates };
    
    await db.profile.put(updatedProfile);
    set({ profile: updatedProfile });
  }
}));
