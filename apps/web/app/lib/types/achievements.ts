export enum AchievementType {
  Milestone = 'milestone', // One-time achievements (first mission, rank ups)
  Progress = 'progress', // Cumulative achievements (complete X missions)
  Skill = 'skill', // Skill-based achievements (reach X rating)
  Special = 'special', // Special events or unique achievements
}

export enum AchievementRarity {
  Common = 'common',
  Rare = 'rare',
  Epic = 'epic',
  Legendary = 'legendary',
}

export interface Achievement {
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
