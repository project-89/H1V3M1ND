'use client';

import { Clock, Target, AlertTriangle, CheckCircle2, Timer } from 'lucide-react';
import { Mission, MissionStatus } from '@/lib/types';
import { Badge } from '@/components/ui';

interface MissionProgressProps {
  mission: Mission;
}

export function MissionProgress({ mission }: MissionProgressProps) {
  const getTimeRemaining = () => {
    const now = Date.now();
    const timeLeft = mission.expiryDate - now;
    const hoursLeft = Math.max(0, Math.floor(timeLeft / (1000 * 60 * 60)));
    const minutesLeft = Math.max(0, Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)));

    return { hoursLeft, minutesLeft };
  };

  const getProgressPercentage = () => {
    const totalDuration = mission.expiryDate - mission.createdAt;
    const elapsed = Date.now() - mission.createdAt;
    return Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
  };

  const getStatusColor = (status: MissionStatus) => {
    switch (status) {
      case MissionStatus.Active:
        return 'bg-blue-500/20 text-blue-400 border-blue-400/50';
      case MissionStatus.InProgress:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/50';
      case MissionStatus.Completed:
        return 'bg-green-500/20 text-green-400 border-green-400/50';
      case MissionStatus.Failed:
        return 'bg-red-500/20 text-red-400 border-red-400/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-400/50';
    }
  };

  const { hoursLeft, minutesLeft } = getTimeRemaining();
  const progress = getProgressPercentage();
  const isUrgent = hoursLeft < 12;

  return (
    <div className="bg-cyber-dark border border-cyber-purple/50 rounded-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">{mission.title}</h2>
          <p className="text-gray-400">{mission.description}</p>
        </div>
        <Badge variant="outline" className={getStatusColor(mission.status)}>
          {mission.status}
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-black/40 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyber-purple via-neon-pink to-cyber-purple-light relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Time Remaining */}
        <div className="bg-black/20 rounded-lg p-4 border border-cyber-purple/30">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className={`w-4 h-4 ${isUrgent ? 'text-red-400' : 'text-cyber-purple-light'}`} />
            <span className="text-gray-400">Time Remaining</span>
          </div>
          <p className={`text-xl font-bold ${isUrgent ? 'text-red-400' : 'text-white'}`}>
            {hoursLeft}h {minutesLeft}m
          </p>
          {isUrgent && (
            <div className="flex items-center space-x-1 mt-1 text-red-400 text-sm">
              <AlertTriangle className="w-3 h-3" />
              <span>Urgent</span>
            </div>
          )}
        </div>

        {/* Stake Info */}
        <div className="bg-black/20 rounded-lg p-4 border border-cyber-purple/30">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-4 h-4 text-cyber-purple-light" />
            <span className="text-gray-400">Stake Amount</span>
          </div>
          <p className="text-xl font-bold text-white">{mission.baseRequirements.stakeAmount} P89</p>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="relative pt-4">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-cyber-purple/30" />
        <div className="space-y-6">
          <div className="flex items-center space-x-4 relative">
            <div className="w-8 h-8 rounded-full bg-cyber-purple flex items-center justify-center z-10">
              <Timer className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white font-medium">Mission Started</p>
              <p className="text-sm text-gray-400">
                {new Date(mission.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 relative">
            <div className="w-8 h-8 rounded-full bg-cyber-purple/50 flex items-center justify-center z-10">
              <CheckCircle2 className="w-4 h-4 text-white/70" />
            </div>
            <div>
              <p className="text-white/70 font-medium">Mission Deadline</p>
              <p className="text-sm text-gray-400">
                {new Date(mission.expiryDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
