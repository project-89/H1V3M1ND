import { create } from 'zustand';
import { UserProfile, SkillLevel, SpecializationType } from '@/lib/types/profile';

// Stub profile for development
const stubProfile: UserProfile = {
  id: '1',
  walletAddress: '0x1234...5678',
  username: 'CyberAgent',
  bio: 'Experienced mission runner specializing in cybersecurity and blockchain operations.',
  avatarUrl: '/89.jpg',
  contactInfo: {
    email: 'agent@cyber.com',
    discord: 'cyberagent',
    twitter: 'cyberagent',
    github: 'cyberagent',
  },
  capabilities: [
    {
      id: '1',
      name: 'Smart Contract Auditing',
      level: SkillLevel.Expert,
      type: SpecializationType.Security,
      isVerified: true,
      verifiedAt: new Date('2024-01-01'),
      description: 'Specialized in auditing and securing smart contracts.',
    },
    {
      id: '2',
      name: 'Blockchain Development',
      level: SkillLevel.Advanced,
      type: SpecializationType.Development,
      isVerified: true,
      verifiedAt: new Date('2024-01-01'),
    },
  ],
  stats: {
    missionsCompleted: 42,
    successRate: 98,
    totalRewards: 15000,
    reputation: 850,
    joinedAt: new Date('2023-01-01'),
    lastActive: new Date(),
  },
  badges: [
    {
      id: '1',
      name: 'Early Adopter',
      description: 'One of the first agents to join the network',
      imageUrl: '/badges/early-adopter.png',
      earnedAt: new Date('2023-01-01'),
    },
    {
      id: '2',
      name: 'Mission Master',
      description: 'Completed 25+ missions successfully',
      imageUrl: '/badges/mission-master.png',
      earnedAt: new Date('2023-06-01'),
    },
  ],
  specializations: [SpecializationType.Security, SpecializationType.Development],
  preferences: {
    isProfilePublic: true,
    showContactInfo: true,
    showStats: true,
  },
};

interface ProfileState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  fetchProfile: (walletAddress: string) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  // Initialize with stub profile for development
  profile: stubProfile,
  isLoading: false,
  error: null,

  fetchProfile: async (walletAddress: string) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with actual API call
      // For now, return stub profile after a small delay to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ profile: stubProfile, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateProfile: async (updates: Partial<UserProfile>) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with actual API call
      // For now, merge updates with stub profile after a small delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      set((state) => ({
        profile: state.profile ? { ...state.profile, ...updates } : null,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  clearProfile: () => {
    set({ profile: null, error: null });
  },
}));
