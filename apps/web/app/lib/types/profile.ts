export enum SkillLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
  Expert = 'Expert',
}

export enum SpecializationType {
  Development = 'Development',
  Design = 'Design',
  Research = 'Research',
  Security = 'Security',
  Community = 'Community',
  Content = 'Content',
  Other = 'Other',
}

export interface Capability {
  id: string;
  name: string;
  level: SkillLevel;
  type: SpecializationType;
  isVerified: boolean;
  verifiedAt?: Date;
  description?: string;
}

export interface ProfileStats {
  missionsCompleted: number;
  successRate: number;
  totalRewards: number;
  reputation: number;
  joinedAt: Date;
  lastActive: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  earnedAt: Date;
}

export interface UserProfile {
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
