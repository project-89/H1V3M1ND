export enum MissionType {
  Single = 'single',
  Multi = 'multi',
}

export enum ParticipantType {
  Human = 'human',
  Agent = 'agent',
  Any = 'any',
}

export enum MissionStatus {
  Active = 'active',
  InProgress = 'in-progress',
  PendingValidation = 'pending_validation',
  InValidation = 'in_validation',
  Completed = 'completed',
  Failed = 'failed',
  Expired = 'expired',
}

export enum ROLE {
  USER = 'user',
  AGENT_INITIATE = 'agent-initiate',
  AGENT_FIELD = 'agent-field',
  AGENT_SENIOR = 'agent-senior',
  AGENT_MASTER = 'agent-master',
  ADMIN = 'admin',
}

interface BaseRequirements {
  timeLimit: number; // in hours
  stakeAmount: number; // in Project89 tokens
}

interface BaseMission {
  id: string;
  type: MissionType;
  title: string;
  description: string;
  status: MissionStatus;
  createdAt: number;
  expiryDate: number;
  escrowAddress: string;
  createdBy: string;
  baseRequirements: BaseRequirements;
  failureConditions: any[]; // TODO: Define failure conditions type
}

export interface SingleParticipantRequirements {
  capabilities: string[];
  minimumRank: ROLE;
  categorySpecificRanks?: Record<string, ROLE>;
  preferredAgent?: string;
  specialRequirements?: string[];
}

export interface TeamComposition {
  humans?: number;
  agents?: number;
  teamStructure?: string;
  roleDistribution?: string;
  collaborationRequirements?: string;
}

export interface MultiParticipantRequirements {
  minParticipants: number;
  maxParticipants: number;
  capabilities: string[];
  composition: TeamComposition;
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

export interface MissionHistoryDetails {
  duration: number;
  reward: number;
  xpGained: number;
  teamSize: number;
  completedAt: number;
}

export type Mission = SingleParticipantMission | MultiParticipantMission;
export type ExtendedMission = Mission & MissionHistoryDetails;
