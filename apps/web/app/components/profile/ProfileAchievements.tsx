'use client';

import { Badge, Progress } from '@H1V3M1ND/ui';
import { Trophy, Star, Target, Sparkles } from 'lucide-react';
import { Achievement, AchievementRarity, AchievementType } from '@H1V3M1ND/types';

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
        return 'border-cyber-purple-light text-cyber-purple-light';
      default:
        return 'border-cyber-purple-light text-cyber-purple-light';
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
    <div className="bg-cyber-black border-2 border-cyber-purple-light rounded-lg p-6">
      <h3 className="text-2xl font-bold text-neon-pink mb-6">Achievements</h3>
      <div className="space-y-6">
        {achievements.map((achievement) => {
          const Icon = getTypeIcon(achievement.type);
          return (
            <div
              key={achievement.id}
              className="bg-cyber-dark/80 border border-cyber-purple/30 rounded-lg p-4 hover:border-cyber-purple transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-neon-cyan" />
                  <span className="text-lg font-medium text-neon-cyan">{achievement.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                    {achievement.rarity}
                  </Badge>
                  {achievement.rewards?.tokens && (
                    <Badge
                      variant="outline"
                      className="border-cyber-purple-light text-cyber-purple-light"
                    >
                      +{achievement.rewards.tokens} tokens
                    </Badge>
                  )}
                </div>
              </div>
              {achievement.progress && (
                <div className="mb-3">
                  <Progress
                    value={(achievement.progress.current / achievement.progress.target) * 100}
                    className="[--progress-bg:theme(colors.cyber.black)] [--progress-indicator-from:theme(colors.neon.cyan)] [--progress-indicator-via:theme(colors.neon.pink)] [--progress-indicator-to:theme(colors.neon.pink)] h-2"
                  />
                </div>
              )}
              <div className="flex justify-between items-center">
                <p className="text-cyber-gray text-sm">{achievement.description}</p>
                <span className="text-cyber-gray text-xs whitespace-nowrap ml-4">
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
