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
  FailureConditionSeverity as Severity,
  FailureConditionCategory as Category,
} from '@/lib/types';

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
    requirements.push(`Stake Required: ${mission.baseRequirements.stakeAmount} P89`);
  }

  if (mission.requirements.capabilities?.length) {
    requirements.push('Required Capabilities:');
    mission.requirements.capabilities.forEach((cap) => requirements.push(`- ${cap}`));
  }

  return requirements;
};

const getSeverityIcon = (severity: Severity) => {
  switch (severity) {
    case Severity.High:
      return <AlertOctagon className="h-4 w-4 text-red-400" />;
    case Severity.Medium:
      return <AlertCircle className="h-4 w-4 text-yellow-400" />;
    case Severity.Low:
      return <AlertTriangle className="h-4 w-4 text-blue-400" />;
  }
};

const getCategoryColor = (category: Category) => {
  switch (category) {
    case Category.Performance:
      return 'bg-blue-500/20 text-blue-400';
    case Category.Security:
      return 'bg-red-500/20 text-red-400';
    case Category.Compliance:
      return 'bg-purple-500/20 text-purple-400';
    case Category.Technical:
      return 'bg-yellow-500/20 text-yellow-400';
    case Category.Communication:
      return 'bg-green-500/20 text-green-400';
  }
};

export function MissionDetailsDialog({ mission, isOpen, onClose }: MissionDetailsDialogProps) {
  const [isAccepting, setIsAccepting] = useState(false);

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
      <DialogContent className="cyber-card sm:max-w-[600px]">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/10 to-neon-pink/10 pointer-events-none" />

        <DialogHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="border-cyber-purple text-cyber-purple-light">
              {mission.type === MissionType.Single ? 'Single Agent' : 'Multi Agent'}
            </Badge>
            <Badge className="bg-cyber-purple/20 text-cyber-purple-light">{mission.status}</Badge>
          </div>
          <DialogTitle className="text-2xl font-bold text-glow-pink">{mission.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <p className="text-gray-300">{mission.description}</p>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-cyber-purple-light">Requirements</h4>
            <div className="grid gap-3">
              {getRequirementsList(mission).map((req: string, index: number) => (
                <div key={index} className="flex items-center gap-2 text-gray-300">
                  {req.startsWith('-') ? (
                    <span className="ml-6">{req.substring(2)}</span>
                  ) : (
                    <>
                      {req.includes('Participant') && (
                        <Users className="h-4 w-4 text-neon-purple" />
                      )}
                      {req.includes('Time') && <Clock className="h-4 w-4 text-neon-pink" />}
                      {req.includes('Stake') && (
                        <Coins className="h-4 w-4 text-cyber-purple-light" />
                      )}
                      <span>{req}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-cyber-purple-light">Failure Conditions</h4>
            <div className="space-y-3">
              {mission.failureConditions.map((condition: FailureCondition) => (
                <div key={condition.id} className="flex items-start gap-3 text-gray-300">
                  {getSeverityIcon(condition.severity)}
                  <div className="flex-1 space-y-1">
                    <p>{condition.description}</p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs border-red-400/50">
                        {condition.severity.toLowerCase()}
                      </Badge>
                      <Badge className={`text-xs ${getCategoryColor(condition.category)}`}>
                        {condition.category.toLowerCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-cyber-purple pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAcceptMission} disabled={isAccepting}>
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
