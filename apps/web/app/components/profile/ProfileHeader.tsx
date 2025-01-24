'use client';

import { useState } from 'react';
import { Wallet, Star, Award, Clock, Loader2 } from 'lucide-react';
import { Button, Avatar, AvatarImage, AvatarFallback } from '@H1V3M1ND/ui';

interface ProfileStats {
  completedMissions: number;
  successRate: number;
  totalStaked: number;
  reputation: number;
}

interface ProfileHeaderProps {
  username: string;
  bio?: string;
  avatarUrl?: string;
  stats: ProfileStats;
}

export function ProfileHeader({ username, bio, avatarUrl, stats }: ProfileHeaderProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate wallet connection
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsConnecting(false);
  };

  return (
    <div className="bg-cyber-dark/80 border-2 border-cyber-purple-light rounded-lg p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/10 to-neon-pink/5 pointer-events-none" />

      <div className="relative flex items-start justify-between">
        <div className="flex items-center space-x-6">
          <Avatar className="w-24 h-24 border-2 border-neon-cyan ring-2 ring-neon-cyan/20">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback className="bg-cyber-dark text-neon-cyan">
              {username?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-3xl font-bold text-neon-pink mb-2">{username}</h2>
            {bio && <p className="text-cyber-gray mb-4 max-w-2xl">{bio}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
