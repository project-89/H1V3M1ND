import { Objective } from '../types';

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

export enum ROLE {
  USER = 'user',
  AGENT_INITIATE = 'agent-initiate',
  AGENT_FIELD = 'agent-field',
  AGENT_SENIOR = 'agent-senior',
  AGENT_MASTER = 'agent-master',
  ADMIN = 'admin',
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
  objectives?: Objective[];
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

export interface FailureRecord {
  condition: any; // TODO: Update with proper type
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
export type MissionWithHistory = Mission & MissionHistoryDetails;
