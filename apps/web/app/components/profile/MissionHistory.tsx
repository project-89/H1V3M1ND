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

import { MissionStatus, ExtendedMission } from '@/lib/types/missions';
import { Mission, Objective } from '@/lib/types';
import { MissionHistoryDialog } from './MissionHistoryDialog';

interface MissionHistoryProps {
  activeMissions: ExtendedMission[];
  completedMissions: ExtendedMission[];
  totalEarned: number;
}

export function MissionHistory({
  activeMissions,
  completedMissions,
  totalEarned,
}: MissionHistoryProps) {
  const [selectedMission, setSelectedMission] = useState<ExtendedMission | null>(null);
  // Track expired missions for UI updates only
  const [expiredMissions, setExpiredMissions] = useState<Set<string>>(new Set());

  // Filter out expired missions from display
  const displayedActiveMissions = activeMissions.filter(
    (mission) => !expiredMissions.has(mission.id)
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
      case MissionStatus.Completed:
        return 'bg-neon-cyan';
      case MissionStatus.Failed:
        return 'bg-destructive';
      default:
        return 'bg-cyber-gray';
    }
  };

  // Separate component for the timer to prevent parent rerendering
  const MissionTimer = memo(({ mission }: { mission: ExtendedMission }) => {
    const [timeLeft, setTimeLeft] = useState<string>('');
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
      const calculateTime = () => {
        const now = Date.now();
        const remaining = mission.expiryDate - now;
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

      // Initial calculation
      const initialTime = calculateTime();
      setTimeLeft(initialTime);
      if (initialTime === 'Expired') {
        setIsExpired(true);
        setExpiredMissions((prev) => new Set([...prev, mission.id]));
        return;
      }

      // Update every second
      const timer = setInterval(() => {
        const newTime = calculateTime();
        setTimeLeft(newTime);
        if (newTime === 'Expired') {
          setIsExpired(true);
          setExpiredMissions((prev) => new Set([...prev, mission.id]));
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }, [mission.expiryDate, mission.id]);

    const getTimeRemainingColor = () => {
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

    if (isExpired) return null;

    return (
      <div
        className={cn(
          'flex items-center gap-1.5 transition-colors duration-300',
          getTimeRemainingColor()
        )}
      >
        <Clock className="w-4 h-4" />
        <span>{timeLeft}</span>
      </div>
    );
  });
  MissionTimer.displayName = 'MissionTimer';

  const MissionCard = ({ mission }: { mission: ExtendedMission }) => (
    <div
      className="relative bg-cyber-dark/80 border border-cyber-purple-light/70 rounded-lg p-4 cursor-pointer group"
      onClick={() => setSelectedMission(mission)}
    >
      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-lg border border-cyber-purple-light opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-1 self-stretch ${getStatusColor(mission.status)}`} />
          <div className="flex items-center gap-4 min-w-0">
            <h3 className="text-lg font-medium text-neon-cyan truncate">{mission.title}</h3>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1.5 text-cyber-yellow">
                <Users className="w-4 h-4" />
                {mission.teamSize > 1 ? (
                  <span>{mission.teamSize}</span>
                ) : (
                  <span className="text-cyber-yellow">Solo</span>
                )}
              </div>
              <div
                className={cn(
                  'flex items-center gap-1.5 transition-all duration-200',
                  mission.status === MissionStatus.Completed
                    ? 'text-neon-cyan drop-shadow-[0_0_3px_rgba(0,255,255,0.5)]'
                    : 'text-neon-cyan/60'
                )}
              >
                <Coins className="w-4 h-4" />
                <span>{mission.reward}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center text-sm shrink-0">
          {mission.status === MissionStatus.Active && <MissionTimer mission={mission} />}
        </div>
      </div>
      <div className="pl-4">
        <p className="text-sm text-cyber-gray line-clamp-2">{mission.description}</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="space-y-6 pb-8">
        <div className="bg-cyber-black border-2 border-cyber-purple-light rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <Award className="w-5 h-5 text-neon-pink" />
            <span className="text-lg font-medium text-neon-pink">Total Earnings</span>
          </div>
          <p className="text-3xl font-bold text-neon-cyan mb-2">{totalEarned} Project89</p>
          <p className="text-cyber-gray">From {completedMissions.length} completed missions</p>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-cyber-black border-2 border-cyber-purple-light p-1 mb-2">
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-cyber-purple/50 data-[state=active]:text-neon-cyan hover:text-neon-cyan/80 text-neon-cyan/60"
            >
              Active ({displayedActiveMissions.length})
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-cyber-purple/50 data-[state=active]:text-neon-cyan hover:text-neon-cyan/80 text-neon-cyan/60"
            >
              Completed ({completedMissions.length})
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
              {completedMissions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Trophy className="w-12 h-12 text-cyber-purple-light mb-4 opacity-50" />
                  <p className="text-lg text-cyber-gray mb-2">No Completed Missions</p>
                  <p className="text-sm text-cyber-gray/60">
                    Complete missions to build your reputation
                  </p>
                </div>
              ) : (
                completedMissions.map((mission) => (
                  <MissionCard key={mission.id} mission={mission} />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {selectedMission && (
        <MissionHistoryDialog
          mission={selectedMission}
          isOpen={true}
          onClose={() => setSelectedMission(null)}
        />
      )}
    </>
  );
}
