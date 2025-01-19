'use client';

import { useState } from 'react';
import { Loader2, Users, Clock, Coins, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Badge,
} from '@/components/ui';
import { Mission, MissionType, ParticipantType } from '@/lib/types';

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
            <div className="space-y-2">
              {mission.failureConditions?.map((condition: string, index: number) => (
                <div key={index} className="flex items-center gap-2 text-gray-300">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <span>{condition}</span>
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
