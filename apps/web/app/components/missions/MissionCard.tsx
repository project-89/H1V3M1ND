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
    case ParticipantType.Any:
      return 'text-neon-cyan border-neon-cyan';
    default:
      return '';
  }
};

const getScaleColor = (scale: MissionScale) => {
  switch (scale) {
    case MissionScale.Solo:
      return 'bg-cyber-dark text-cyber-purple-light';
    case MissionScale.Party:
      return 'bg-cyber-dark text-neon-purple';
    case MissionScale.Swarm:
      return 'bg-cyber-dark text-neon-pink';
    default:
      return '';
  }
};

const getStatusColor = (status: MissionStatus) => {
  switch (status) {
    case MissionStatus.Active:
      return 'bg-cyber-dark text-neon-cyan';
    case MissionStatus.InProgress:
      return 'bg-cyber-dark text-neon-purple';
    case MissionStatus.PendingValidation:
      return 'bg-cyber-dark text-cyber-yellow';
    case MissionStatus.Completed:
      return 'bg-cyber-dark text-matrix-green';
    case MissionStatus.Failed:
      return 'bg-cyber-dark text-neon-pink';
    default:
      return '';
  }
};

const getTimeColor = (hours: number) => {
  if (hours <= 24) return 'text-neon-pink border-neon-pink'; // Urgent/Short
  if (hours < 72) return 'text-cyber-yellow border-cyber-yellow'; // Medium
  return 'text-neon-purple border-neon-purple'; // Long
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
      className="cyber-card group cursor-pointer overflow-hidden h-full flex flex-col pb-0 pl-0 pr-0 hover:border-card-hover-border"
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
        <h3 className="text-lg font-bold text-neon-pink">{mission.title}</h3>
      </CardHeader>

      <CardContent className="space-y-4 flex-1">
        <p className="text-sm text-cyber-gray line-clamp-2">{mission.description}</p>

        <div className="flex items-center space-x-2">
          <Badge className={`px-2 py-1 ${getScaleColor(scale)}`}>{scale}</Badge>
          {mission.baseRequirements.timeLimit && (
            <Badge
              variant="outline"
              className={`px-2 py-1 ${getTimeColor(mission.baseRequirements.timeLimit)}`}
            >
              {mission.baseRequirements.timeLimit}h
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="border-t border-cyber-purple/30 bg-cyber-dark mt-4 py-4">
        <div className="grid grid-cols-3 gap-4 text-sm w-full">
          <div className="flex flex-col items-center text-center">
            <span className="text-cyber-gray mb-1">Reward</span>
            <span className="text-neon-pink font-bold">1000 Project89</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-cyber-gray mb-1">XP</span>
            <span className="text-neon-purple font-bold">+500</span>
          </div>
          {mission.baseRequirements.stakeAmount && (
            <div className="flex flex-col items-center text-center">
              <span className="text-cyber-gray mb-1">Stake</span>
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
