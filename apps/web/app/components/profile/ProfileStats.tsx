'use client';

import { Award, Clock, Target, TrendingUp } from 'lucide-react';

interface ProfileStatsProps {
  stats: {
    completedMissions: number;
    successRate: number;
    totalStaked: number;
    reputation: number;
    rank: number;
  };
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  const statItems = [
    {
      label: 'Completed Missions',
      value: stats.completedMissions,
      icon: Award,
      color: 'text-cyber-purple-light',
    },
    {
      label: 'Success Rate',
      value: `${stats.successRate}%`,
      icon: TrendingUp,
      color: 'text-neon-pink',
    },
    {
      label: 'Total Staked',
      value: `${stats.totalStaked} Project89`,
      icon: Target,
      color: 'text-cyber-purple',
    },
    {
      label: 'Reputation',
      value: stats.reputation,
      icon: Clock,
      color: 'text-neon-pink',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="bg-cyber-dark border border-cyber-purple/50 rounded-lg p-4 hover:border-cyber-purple transition-colors"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Icon className={`w-4 h-4 ${item.color}`} />
              <span className="text-gray-400">{item.label}</span>
            </div>
            <p className="text-2xl font-bold text-white">{item.value}</p>
          </div>
        );
      })}
    </div>
  );
}
