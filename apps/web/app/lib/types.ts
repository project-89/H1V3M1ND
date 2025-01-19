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

export enum FailureConditionSeverity {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export enum FailureConditionCategory {
  Performance = 'Performance',
  Security = 'Security',
  Compliance = 'Compliance',
  Technical = 'Technical',
  Communication = 'Communication',
}

export interface FailureCondition {
  id: string;
  description: string;
  severity: FailureConditionSeverity;
  category: FailureConditionCategory;
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
  failureConditions: FailureCondition[];
}

interface SingleParticipantRequirements {
  capabilities?: string[];
  minimumRank?: number;
  categorySpecificRanks?: { [category: string]: number };
  preferredAgent?: string;
  specialRequirements?: string;
}

interface TeamComposition {
  humans?: number;
  agents?: number;
  teamStructure?: string;
  roleDistribution?: string;
  collaborationRequirements?: string;
}

interface MultiParticipantRequirements {
  minParticipants: number;
  maxParticipants: number;
  capabilities?: string[];
  composition?: TeamComposition;
}

export interface SingleParticipantMission extends BaseMission {
  type: MissionType.Single;
  participantType: ParticipantType;
  requirements: SingleParticipantRequirements;
}

export interface MultiParticipantMission extends BaseMission {
  type: MissionType.Multi;
  requirements: MultiParticipantRequirements;
}

export type Mission = SingleParticipantMission | MultiParticipantMission;
