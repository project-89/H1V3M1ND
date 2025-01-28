import { create, StateCreator } from 'zustand';
import {
  Mission,
  MissionStatus,
  SingleParticipantMission,
  MissionType,
  MultiParticipantMission,
} from '@H1V3M1ND/types';
import { sampleMissions } from '@/lib/examples/missions';

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
    missionData: Partial<SingleParticipantMission> | Partial<MultiParticipantMission>
  ) => Promise<void>;

  // Queries
  getMissionById: (id: string) => Mission | undefined;

  // API calls
  fetchMissions: () => Promise<void>;
}

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
      const timeLimit = missionData.baseRequirements?.timeLimit || 24;

      const baseData = {
        ...missionData,
        id: Math.random().toString(36).substr(2, 9), // Generate random ID (replace with actual ID from API)
        status: MissionStatus.Active,
        createdAt: now,
        expiryDate: now + timeLimit * 60 * 60 * 1000,
        createdBy: 'user', // Replace with actual user ID
        escrowAddress: '0x...', // Replace with actual escrow address
        failureConditions: [], // Will be added in a later step
      };

      let newMission: Mission;
      if (missionData.type === MissionType.Single) {
        const singleMissionData = missionData as Partial<SingleParticipantMission>;
        if (!singleMissionData.participantType) {
          throw new Error('Participant type is required for single participant missions');
        }
        newMission = {
          ...baseData,
          type: MissionType.Single,
          participantType: singleMissionData.participantType,
          requirements: singleMissionData.requirements || {},
        } as SingleParticipantMission;
      } else {
        const multiMissionData = missionData as Partial<MultiParticipantMission>;
        if (
          !multiMissionData.requirements?.minParticipants ||
          !multiMissionData.requirements?.maxParticipants
        ) {
          throw new Error('Min and max participants are required for multi-participant missions');
        }
        newMission = {
          ...baseData,
          type: MissionType.Multi,
          requirements: {
            minParticipants: multiMissionData.requirements.minParticipants,
            maxParticipants: multiMissionData.requirements.maxParticipants,
            composition: multiMissionData.requirements.composition,
            capabilities: multiMissionData.requirements.capabilities,
            objectives: multiMissionData.requirements.objectives || [],
          },
        } as MultiParticipantMission;
      }

      const missions = [...get().missions, newMission];
      set({ missions, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to create mission', isLoading: false });
      throw error;
    }
  },

  fetchMissions: async () => {
    set({ isLoading: true });
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ missions: sampleMissions, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch missions', isLoading: false });
    }
  },
});

export const useMissionStore = create<MissionStore>()(createMissionStore);
