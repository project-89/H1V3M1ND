'use client';

import { useState } from 'react';
import { Wallet, Star, Award, Clock, Loader2 } from 'lucide-react';
import { Button, Badge } from '@H1V3M1ND/ui';

interface ProfileStats {
  completedMissions: number;
  successRate: number;
  totalStaked: number;
  reputation: number;
  rank: number;
}

interface ProfileHeaderProps {
  username: string;
  avatarUrl?: string;
  stats: ProfileStats;
}

export function ProfileHeader({ username, avatarUrl, stats }: ProfileHeaderProps) {
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
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-cyber-purple/20 border-2 border-cyber-purple flex items-center justify-center overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl} alt={username} className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl text-cyber-purple">
                  {username.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2">
              <Badge variant="outline" className="bg-cyber-dark border-neon-pink text-neon-pink">
                Rank {stats.rank}
              </Badge>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-1">{username}</h2>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-400">Reputation: {stats.reputation}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-black/20 rounded-lg p-4 border border-cyber-purple/50">
          <div className="flex items-center space-x-2 mb-2">
            <Award className="w-4 h-4 text-cyber-purple-light" />
            <span className="text-gray-400">Completed Missions</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.completedMissions}</p>
          <p className="text-sm text-gray-400">Success Rate: {stats.successRate}%</p>
        </div>

        <div className="bg-black/20 rounded-lg p-4 border border-cyber-purple/50">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-cyber-purple-light" />
            <span className="text-gray-400">Active Time</span>
          </div>
          <p className="text-2xl font-bold text-white">142h</p>
          <p className="text-sm text-gray-400">Last 30 days</p>
        </div>

        <div className="bg-black/20 rounded-lg p-4 border border-cyber-purple/50">
          <div className="flex items-center space-x-2 mb-2">
            <Wallet className="w-4 h-4 text-cyber-purple-light" />
            <span className="text-gray-400">Total Staked</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.totalStaked}</p>
          <p className="text-sm text-gray-400">Project89 Tokens</p>
        </div>
      </div>
    </div>
  );
}
