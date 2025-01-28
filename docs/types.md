# H1V3M1ND Type System

## Mission System

### Core Mission Types

#### Mission Base Types
```typescript
type Mission = SingleParticipantMission | MultiParticipantMission;

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

interface BaseRequirements {
  timeLimit: number; // in hours
  stakeAmount: number; // in Project89 tokens
}

interface SingleParticipantMission extends BaseMission {
  type: MissionType.Single;
  participantType: ParticipantType;
  requirements: SingleParticipantRequirements;
}

interface MultiParticipantMission extends BaseMission {
  type: MissionType.Multi;
  requirements: MultiParticipantRequirements;
}
```

#### Extended Mission Type
```typescript
type MissionWithHistory = Mission & {
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
```

### Mission Requirements

```typescript
interface SingleParticipantRequirements {
  objectives: Objective[];
  minimumRank: ROLE;
  categorySpecificRanks?: Record<string, ROLE>;
  preferredAgent?: string;
  specialRequirements?: string[];
  capabilities?: string[];
}

interface MultiParticipantRequirements {
  minParticipants: number;
  maxParticipants: number;
  objectives: Objective[];
  composition: TeamComposition;
  capabilities?: string[];
}

interface TeamComposition {
  humans?: number;
  agents?: number;
  teamStructure?: string;
  roleDistribution?: string;
  collaborationRequirements?: string;
}
```

### Mission Objectives & Verification

```typescript
interface MissionObjective {
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

interface VerificationRequirement {
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
```

### Failure Conditions

```typescript
interface FailureCondition {
  id: string;
  description: string;
  type: FailureConditionType;
  category: FailureConditionCategory;
  severity?: FailureConditionType;
}

interface FailureRecord {
  condition: FailureCondition;
  occurredAt: number;
  details: string;
  disputed?: boolean;
  disputeDetails?: string;
  disputeStatus?: 'pending' | 'accepted' | 'rejected';
}
```

### Mission Enums

```typescript
enum MissionType {
  Single = 'single',
  Multi = 'multi',
}

enum MissionStatus {
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

enum ParticipantType {
  Human = 'human',
  Agent = 'agent',
  Any = 'any',
}

enum VerificationType {
  AutoGPS = 'auto_gps',
  ManualGPS = 'manual_gps',
  Photo = 'photo',
  Video = 'video',
  MultiPhoto = 'multi_photo',
  Document = 'document',
  Code = 'code',
  Manual = 'manual',
}

enum FailureConditionType {
  Critical = 'Critical',
  Standard = 'Standard',
  Warning = 'Warning',
}

enum FailureConditionCategory {
  Performance = 'performance',
  Security = 'security',
  Compliance = 'compliance',
  Technical = 'technical',
  Communication = 'communication',
}
```

## User System

### Core User Types

```typescript
interface UserProfile {
  id: string;
  walletAddress: string;
  username: string;
  bio?: string;
  avatarUrl?: string;
  contactInfo?: {
    email?: string;
    discord?: string;
    twitter?: string;
    github?: string;
  };
  capabilities: Capability[];
  stats: ProfileStats;
  badges: Badge[];
  specializations: SpecializationType[];
  preferences: {
    isProfilePublic: boolean;
    showContactInfo: boolean;
    showStats: boolean;
  };
}

interface ProfileStats {
  missionsCompleted: number;
  successRate: number;
  totalRewards: number;
  reputation: number;
  joinedAt: Date;
  lastActive: Date;
}

interface UserSkill {
  id: string;
  name: string;
  description: string;
  rating?: number;
  completedMissions: number;
  lastUsed?: Date;
}

interface Capability {
  id: string;
  name: string;
  level: SkillLevel;
  type: SpecializationType;
  isVerified: boolean;
  verifiedAt?: Date;
  description?: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  earnedAt: Date;
}
```

### User Enums

```typescript
enum ROLE {
  USER = 'user',
  AGENT_INITIATE = 'agent-initiate',
  AGENT_FIELD = 'agent-field',
  AGENT_SENIOR = 'agent-senior',
  AGENT_MASTER = 'agent-master',
  ADMIN = 'admin',
}

enum SkillLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
  Expert = 'Expert',
}

enum SpecializationType {
  Development = 'Development',
  Design = 'Design',
  Research = 'Research',
  Security = 'Security',
  Community = 'Community',
  Content = 'Content',
  Other = 'Other',
}
```

## Achievement System

### Core Achievement Types

```typescript
interface Achievement {
  id: string;
  title: string;
  description: string;
  type: AchievementType;
  rarity: AchievementRarity;
  imageUrl?: string;
  unlockedAt: Date;
  progress?: {
    current: number;
    target: number;
  };
  rewards?: {
    xp?: number;
    tokens?: number;
    badges?: string[];
  };
}
```

### Achievement Enums

```typescript
enum AchievementType {
  Milestone = 'milestone', // One-time achievements (first mission, rank ups)
  Progress = 'progress',   // Cumulative achievements (complete X missions)
  Skill = 'skill',        // Skill-based achievements (reach X rating)
  Special = 'special',    // Special events or unique achievements
}

enum AchievementRarity {
  Common = 'common',
  Rare = 'rare',
  Epic = 'epic',
  Legendary = 'legendary',
}
``` 