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
      return 'text-[hsl(var(--mission-participant-human-hsl))] border-[hsl(var(--mission-participant-human-hsl))]';
    case ParticipantType.Agent:
      return 'text-[hsl(var(--mission-participant-agent-hsl))] border-[hsl(var(--mission-participant-agent-hsl))]';
    default:
      return 'text-[hsl(var(--mission-participant-any-hsl))] border-[hsl(var(--mission-participant-any-hsl))]';
  }
};

const getScaleColor = (scale: MissionScale) => {
  switch (scale) {
    case MissionScale.Solo:
      return 'bg-[hsl(var(--mission-scale-solo-bg-hsl))] text-[hsl(var(--mission-scale-solo-text-hsl))]';
    case MissionScale.Party:
      return 'bg-[hsl(var(--mission-scale-party-bg-hsl))] text-[hsl(var(--mission-scale-party-text-hsl))]';
    case MissionScale.Swarm:
      return 'bg-[hsl(var(--mission-scale-swarm-bg-hsl))] text-[hsl(var(--mission-scale-swarm-text-hsl))]';
  }
};

const getStatusColor = (status: MissionStatus) => {
  switch (status) {
    case MissionStatus.Active:
      return 'bg-[hsl(var(--mission-status-active-bg-hsl))] text-[hsl(var(--mission-status-active-text-hsl))]';
    case MissionStatus.InProgress:
      return 'bg-[hsl(var(--mission-status-in-progress-bg-hsl))] text-[hsl(var(--mission-status-in-progress-text-hsl))]';
    case MissionStatus.PendingValidation:
      return 'bg-[hsl(var(--mission-status-pending-bg-hsl))] text-[hsl(var(--mission-status-pending-text-hsl))]';
    case MissionStatus.Completed:
      return 'bg-[hsl(var(--mission-status-completed-bg-hsl))] text-[hsl(var(--mission-status-completed-text-hsl))]';
    default:
      return 'bg-[hsl(var(--mission-status-failed-bg-hsl))] text-[hsl(var(--mission-status-failed-text-hsl))]';
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
      className="cyber-card group cursor-pointer overflow-hidden h-full flex flex-col pb-0 pl-0 pr-0"
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
        <h3 className="text-lg font-bold text-[hsl(var(--neon-pink-hsl))]">{mission.title}</h3>
      </CardHeader>

      <CardContent className="space-y-4 flex-1">
        <p className="text-sm text-[hsl(var(--cyber-gray-hsl))] line-clamp-2">
          {mission.description}
        </p>

        <div className="flex items-center space-x-2">
          <Badge className={`px-2 py-1 ${getScaleColor(scale)}`}>{scale}</Badge>
          {mission.baseRequirements.timeLimit && (
            <Badge
              variant="outline"
              className="px-2 py-1 text-[hsl(var(--neon-pink-hsl))] border-[hsl(var(--neon-pink-hsl))]"
            >
              {mission.baseRequirements.timeLimit}h
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="border-t border-[hsl(var(--cyber-purple-hsl)/0.3)] bg-[hsl(var(--cyber-dark-hsl))] mt-4 py-4">
        <div className="flex items-center gap-4 text-sm w-full justify-center">
          <div>
            <span className="text-[hsl(var(--cyber-gray-hsl))]">Reward: </span>
            <span className="text-[hsl(var(--neon-pink-hsl))] font-bold">1000 Project89</span>
          </div>
          <div>
            <span className="text-[hsl(var(--cyber-gray-hsl))]">XP: </span>
            <span className="text-[hsl(var(--neon-purple-hsl))] font-bold">+500</span>
          </div>
          {mission.baseRequirements.stakeAmount && (
            <div className="ml-auto">
              <span className="text-[hsl(var(--cyber-gray-hsl))]">Stake: </span>
              <span className="text-[hsl(var(--cyber-purple-light-hsl))]">
                {mission.baseRequirements.stakeAmount} Project89
              </span>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
