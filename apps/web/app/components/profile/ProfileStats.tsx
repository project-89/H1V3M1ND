'use client';

import { Award, Clock, Target, TrendingUp } from 'lucide-react';
import { Progress } from '@H1V3M1ND/ui';

interface ProfileStatsProps {
  stats: {
    completedMissions: number;
    successRate: number;
    totalStaked: number;
    reputation: number;
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
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statItems.map((item, index) => (
          <div key={index} className="bg-cyber-dark border border-cyber-purple/30 rounded-lg p-4">
            <div className="flex items-center gap-2 text-cyber-gray mb-2">
              <item.icon className={`w-4 h-4 ${item.color}`} />
              <span>{item.label}</span>
            </div>
            <p className="text-2xl font-bold text-cyber-white">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
