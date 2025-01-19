'use client';

import { Trophy, Star, Target, Zap } from 'lucide-react';
import { Badge } from '@/components/ui';

interface Achievement {
  id: string;
  title: string;
  description: string;
  type: 'milestone' | 'skill' | 'special' | 'challenge';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt: number;
}

interface ProfileAchievementsProps {
  achievements: Achievement[];
}

export function ProfileAchievements({ achievements }: ProfileAchievementsProps) {
  const getAchievementIcon = (type: Achievement['type']) => {
    switch (type) {
      case 'milestone':
        return Trophy;
      case 'skill':
        return Star;
      case 'special':
        return Zap;
      case 'challenge':
        return Target;
      default:
        return Trophy;
    }
  };

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'legendary':
        return 'bg-neon-pink/20 text-neon-pink border-neon-pink/50';
      case 'epic':
        return 'bg-cyber-purple/20 text-cyber-purple border-cyber-purple/50';
      case 'rare':
        return 'bg-blue-500/20 text-blue-400 border-blue-400/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-400/50';
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-cyber-dark border border-cyber-purple/50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Achievements</h2>
      <div className="grid grid-cols-1 gap-4">
        {achievements.map((achievement) => {
          const Icon = getAchievementIcon(achievement.type);
          return (
            <div
              key={achievement.id}
              className="flex items-start space-x-4 p-4 border border-cyber-purple/20 rounded-lg bg-black/20"
            >
              <div className="flex-shrink-0">
                <Icon className="w-6 h-6 text-cyber-purple-light" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-semibold text-white">{achievement.title}</h3>
                  <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                    {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                  </Badge>
                </div>
                <p className="text-gray-400 text-sm mb-2">{achievement.description}</p>
                <p className="text-xs text-gray-500">
                  Earned on {formatDate(achievement.earnedAt)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
