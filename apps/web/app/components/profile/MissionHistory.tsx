'use client';

import { useState, useEffect, memo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger, Badge } from '@H1V3M1ND/ui';
import { Button } from '@H1V3M1ND/ui';
import {
  Clock,
  Award,
  Coins,
  Star,
  Users,
  Calendar,
  Target,
  Trophy,
  Check,
  X,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

import { MissionStatus, MissionWithHistory, Mission, Objective } from '@H1V3M1ND/types';

interface MissionHistoryProps {
  activeMissions: MissionWithHistory[];
  completedMissions: MissionWithHistory[];
  totalEarned: number;
}

export function MissionHistory({
  activeMissions,
  completedMissions,
  totalEarned,
}: MissionHistoryProps) {
  // Track expired missions for UI updates only
  const [expiredMissions, setExpiredMissions] = useState<Set<string>>(new Set());

  // Filter out expired missions from display
  const displayedActiveMissions = activeMissions.filter(
    (mission) => !expiredMissions.has(mission.id)
  );

  // Filter failed missions
  const failedMissions = completedMissions.filter(
    (mission) => mission.status === MissionStatus.Failed
  );

  // Filter actual completed missions
  const displayedCompletedMissions = completedMissions.filter(
    (mission) => mission.status === MissionStatus.Completed
  );

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: MissionStatus) => {
    switch (status) {
      case MissionStatus.Active:
        return 'bg-matrix-green';
      case MissionStatus.InProgress:
        return 'bg-cyber-yellow';
      case MissionStatus.PendingValidation:
        return 'bg-neon-pink/80';
      case MissionStatus.InValidation:
        return 'bg-neon-cyan/80';
      case MissionStatus.Completed:
        return 'bg-neon-cyan';
      case MissionStatus.Failed:
        return 'bg-neon-pink';
      case MissionStatus.Expired:
        return 'bg-cyber-gray';
      default:
        return 'bg-cyber-gray';
    }
  };

  const calculateTimeRemaining = (expiryDate: number) => {
    const now = Date.now();
    const remaining = expiryDate - now;
    if (remaining <= 0) return 'Expired';

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    if (hours > 0) {
      return `${hours}h remaining`;
    } else if (minutes >= 10) {
      return `${minutes}m remaining`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s remaining`;
    } else {
      return `${seconds}s remaining`;
    }
  };

  const getMissionTimeColor = (mission: MissionWithHistory) => {
    const now = Date.now();
    const remaining = mission.expiryDate - now;
    const duration = mission.duration * 60 * 60 * 1000;
    const percentageRemaining = (remaining / duration) * 100;

    if (percentageRemaining <= 10) {
      return 'text-red-400';
    } else if (percentageRemaining <= 40) {
      return 'text-cyber-yellow';
    } else {
      return 'text-emerald-400';
    }
  };

  const router = useRouter();

  const MissionCard = ({ mission }: { mission: MissionWithHistory }) => {
    const [timeLeft, setTimeLeft] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
      if (mission.status === MissionStatus.Active) {
        let timer: NodeJS.Timeout;

        const updateTimer = () => {
          const now = Date.now();
          const msRemaining = mission.expiryDate - now;
          const timeString = calculateTimeRemaining(mission.expiryDate);

          setTimeLeft(timeString);

          if (timeString === 'Expired') {
            clearInterval(timer);
            setExpiredMissions((prev) => new Set([...prev, mission.id]));
            return 0;
          }

          return msRemaining > 3600000 ? 60000 : 1000;
        };

        // Initial update
        setTimeLeft(calculateTimeRemaining(mission.expiryDate));

        // Set up interval with dynamic update frequency
        const runTimer = () => {
          const interval = updateTimer();
          if (interval > 0) {
            timer = setInterval(updateTimer, interval);
          }
        };

        runTimer();

        return () => {
          if (timer) {
            clearInterval(timer);
          }
        };
      }
    }, [mission]);

    return (
      <div
        onClick={() => router.push(`/missions/${mission.id}`)}
        className="bg-cyber-dark/80 border border-cyber-purple/30 rounded-lg p-4 hover:border-cyber-purple transition-colors cursor-pointer"
      >
        <div className="flex items-start gap-2">
          <div className={`w-1 h-8 rounded-full ${getStatusColor(mission.status)}`} />
          <div className="flex-1">
            <h3 className="text-lg text-cyber-white">{mission.title}</h3>
            <p className="text-cyber-gray text-sm">{mission.description}</p>
            {mission.status === MissionStatus.Active && (
              <div className={cn('text-sm font-mono', getMissionTimeColor(mission))}>
                {calculateTimeRemaining(mission.expiryDate)}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="space-y-6 pb-8">
        <div className="bg-cyber-black border-2 border-cyber-purple-light rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-5 h-5 text-neon-pink" />
            <span className="text-lg font-medium text-neon-pink">Total Earnings</span>
          </div>
          <p className="text-3xl font-bold text-neon-cyan mb-2">{totalEarned} Project89</p>
          <p className="text-cyber-gray">From {completedMissions.length} completed missions</p>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 gap-2 bg-cyber-black border-2 border-cyber-purple-light p-1 px-2">
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-cyber-purple/50 data-[state=active]:text-matrix-green hover:text-matrix-green/80 hover:bg-cyber-purple/50 text-matrix-green/60"
            >
              Active ({displayedActiveMissions.length})
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-cyber-purple/50 data-[state=active]:text-neon-cyan hover:text-neon-cyan hover:bg-cyber-purple/50 text-neon-cyan/60"
            >
              Completed ({displayedCompletedMissions.length})
            </TabsTrigger>
            <TabsTrigger
              value="failed"
              className="data-[state=active]:bg-cyber-purple/50 data-[state=active]:text-neon-pink hover:text-neon-pink hover:bg-cyber-purple/50 text-neon-pink/60"
            >
              Failed ({failedMissions.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="active"
            className="bg-cyber-black/50 rounded-lg border border-cyber-purple-light mt-6 h-[400px] overflow-hidden"
          >
            <div className="p-6 h-full overflow-y-auto space-y-4 hover:pr-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-cyber-dark [&::-webkit-scrollbar-thumb]:bg-cyber-purple-light [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-cyber-purple/30">
              {displayedActiveMissions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Target className="w-12 h-12 text-cyber-purple-light mb-4 opacity-50" />
                  <p className="text-lg text-cyber-gray mb-2">No Active Missions</p>
                  <p className="text-sm text-cyber-gray/60">
                    Check the mission board for new opportunities
                  </p>
                </div>
              ) : (
                displayedActiveMissions.map((mission) => (
                  <MissionCard key={mission.id} mission={mission} />
                ))
              )}
            </div>
          </TabsContent>
          <TabsContent
            value="completed"
            className="bg-cyber-black/50 rounded-lg border border-cyber-purple/30 h-[400px] overflow-hidden"
          >
            <div className="p-6 h-full overflow-y-auto space-y-4 hover:pr-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-cyber-dark [&::-webkit-scrollbar-thumb]:bg-cyber-purple-light [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-cyber-purple/30">
              {displayedCompletedMissions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Trophy className="w-12 h-12 text-cyber-purple-light mb-4 opacity-50" />
                  <p className="text-lg text-cyber-gray mb-2">No Completed Missions</p>
                  <p className="text-sm text-cyber-gray/60">
                    Complete missions to build your reputation
                  </p>
                </div>
              ) : (
                displayedCompletedMissions.map((mission) => (
                  <MissionCard key={mission.id} mission={mission} />
                ))
              )}
            </div>
          </TabsContent>
          <TabsContent
            value="failed"
            className="bg-cyber-black/50 rounded-lg border border-cyber-purple/30 h-[400px] overflow-hidden"
          >
            <div className="p-6 h-full overflow-y-auto space-y-4 hover:pr-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-cyber-dark [&::-webkit-scrollbar-thumb]:bg-cyber-purple-light [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-cyber-purple/30">
              {failedMissions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <X className="w-12 h-12 text-neon-pink mb-4 opacity-50" />
                  <p className="text-lg text-cyber-gray mb-2">No Failed Missions</p>
                  <p className="text-sm text-cyber-gray/60">
                    Keep up the good work and maintain your success rate
                  </p>
                </div>
              ) : (
                failedMissions.map((mission) => <MissionCard key={mission.id} mission={mission} />)
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
