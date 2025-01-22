'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger, Badge } from '@H1V3M1ND/ui';
import { Button } from '@H1V3M1ND/ui';
import { Clock, Award, Coins, Star, Users, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

import { MissionStatus, SingleParticipantMission, MultiParticipantMission } from '@/lib/types';

type BaseMission = SingleParticipantMission | MultiParticipantMission;

interface MissionHistoryDetails {
  duration: number;
  reward: number;
  xpGained: number;
  teamSize: number;
  completedAt: number;
}

type ExtendedMission = BaseMission & MissionHistoryDetails;

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

  const MissionCard = ({ mission }: { mission: ExtendedMission }) => (
    <div className="bg-cyber-dark border border-cyber-purple/30 rounded-lg p-4 hover:border-cyber-purple transition-colors">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-cyber-white">{mission.title}</h3>
        <Badge variant="outline" className={cn('text-sm', getStatusColor(mission.status))}>
          {mission.status}
        </Badge>
      </div>

      <p className="text-cyber-gray mb-4">{mission.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-cyber-gray mb-1">Duration</p>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-cyber-purple" />
            <span className="text-cyber-white">{mission.duration} hours</span>
          </div>
        </div>

        <div>
          <p className="text-sm text-cyber-gray mb-1">Reward</p>
          <div className="flex items-center gap-1">
            <Coins className="w-4 h-4 text-neon-pink" />
            <span className="text-cyber-white">{mission.reward} Project89</span>
          </div>
        </div>

        <div>
          <p className="text-sm text-cyber-gray mb-1">XP Gained</p>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-neon-purple" />
            <span className="text-cyber-white">+{mission.xpGained}</span>
          </div>
        </div>

        <div>
          <p className="text-sm text-cyber-gray mb-1">Team Size</p>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-neon-cyan" />
            <span className="text-cyber-white">{mission.teamSize} members</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-cyber-purple/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyber-gray" />
            <span className="text-sm text-cyber-gray">
              Completed on {new Date(mission.completedAt).toLocaleDateString()}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-cyber-purple hover:text-cyber-purple-light hover:bg-cyber-purple/10"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-black/20 rounded-lg p-4 border border-cyber-purple/50">
        <div className="flex items-center space-x-2 mb-2">
          <Award className="w-4 h-4 text-cyber-purple-light" />
          <span className="text-gray-400">Total Earnings</span>
        </div>
        <p className="text-2xl font-bold text-white">{totalEarned} Project89</p>
        <p className="text-sm text-gray-400">From {completedMissions.length} completed missions</p>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active ({activeMissions.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedMissions.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4 mt-4">
          {activeMissions.length === 0 ? (
            <div className="text-center py-8 text-gray-400">No active missions</div>
          ) : (
            activeMissions.map((mission) => <MissionCard key={mission.id} mission={mission} />)
          )}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4 mt-4">
          {completedMissions.length === 0 ? (
            <div className="text-center py-8 text-gray-400">No completed missions yet</div>
          ) : (
            completedMissions.map((mission) => <MissionCard key={mission.id} mission={mission} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
