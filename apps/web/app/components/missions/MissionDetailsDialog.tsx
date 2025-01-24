'use client';

import { useState } from 'react';
import {
  Loader2,
  Users,
  Clock,
  Coins,
  AlertTriangle,
  AlertCircle,
  AlertOctagon,
  Check,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Badge,
} from '@H1V3M1ND/ui';
import {
  Mission,
  MissionType,
  FailureCondition,
  FailureConditionType,
  FailureConditionCategory as Category,
  MissionStatus,
} from '@/lib/types';
import { cn } from '@/lib/utils';

export interface MissionDetailsDialogProps {
  mission: Mission;
  isOpen: boolean;
  onClose: () => void;
}

const getRequirementsList = (mission: Mission) => {
  const requirements: string[] = [];

  if (mission.type === MissionType.Single) {
    requirements.push(`Participant Type: ${mission.participantType}`);
  } else {
    requirements.push(`Min Participants: ${mission.requirements.minParticipants}`);
    requirements.push(`Max Participants: ${mission.requirements.maxParticipants}`);
  }

  if (mission.baseRequirements.timeLimit) {
    requirements.push(`Time Limit: ${mission.baseRequirements.timeLimit} hours`);
  }

  if (mission.baseRequirements.stakeAmount) {
    requirements.push(`Stake Required: ${mission.baseRequirements.stakeAmount} Project89`);
  }

  if (mission.requirements.objectives?.length) {
    requirements.push('Mission Tasks:');
    mission.requirements.objectives.forEach((obj) => requirements.push(`- ${obj.task}`));
  }

  return requirements;
};

const getImpactIcon = (type: FailureConditionType) => {
  switch (type) {
    case FailureConditionType.Critical:
      return <AlertOctagon className="h-4 w-4 text-red-500" />;
    case FailureConditionType.Standard:
      return <AlertCircle className="h-4 w-4 text-cyber-yellow" />;
    case FailureConditionType.Warning:
      return <AlertTriangle className="h-4 w-4 text-cyber-orange" />;
  }
};

const getCategoryColor = (category: Category) => {
  switch (category) {
    case Category.Performance:
      return 'border-neon-cyan text-neon-cyan';
    case Category.Security:
      return 'border-neon-pink text-neon-pink';
    case Category.Compliance:
      return 'border-cyber-purple-light text-cyber-purple-light';
    case Category.Technical:
      return 'border-cyber-yellow text-cyber-yellow';
    case Category.Communication:
      return 'border-matrix-green text-matrix-green';
  }
};

const getMissionStatusStyle = (status: MissionStatus) => {
  switch (status) {
    case MissionStatus.Available:
      return { color: 'border-matrix-green text-matrix-green', label: 'Available' };
    case MissionStatus.PendingStake:
      return { color: 'border-cyber-orange text-cyber-orange', label: 'Awaiting Stake' };
    case MissionStatus.Active:
      return { color: 'border-cyber-yellow text-cyber-yellow', label: 'Active' };
    case MissionStatus.InProgress:
      return { color: 'border-cyber-yellow/70 text-cyber-yellow/70', label: 'In Progress' };
    case MissionStatus.PendingValidation:
      return { color: 'border-cyber-purple text-cyber-purple', label: 'Pending Validation' };
    case MissionStatus.InValidation:
      return { color: 'border-cyber-purple-light text-cyber-purple-light', label: 'Under Review' };
    case MissionStatus.Completed:
      return { color: 'border-neon-cyan text-neon-cyan', label: 'Completed' };
    case MissionStatus.Failed:
      return { color: 'border-red-500 text-red-500', label: 'Failed' };
    case MissionStatus.Expired:
      return { color: 'border-red-500/70 text-red-500/70', label: 'Expired' };
    default:
      return { color: 'border-gray-500 text-gray-500', label: status };
  }
};

export function MissionDetailsDialog({ mission, isOpen, onClose }: MissionDetailsDialogProps) {
  const [isAccepting, setIsAccepting] = useState(false);
  const statusStyle = getMissionStatusStyle(mission.status);

  const handleAcceptMission = async () => {
    setIsAccepting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onClose();
    } catch (error) {
      console.error('Failed to accept mission:', error);
    } finally {
      setIsAccepting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-cyber-dark border-2 border-cyber-purple-light h-[80vh] sm:max-w-[800px] w-[90vw] z-50 flex flex-col px-0">
        <DialogHeader className="space-y-6 relative px-10">
          <div className="flex flex-wrap items-center gap-4">
            <Badge variant="outline" className="border-cyber-yellow text-cyber-yellow font-medium">
              {mission.type === MissionType.Single ? 'Single Agent' : 'Multi Agent'}
            </Badge>
            {mission.baseRequirements.timeLimit && (
              <Badge variant="outline" className="border-neon-pink text-neon-pink font-medium">
                <Clock className="h-4 w-4 mr-1 inline-block" />
                {mission.baseRequirements.timeLimit}h
              </Badge>
            )}
            {mission.baseRequirements.stakeAmount && (
              <Badge variant="outline" className="border-neon-cyan text-neon-cyan font-medium">
                <Coins className="h-4 w-4 mr-1 inline-block" />
                {mission.baseRequirements.stakeAmount} Project89
              </Badge>
            )}
            <div className="flex items-center gap-2">
              <Badge className={`px-2 py-1 ${statusStyle.color} bg-cyber-dark`}>
                {statusStyle.label}
              </Badge>
            </div>
          </div>
          <DialogTitle className="text-3xl font-bold text-neon-pink tracking-tight">
            {mission.title}
          </DialogTitle>
          <p className="text-base text-white leading-relaxed font-medium">{mission.description}</p>
        </DialogHeader>

        <div className="space-y-6 py-6 px-10 flex-1">
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-neon-pink tracking-wide">Mission Objectives</h4>
            <div className="grid gap-3 bg-cyber-black rounded-lg p-6 border-2 border-cyber-purple-light h-[200px] overflow-y-auto hover:pr-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-cyber-dark [&::-webkit-scrollbar-thumb]:bg-cyber-purple-light [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-cyber-purple/30">
              {mission.requirements.objectives?.map((objective, index) => (
                <div key={index} className="flex gap-3 mb-4">
                  <div
                    className={cn(
                      'w-5 h-5 border rounded flex items-center justify-center mt-1',
                      objective.completed
                        ? 'bg-neon-cyan border-neon-cyan'
                        : 'border-neon-cyan hover:bg-neon-cyan/10'
                    )}
                  >
                    {objective.completed && <Check className="w-4 h-4 text-black" />}
                  </div>
                  <div>
                    <p className="font-medium text-base text-neon-cyan mb-1">{objective.task}</p>
                    <p className="text-cyber-gray text-sm">{objective.details}</p>
                    {objective.completed && objective.verifiedAt && (
                      <p className="text-xs text-cyber-gray mt-1">
                        Verified {new Date(objective.verifiedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold text-neon-pink tracking-wide">Failure Conditions</h4>
            <div className="space-y-3 bg-cyber-black rounded-lg p-6 border-2 border-cyber-purple-light h-[200px] overflow-y-auto hover:pr-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-cyber-dark [&::-webkit-scrollbar-thumb]:bg-cyber-purple-light [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-cyber-purple/30">
              {mission.failureConditions.map((condition: FailureCondition) => (
                <div
                  key={condition.id}
                  className="flex items-start gap-3 bg-cyber-dark/50 rounded-md p-3"
                >
                  <Badge
                    variant="outline"
                    className={
                      condition.type === FailureConditionType.Critical
                        ? 'border-red-500 text-red-500 whitespace-nowrap'
                        : 'border-cyber-yellow text-cyber-yellow whitespace-nowrap'
                    }
                  >
                    {condition.type === FailureConditionType.Critical
                      ? 'Mission Failure'
                      : condition.type === FailureConditionType.Standard
                        ? '-50 XP'
                        : '-25 XP & Reputation'}
                  </Badge>
                  <p className="leading-relaxed font-medium text-base flex-1 text-cyber-gray">
                    {condition.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-cyber-purple-light pt-4 flex gap-2 mt-auto px-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-cyber-purple-light hover:bg-cyber-purple-light/20 text-neon-pink hover:text-neon-pink"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAcceptMission}
            disabled={isAccepting}
            className=" border-matrix-green hover:bg-matrix-green/60 hover:border-matrix-green text-matrix-green hover:text-white font-bold"
          >
            {isAccepting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Accepting...
              </>
            ) : (
              'Accept Mission'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
