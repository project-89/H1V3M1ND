'use client';

import { Award, Clock, Target, Star } from 'lucide-react';

import { cn } from '@/lib/utils';

interface ProfileStatsProps {
  stats: {
    completedMissions: number;
    successRate: number;
    totalStaked: number;
  };
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  const statItems = [
    {
      label: 'Agent Experience',
      value: '2,450', // This should come from actual XP data
      subValue: 'Level 3 Agent', // Should be calculated from XP
      icon: Award,
      color: 'text-neon-pink',
    },
    {
      label: 'Completed Missions',
      value: stats.completedMissions,
      subValue: `${stats.successRate}% Success Rate`,
      icon: Target,
      color: 'text-neon-cyan',
    },
    {
      label: 'Total Staked',
      value: `${stats.totalStaked}`,
      subValue: 'Project89 Tokens',
      icon: Star,
      color: 'text-matrix-green',
    },
    {
      label: 'Active Time',
      value: '142h',
      subValue: 'Last 30 days',
      icon: Clock,
      color: 'text-neon-purple',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="bg-cyber-black rounded-lg p-6 border-2 border-cyber-purple-light hover:bg-cyber-black/80 transition-colors"
        >
          <div className="flex items-center space-x-3 mb-3">
            <item.icon className={`w-5 h-5 ${item.color}`} />
            <span className="text-cyber-gray">{item.label}</span>
          </div>
          <p className={cn('text-2xl font-bold', item.color)}>{item.value}</p>
          <p className="text-sm text-cyber-gray">{item.subValue}</p>
        </div>
      ))}
    </div>
  );
}
