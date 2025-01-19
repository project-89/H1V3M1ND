import { create, StateCreator } from 'zustand';
import {
  Mission,
  MissionStatus,
  ParticipantType,
  SingleParticipantMission,
  MissionType,
} from '@/lib/types';

interface MissionStore {
  missions: Mission[];
  isLoading: boolean;
  error: string | null;
  selectedMissionId: string | null;

  // Actions
  setMissions: (missions: Mission[]) => void;
  setSelectedMission: (missionId: string | null) => void;
  acceptMission: (missionId: string) => Promise<void>;
  updateMissionStatus: (missionId: string, status: MissionStatus) => Promise<void>;
  createMission: (
    mission: Omit<
      SingleParticipantMission,
      'id' | 'status' | 'createdAt' | 'expiryDate' | 'escrowAddress' | 'createdBy'
    >
  ) => Promise<void>;

  // Queries
  getMissionById: (id: string) => Mission | undefined;

  // API calls
  fetchMissions: () => Promise<void>;
}

// Sample missions for development
const sampleMissions: Mission[] = [
  {
    id: '1',
    title: 'Neural Network Training',
    description:
      'Train a neural network model for advanced pattern recognition in cybersecurity applications.',
    type: MissionType.Single,
    participantType: ParticipantType.Agent,
    status: MissionStatus.Active,
    baseRequirements: {
      timeLimit: 48,
      stakeAmount: 500,
    },
    requirements: {
      capabilities: ['machine-learning', 'pattern-recognition', 'data-analysis'],
    },
    createdBy: 'system',
    escrowAddress: '0x...',
    createdAt: Date.now(),
    expiryDate: Date.now() + 48 * 60 * 60 * 1000, // 48 hours from now
    failureConditions: [
      'Model accuracy falls below 85% on validation dataset',
      'Training time exceeds the specified time limit',
      'Memory usage exceeds allocated resources',
      'Failure to implement required safety measures',
    ],
  },
  {
    id: '2',
    title: 'Swarm Protocol Development',
    description: 'Develop and implement a new swarm intelligence protocol for distributed systems.',
    type: MissionType.Multi,
    requirements: {
      minParticipants: 3,
      maxParticipants: 10,
      composition: {
        humans: 2,
        agents: 1,
      },
      capabilities: ['distributed-systems', 'algorithm-design', 'swarm-intelligence'],
    },
    status: MissionStatus.Active,
    baseRequirements: {
      timeLimit: 168,
      stakeAmount: 2000,
    },
    createdBy: 'system',
    escrowAddress: '0x...',
    createdAt: Date.now(),
    expiryDate: Date.now() + 168 * 60 * 60 * 1000, // 168 hours from now
    failureConditions: [
      'Protocol fails to achieve consensus in test environment',
      'Network latency exceeds acceptable thresholds',
      'System fails to scale beyond minimum participant count',
      'Critical security vulnerabilities identified in code review',
    ],
  },
  {
    id: '3',
    title: 'Security Audit',
    description: 'Perform a comprehensive security audit of a smart contract system.',
    type: MissionType.Single,
    participantType: ParticipantType.Any,
    status: MissionStatus.InProgress,
    baseRequirements: {
      timeLimit: 72,
      stakeAmount: 1000,
    },
    requirements: {
      capabilities: ['smart-contracts', 'security-analysis', 'code-review'],
      minimumRank: 3,
    },
    createdBy: 'system',
    escrowAddress: '0x...',
    createdAt: Date.now(),
    expiryDate: Date.now() + 72 * 60 * 60 * 1000, // 72 hours from now
    failureConditions: [
      'Missing critical vulnerabilities during the audit',
      'Providing false positives that delay deployment',
      'Failing to document findings according to standard',
      'Not completing all test cases in the audit plan',
    ],
  },
];

const createMissionStore: StateCreator<MissionStore, [], [], MissionStore> = (set, get) => ({
  missions: [],
  isLoading: false,
  error: null,
  selectedMissionId: null,

  setMissions: (missions: Mission[]) => set({ missions }),

  setSelectedMission: (missionId: string | null) => set({ selectedMissionId: missionId }),

  getMissionById: (id: string) => get().missions.find((m: Mission) => m.id === id),

  acceptMission: async (missionId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Optimistic update
      const missions = get().missions.map((mission: Mission) =>
        mission.id === missionId ? { ...mission, status: MissionStatus.InProgress } : mission
      );

      set({ missions, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to accept mission', isLoading: false });
      throw error;
    }
  },

  updateMissionStatus: async (missionId: string, status: MissionStatus) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const missions = get().missions.map((mission: Mission) =>
        mission.id === missionId ? { ...mission, status } : mission
      );

      set({ missions, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to update mission status', isLoading: false });
      throw error;
    }
  },

  createMission: async (missionData) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const now = Date.now();
      const timeLimit = missionData.baseRequirements.timeLimit || 24;

      const newMission: SingleParticipantMission = {
        ...missionData,
        id: Math.random().toString(36).substr(2, 9), // Generate random ID (replace with actual ID from API)
        status: MissionStatus.Active,
        createdAt: now,
        expiryDate: now + timeLimit * 60 * 60 * 1000,
        createdBy: 'user', // Replace with actual user ID
        escrowAddress: '0x...', // Replace with actual escrow address
      };

      const missions = [...get().missions, newMission];
      set({ missions, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to create mission', isLoading: false });
      throw error;
    }
  },

  fetchMissions: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ missions: sampleMissions, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch missions', isLoading: false });
      throw error;
    }
  },
});

export const useMissionStore = create<MissionStore>()(createMissionStore);
