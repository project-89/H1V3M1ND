'use client';

import { Badge, Card, CardContent, CardFooter, CardHeader } from '@H1V3M1ND/ui';
import {
  ParticipantType,
  MissionScale,
  MissionStatus,
  Mission,
  MissionType,
} from '@H1V3M1ND/types';

export interface MissionCardProps {
  mission: Mission;
  onClick?: () => void;
  className?: string;
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
  const statusStyle = getMissionStatusStyle(status);
  return statusStyle.className || '';
};

const getMissionStatusStyle = (status: MissionStatus) => {
  switch (status) {
    case MissionStatus.Available:
      return {
        variant: 'outline' as const,
        className: 'border-matrix-green text-matrix-green',
        label: 'Available',
      };
    case MissionStatus.PendingStake:
      return {
        variant: 'outline' as const,
        className: 'border-cyber-orange text-cyber-orange',
        label: 'Awaiting Stake',
      };
    case MissionStatus.Active:
      return {
        variant: 'outline' as const,
        className: 'border-cyber-yellow text-cyber-yellow',
        label: 'Active',
      };
    case MissionStatus.InProgress:
      return {
        variant: 'outline' as const,
        className: 'border-cyber-yellow/70 text-cyber-yellow/70',
        label: 'In Progress',
      };
    case MissionStatus.PendingValidation:
      return {
        variant: 'outline' as const,
        className: 'border-cyber-purple text-cyber-purple',
        label: 'Pending Validation',
      };
    case MissionStatus.InValidation:
      return {
        variant: 'outline' as const,
        className: 'border-cyber-purple-light text-cyber-purple-light',
        label: 'Under Review',
      };
    case MissionStatus.Completed:
      return {
        variant: 'outline' as const,
        className: 'border-neon-cyan text-neon-cyan',
        label: 'Completed',
      };
    case MissionStatus.Failed:
      return { variant: 'destructive' as const, label: 'Failed' };
    case MissionStatus.Expired:
      return { variant: 'destructive' as const, className: 'opacity-70', label: 'Expired' };
    default:
      return {
        variant: 'outline' as const,
        className: 'border-cyber-gray text-cyber-gray',
        label: status,
      };
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

export function MissionCard({ mission, onClick, className }: MissionCardProps) {
  const scale = getMissionScale(mission);
  const participantType = getParticipantType(mission);
  const statusStyle = getMissionStatusStyle(mission.status);

  return (
    <Card
      className={`cyber-card transform transition-transform cursor-pointer ${className}`}
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
          <Badge
            variant={statusStyle.variant}
            className={`px-2 py-1 ${statusStyle.className || ''}`}
          >
            {statusStyle.label}
          </Badge>
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
