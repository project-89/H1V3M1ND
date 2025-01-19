export enum ParticipantType {
  Human = 'human',
  Agent = 'agent',
  Any = 'any',
}

export enum MissionScale {
  Solo = 'solo',
  Party = 'party',
  Swarm = 'swarm',
}

export enum MissionStatus {
  Active = 'active',
  InProgress = 'in_progress',
  PendingValidation = 'pending_validation',
  InValidation = 'in_validation',
  Completed = 'completed',
  Failed = 'failed',
  Expired = 'expired',
}

export enum MissionType {
  Single = 'single',
  Multi = 'multi',
}

export enum TimeRange {
  Short = 'short', // < 24 hours
  Medium = 'medium', // 24-72 hours
  Long = 'long', // > 72 hours
}

export enum StakeRange {
  Low = 'low', // < 500 P89
  Medium = 'medium', // 500-2000 P89
  High = 'high', // > 2000 P89
}

export type ValidationRequirement = 'none' | 'single' | 'multi';
export type MissionPriority = 'normal' | 'urgent' | 'critical';

export interface BaseMission {
  id: string;
  title: string;
  description: string;
  createdBy: string; // participant id
  status: MissionStatus;
  baseRequirements: {
    timeLimit?: number; // in hours
    stakeAmount?: number; // in P89 tokens
  };
  escrowAddress: string;
  createdAt: number; // timestamp
  expiryDate: number; // timestamp
}

export interface SingleParticipantMission extends BaseMission {
  type: MissionType.Single;
  participantType: ParticipantType;
  requirements: {
    capabilities?: string[];
    minimumRank?: number;
    categorySpecificRanks?: {
      [category: string]: number;
    };
  };
  failureConditions: string[];
}

export interface MultiParticipantMission extends BaseMission {
  type: MissionType.Multi;
  requirements: {
    minParticipants: number;
    maxParticipants: number;
    composition?: {
      humans?: number;
      agents?: number;
    };
    capabilities?: string[];
  };
  failureConditions: string[];
}

export type Mission = SingleParticipantMission | MultiParticipantMission;
