'use client';

import { Badge, Card, CardContent, CardFooter, CardHeader } from '@H1V3M1ND/ui';
import { ParticipantType, MissionScale, MissionStatus, Mission, MissionType } from '@/lib/types';

export interface MissionCardProps {
  mission: Mission;
  onClick?: () => void;
}

const getParticipantTypeColor = (type: ParticipantType) => {
  switch (type) {
    case ParticipantType.Human:
      return 'text-neon-pink border-neon-pink';
    case ParticipantType.Agent:
      return 'text-neon-purple border-neon-purple';
    default:
      return 'text-neon-blue border-neon-blue';
  }
};

const getScaleColor = (scale: MissionScale) => {
  switch (scale) {
    case MissionScale.Solo:
      return 'bg-cyber-purple/20 text-cyber-purple-light';
    case MissionScale.Party:
      return 'bg-neon-purple/20 text-neon-purple';
    case MissionScale.Swarm:
      return 'bg-neon-pink/20 text-neon-pink';
  }
};

const getStatusColor = (status: MissionStatus) => {
  switch (status) {
    case MissionStatus.Active:
      return 'bg-green-500/20 text-green-400';
    case MissionStatus.InProgress:
      return 'bg-blue-500/20 text-blue-400';
    case MissionStatus.PendingValidation:
      return 'bg-yellow-500/20 text-yellow-400';
    case MissionStatus.Completed:
      return 'bg-purple-500/20 text-purple-400';
    default:
      return 'bg-red-500/20 text-red-400';
  }
};

const getMissionScale = (mission: Mission): MissionScale => {
  if (mission.type === MissionType.Single) return MissionScale.Solo;
  const maxParticipants = mission.requirements.maxParticipants;
  return maxParticipants <= 5 ? MissionScale.Party : MissionScale.Swarm;
};

const getParticipantType = (mission: Mission): ParticipantType => {
  if (mission.type === MissionType.Single) return mission.participantType;
  return ParticipantType.Any;
};

export function MissionCard({ mission, onClick }: MissionCardProps) {
  const scale = getMissionScale(mission);
  const participantType = getParticipantType(mission);

  return (
    <Card
      className="cyber-card group cursor-pointer overflow-hidden h-full flex flex-col"
      onClick={onClick}
    >
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className={`px-2 py-1 ${getParticipantTypeColor(participantType)}`}
          >
            {participantType}
          </Badge>
          <Badge className={`px-2 py-1 ${getStatusColor(mission.status)}`}>{mission.status}</Badge>
        </div>
        <h3 className="text-lg font-bold text-glow-pink group-hover:animate-glitch">
          {mission.title}
        </h3>
      </CardHeader>

      <CardContent className="space-y-4 flex-1">
        <p className="text-sm text-gray-400 line-clamp-2">{mission.description}</p>

        <div className="flex items-center space-x-2">
          <Badge className={`px-2 py-1 ${getScaleColor(scale)}`}>{scale}</Badge>
          {mission.baseRequirements.timeLimit && (
            <Badge variant="outline" className="px-2 py-1 border-cyber-purple-light">
              {mission.baseRequirements.timeLimit}h
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="border-t  border-cyber-purple bg-cyber-dark/50">
        <div className="flex w-full items-center justify-between pt-4">
          <div className="flex items-center space-x-4 ">
            <div className="text-sm">
              <span className="text-gray-400">Reward: </span>
              <span className="text-neon-pink font-bold">1000 Project89</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-400">XP: </span>
              <span className="text-neon-purple font-bold">+500</span>
            </div>
          </div>
          {mission.baseRequirements.stakeAmount && (
            <div className="text-sm">
              <span className="text-gray-400">Stake: </span>
              <span className="text-cyber-purple-light">
                {mission.baseRequirements.stakeAmount} Project89
              </span>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
