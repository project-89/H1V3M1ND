'use client';

import { Badge, Progress } from '@H1V3M1ND/ui';
import { Trophy, Star, Target, Sparkles } from 'lucide-react';
import { Achievement, AchievementRarity, AchievementType } from '@/lib/types/achievements';

interface ProfileAchievementsProps {
  achievements: Achievement[];
}

export function ProfileAchievements({ achievements }: ProfileAchievementsProps) {
  const getTypeIcon = (type: AchievementType) => {
    switch (type) {
      case AchievementType.Milestone:
        return Trophy;
      case AchievementType.Progress:
        return Target;
      case AchievementType.Skill:
        return Star;
      case AchievementType.Special:
        return Sparkles;
      default:
        return Trophy;
    }
  };

  const getRarityColor = (rarity: AchievementRarity) => {
    switch (rarity) {
      case AchievementRarity.Legendary:
        return 'border-matrix-green text-matrix-green';
      case AchievementRarity.Epic:
        return 'border-neon-purple text-neon-purple';
      case AchievementRarity.Rare:
        return 'border-neon-pink text-neon-pink';
      case AchievementRarity.Common:
        return 'border-cyber-purple text-cyber-purple-light';
      default:
        return 'border-cyber-purple text-cyber-purple-light';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-cyber-dark border border-cyber-purple/30 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-cyber-white mb-4">Achievements</h3>
      <div className="space-y-4">
        {achievements.map((achievement) => {
          const Icon = getTypeIcon(achievement.type);
          return (
            <div key={achievement.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-cyber-purple" />
                  <span className="text-cyber-white">{achievement.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                    {achievement.rarity}
                  </Badge>
                  {achievement.rewards?.tokens && (
                    <Badge
                      variant="outline"
                      className="border-cyber-purple text-cyber-purple-light"
                    >
                      +{achievement.rewards.tokens} tokens
                    </Badge>
                  )}
                </div>
              </div>
              {achievement.progress && (
                <Progress
                  value={(achievement.progress.current / achievement.progress.target) * 100}
                />
              )}
              <div className="flex justify-between items-center text-sm">
                <p className="text-cyber-gray">{achievement.description}</p>
                <span className="text-cyber-gray text-xs">
                  Unlocked: {formatDate(achievement.unlockedAt)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
