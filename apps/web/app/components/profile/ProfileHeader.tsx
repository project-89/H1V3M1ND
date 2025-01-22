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
    <div className="bg-cyber-dark border border-cyber-purple rounded-lg p-6 mb-8">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20 border-2 border-cyber-purple">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback className="bg-cyber-dark text-cyber-purple">
              {username?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-2xl font-bold text-cyber-white mb-1">{username}</h2>
            {bio && <p className="text-cyber-gray mb-2">{bio}</p>}
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-cyber-purple-light" />
              <span className="text-cyber-gray">Reputation: {stats.reputation}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-cyber-dark border border-cyber-purple/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Award className="w-4 h-4 text-cyber-purple-light" />
            <span className="text-cyber-gray">Completed Missions</span>
          </div>
          <p className="text-2xl font-bold text-cyber-white">{stats.completedMissions}</p>
          <p className="text-sm text-cyber-gray">Success Rate: {stats.successRate}%</p>
        </div>

        <div className="bg-cyber-dark border border-cyber-purple/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-cyber-purple-light" />
            <span className="text-cyber-gray">Active Time</span>
          </div>
          <p className="text-2xl font-bold text-cyber-white">142h</p>
          <p className="text-sm text-cyber-gray">Last 30 days</p>
        </div>

        <div className="bg-cyber-dark border border-cyber-purple/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Wallet className="w-4 h-4 text-cyber-purple-light" />
            <span className="text-cyber-gray">Total Staked</span>
          </div>
          <p className="text-2xl font-bold text-cyber-white">{stats.totalStaked}</p>
          <p className="text-sm text-cyber-gray">Project89 Tokens</p>
        </div>
      </div>
    </div>
  );
}
