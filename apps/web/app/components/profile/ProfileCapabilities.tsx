'use client';

import { Badge, Progress } from '@H1V3M1ND/ui';
import { Star, Award } from 'lucide-react';

interface UserSkill {
  id: string;
  name: string;
  description: string;
  rating?: number;
  completedMissions: number;
  lastUsed?: Date;
}

interface ProfileCapabilitiesProps {
  skills: UserSkill[];
}

export function ProfileCapabilities({ skills }: ProfileCapabilitiesProps) {
  const getRatingColor = (rating?: number) => {
    if (!rating) return 'border-cyber-purple-light text-cyber-purple-light';
    if (rating >= 4.5) return 'border-matrix-green text-matrix-green';
    if (rating >= 4.0) return 'border-neon-purple text-neon-purple';
    if (rating >= 3.5) return 'border-neon-pink text-neon-pink';
    return 'border-cyber-purple-light text-cyber-purple-light';
  };

  const formatLastUsed = (date?: Date) => {
    if (!date) return 'Never used';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  return (
    <div className="bg-cyber-black border-2 border-cyber-purple-light rounded-lg p-6">
      <h3 className="text-2xl font-bold text-neon-pink mb-6">Skills & Expertise</h3>
      <div className="space-y-6">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="bg-cyber-dark/80 border border-cyber-purple/30 rounded-lg p-4 hover:border-cyber-purple transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-neon-cyan" />
                <span className="text-lg font-medium text-neon-cyan">{skill.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getRatingColor(skill.rating)}>
                  {skill.rating ? `${skill.rating.toFixed(1)}★` : 'Unrated'}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-cyber-purple-light text-cyber-purple-light"
                >
                  {skill.completedMissions} missions
                </Badge>
              </div>
            </div>
            <div className="mb-3">
              <Progress
                value={((skill.rating || 0) / 5) * 100}
                className="[--progress-bg:theme(colors.cyber.black)] [--progress-indicator-from:theme(colors.neon.cyan)] [--progress-indicator-via:theme(colors.neon.pink)] [--progress-indicator-to:theme(colors.neon.pink)] h-2"
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-cyber-gray text-sm">{skill.description}</p>
              <span className="text-cyber-gray text-xs whitespace-nowrap ml-4">
                Last used: {formatLastUsed(skill.lastUsed)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
