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
    if (!rating) return 'border-cyber-purple text-cyber-purple-light';
    if (rating >= 4.5) return 'border-matrix-green text-matrix-green';
    if (rating >= 4.0) return 'border-neon-purple text-neon-purple';
    if (rating >= 3.5) return 'border-neon-pink text-neon-pink';
    return 'border-cyber-purple text-cyber-purple-light';
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
    <div className="bg-cyber-dark border border-cyber-purple/30 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-cyber-white mb-4">Skills & Expertise</h3>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-cyber-purple" />
                <span className="text-cyber-white">{skill.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getRatingColor(skill.rating)}>
                  {skill.rating ? `${skill.rating.toFixed(1)}★` : 'Unrated'}
                </Badge>
                <Badge variant="outline" className="border-cyber-purple text-cyber-purple-light">
                  {skill.completedMissions} missions
                </Badge>
              </div>
            </div>
            <Progress value={((skill.rating || 0) / 5) * 100} />
            <div className="flex justify-between items-center text-sm">
              <p className="text-cyber-gray">{skill.description}</p>
              <span className="text-cyber-gray text-xs">
                Last used: {formatLastUsed(skill.lastUsed)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
