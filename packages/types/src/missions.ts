import { ROLE } from './user';

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
  Available = 'available',
  PendingStake = 'pending_stake',
  Active = 'active',
  InProgress = 'in_progress',
  PendingValidation = 'pending_validation',
  InValidation = 'in_validation',
  Completed = 'completed',
  Failed = 'failed',
  Expired = 'expired',
}

export enum MissionScale {
  Solo = 'solo',
  Party = 'party',
  Swarm = 'swarm',
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

export enum VerificationType {
  AutoGPS = 'auto_gps',
  ManualGPS = 'manual_gps',
  Photo = 'photo',
  Video = 'video',
  MultiPhoto = 'multi_photo',
  Document = 'document',
  Code = 'code',
  Manual = 'manual',
}

export interface Objective {
  task: string;
  details: string;
  completed?: boolean;
  verifiedAt?: number;
}

export interface BaseRequirements {
  timeLimit: number; // in hours
  stakeAmount: number; // in Project89 tokens
}

export interface BaseMission {
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
  objectives: Objective[];
  minimumRank: ROLE;
  categorySpecificRanks?: Record<string, ROLE>;
  preferredAgent?: string;
  specialRequirements?: string[];
  capabilities?: string[]; // Added for backward compatibility
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
  objectives: Objective[];
  composition: TeamComposition;
  capabilities?: string[]; // Added for backward compatibility
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

export interface VerificationRequirement {
  type: VerificationType;
  description: string;
  required: boolean;
  autoVerify?: boolean;
  metadata?: {
    minPhotos?: number;
    maxPhotos?: number;
    maxVideoLength?: number;
    allowedFileTypes?: string[];
    gpsCoordinates?: {
      latitude: number;
      longitude: number;
      radius: number; // in meters
    };
  };
}

export interface MissionObjective {
  id: string;
  task: string;
  details: string;
  verification?: VerificationRequirement;
  completed?: boolean;
  verifiedAt?: number;
  verificationData?: {
    type: VerificationType;
    data: any; // URLs, coordinates, etc.
    verifiedBy?: string;
    verificationNotes?: string;
  };
}

export interface FailureCondition {
  id: string;
  description: string;
  type: FailureConditionType;
  category: FailureConditionCategory;
  severity?: FailureConditionType; // Added for backward compatibility
}

export enum FailureConditionType {
  Critical = 'Critical',
  Standard = 'Standard',
  Warning = 'Warning',
}

export enum FailureConditionCategory {
  Performance = 'performance',
  Security = 'security',
  Compliance = 'compliance',
  Technical = 'technical',
  Communication = 'communication',
}

export interface FailureRecord {
  condition: FailureCondition;
  occurredAt: number;
  details: string;
  disputed?: boolean;
  disputeDetails?: string;
  disputeStatus?: 'pending' | 'accepted' | 'rejected';
}

export interface MissionHistoryDetails {
  duration: number;
  reward: number;
  xpGained: number;
  teamSize: number;
  startedAt: number;
  completedAt: number;
  failedAt?: number;
  objectives: MissionObjective[];
  failureRecords?: FailureRecord[];
  tokenPayout?: {
    amount: number;
    txHash: string;
    timestamp: number;
  };
}

export type Mission = SingleParticipantMission | MultiParticipantMission;
export type ExtendedMission = Mission & {
  duration: number;
  reward: number;
  xpGained: number;
  teamSize: number;
  startedAt: number;
  completedAt: number;
  failedAt?: number;
  objectives: MissionObjective[];
  failureRecords?: FailureRecord[];
  tokenPayout?: {
    amount: number;
    txHash: string;
    timestamp: number;
  };
};
