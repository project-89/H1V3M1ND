export enum ROLE {
  USER = 'user',
  AGENT_INITIATE = 'agent-initiate',
  AGENT_FIELD = 'agent-field',
  AGENT_SENIOR = 'agent-senior',
  AGENT_MASTER = 'agent-master',
  ADMIN = 'admin',
}

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
  InProgress = 'in-progress',
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
  Low = 'low', // < 500 Project89
  Medium = 'medium', // 500-2000 Project89
  High = 'high', // > 2000 Project89
}

export enum FailureConditionSeverity {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export enum FailureConditionCategory {
  Performance = 'performance',
  Security = 'security',
  Compliance = 'compliance',
  Technical = 'technical',
  Communication = 'communication',
}

export interface FailureCondition {
  id: string;
  description: string;
  severity: FailureConditionSeverity;
  category: FailureConditionCategory;
}

export type ValidationRequirement = 'none' | 'single' | 'multi';
export type MissionPriority = 'normal' | 'urgent' | 'critical';

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
  failureConditions: FailureCondition[];
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

export type Mission = SingleParticipantMission | MultiParticipantMission;
