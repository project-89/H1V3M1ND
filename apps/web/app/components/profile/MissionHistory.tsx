'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger, Badge } from '@H1V3M1ND/ui';
import { Button } from '@H1V3M1ND/ui';
import { Clock, Award, Coins, Star, Users, Calendar, Target, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

import { MissionStatus, ExtendedMission } from '@/lib/types/missions';

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
        return 'border-neon-cyan text-neon-cyan';
      case MissionStatus.InProgress:
        return 'border-cyber-yellow text-cyber-yellow';
      case MissionStatus.Completed:
        return 'border-matrix-green text-matrix-green';
      case MissionStatus.Failed:
        return 'border-destructive text-destructive';
      default:
        return 'border-cyber-gray text-cyber-gray';
    }
  };

  const MissionCard = ({ mission }: { mission: ExtendedMission }) => (
    <div className="bg-cyber-dark/80 border border-cyber-purple/30 rounded-lg p-6 hover:border-cyber-purple-light transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-neon-cyan">{mission.title}</h3>
        <Badge variant="outline" className={cn('text-sm', getStatusColor(mission.status))}>
          {mission.status}
        </Badge>
      </div>

      <p className="text-cyber-gray mb-6">{mission.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <p className="text-base font-medium text-cyber-gray mb-3">Duration</p>
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-neon-cyan" />
            <span className="text-xl font-bold text-neon-cyan">{mission.duration} hours</span>
          </div>
        </div>

        <div>
          <p className="text-base font-medium text-cyber-gray mb-3">Reward</p>
          <div className="flex items-center gap-3">
            <Coins className="w-6 h-6 text-neon-pink" />
            <span className="text-xl font-bold text-neon-pink">{mission.reward} Project89</span>
          </div>
        </div>

        <div>
          <p className="text-base font-medium text-cyber-gray mb-3">XP Gained</p>
          <div className="flex items-center gap-3">
            <Star className="w-6 h-6 text-matrix-green" />
            <span className="text-xl font-bold text-matrix-green">+{mission.xpGained}</span>
          </div>
        </div>

        <div>
          <p className="text-base font-medium text-cyber-gray mb-3">Team Size</p>
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-neon-purple" />
            <span className="text-xl font-bold text-neon-purple">{mission.teamSize} members</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-cyber-purple/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyber-gray" />
            <span className="text-sm text-cyber-gray">
              Completed on {formatDate(mission.completedAt)}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-neon-cyan hover:text-neon-cyan/80 hover:bg-neon-cyan/10"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );

  return (
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
            Active ({activeMissions.length})
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
          className="space-y-6 min-h-[200px] bg-cyber-black/50 rounded-lg p-6 border border-cyber-purple-light mt-6"
        >
          {activeMissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[200px] text-center">
              <Target className="w-12 h-12 text-cyber-purple-light mb-4 opacity-50" />
              <p className="text-lg text-cyber-gray mb-2">No Active Missions</p>
              <p className="text-sm text-cyber-gray/60">
                Check the mission board for new opportunities
              </p>
            </div>
          ) : (
            activeMissions.map((mission) => <MissionCard key={mission.id} mission={mission} />)
          )}
        </TabsContent>
        <TabsContent
          value="completed"
          className="space-y-6 min-h-[200px] bg-cyber-black/50 rounded-lg p-6 border border-cyber-purple/30"
        >
          {completedMissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[200px] text-center">
              <Trophy className="w-12 h-12 text-cyber-purple-light mb-4 opacity-50" />
              <p className="text-lg text-cyber-gray mb-2">No Completed Missions</p>
              <p className="text-sm text-cyber-gray/60">
                Complete missions to build your reputation
              </p>
            </div>
          ) : (
            completedMissions.map((mission) => <MissionCard key={mission.id} mission={mission} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
