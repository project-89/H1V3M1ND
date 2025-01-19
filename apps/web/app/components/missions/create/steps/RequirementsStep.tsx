'use client';

import { Input } from '@/components/ui';
import { Label } from '@/components/ui/label';
import {
  Mission,
  MissionType,
  SingleParticipantMission,
  MultiParticipantMission,
} from '@/lib/types';

interface RequirementsStepProps {
  data: Partial<Mission>;
  onUpdate: (data: Partial<Mission>) => void;
}

export function RequirementsStep({ data, onUpdate }: RequirementsStepProps) {
  const handleBaseRequirementsChange = (field: 'timeLimit' | 'stakeAmount', value: string) => {
    const numValue = parseInt(value) || 0;
    onUpdate({
      ...data,
      baseRequirements: {
        ...data.baseRequirements,
        [field]: numValue,
      },
    });
  };

  const handleCapabilitiesChange = (value: string) => {
    const capabilities = value
      .split(',')
      .map((cap) => cap.trim())
      .filter(Boolean);

    if (data.type === MissionType.Single) {
      const updatedData: Partial<SingleParticipantMission> = {
        ...data,
        type: MissionType.Single,
        requirements: {
          ...data.requirements,
          capabilities,
        },
      };
      onUpdate(updatedData);
    } else {
      const updatedData: Partial<MultiParticipantMission> = {
        ...data,
        type: MissionType.Multi,
        requirements: {
          minParticipants:
            (data as Partial<MultiParticipantMission>).requirements?.minParticipants || 2,
          maxParticipants:
            (data as Partial<MultiParticipantMission>).requirements?.maxParticipants || 5,
          capabilities,
        },
      };
      onUpdate(updatedData);
    }
  };

  const handleMinimumRankChange = (value: string) => {
    if (data.type !== MissionType.Single) return;

    const updatedData: Partial<SingleParticipantMission> = {
      ...data,
      type: MissionType.Single,
      requirements: {
        ...data.requirements,
        minimumRank: parseInt(value) || 0,
      },
    };
    onUpdate(updatedData);
  };

  const handleParticipantsChange = (
    field: 'minParticipants' | 'maxParticipants',
    value: string
  ) => {
    if (data.type !== MissionType.Multi) return;

    const numValue = parseInt(value) || 2;
    const currentData = data as Partial<MultiParticipantMission>;
    const updatedData: Partial<MultiParticipantMission> = {
      ...data,
      type: MissionType.Multi,
      requirements: {
        ...currentData.requirements,
        [field]: numValue,
        minParticipants:
          field === 'minParticipants' ? numValue : currentData.requirements?.minParticipants || 2,
        maxParticipants:
          field === 'maxParticipants' ? numValue : currentData.requirements?.maxParticipants || 5,
      },
    };
    onUpdate(updatedData);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="timeLimit" className="text-cyber-purple-light">
            Time Limit (hours)
          </Label>
          <Input
            id="timeLimit"
            type="number"
            min={1}
            value={data.baseRequirements?.timeLimit || ''}
            onChange={(e) => handleBaseRequirementsChange('timeLimit', e.target.value)}
            placeholder="Enter time limit in hours"
            className="bg-cyber-dark border-cyber-purple"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stakeAmount" className="text-cyber-purple-light">
            Stake Amount (P89)
          </Label>
          <Input
            id="stakeAmount"
            type="number"
            min={0}
            value={data.baseRequirements?.stakeAmount || ''}
            onChange={(e) => handleBaseRequirementsChange('stakeAmount', e.target.value)}
            placeholder="Enter stake amount"
            className="bg-cyber-dark border-cyber-purple"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="capabilities" className="text-cyber-purple-light">
          Required Capabilities
        </Label>
        <Input
          id="capabilities"
          value={data.requirements?.capabilities?.join(', ') || ''}
          onChange={(e) => handleCapabilitiesChange(e.target.value)}
          placeholder="Enter capabilities (comma-separated)"
          className="bg-cyber-dark border-cyber-purple"
        />
        <p className="text-sm text-gray-400">
          Enter capabilities separated by commas (e.g., machine-learning, blockchain-analysis)
        </p>
      </div>

      {data.type === MissionType.Single && (
        <div className="space-y-2">
          <Label htmlFor="minimumRank" className="text-cyber-purple-light">
            Minimum Rank
          </Label>
          <Input
            id="minimumRank"
            type="number"
            min={0}
            value={(data as Partial<SingleParticipantMission>).requirements?.minimumRank || ''}
            onChange={(e) => handleMinimumRankChange(e.target.value)}
            placeholder="Enter minimum rank required"
            className="bg-cyber-dark border-cyber-purple"
          />
        </div>
      )}

      {data.type === MissionType.Multi && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="minParticipants" className="text-cyber-purple-light">
              Minimum Participants
            </Label>
            <Input
              id="minParticipants"
              type="number"
              min={2}
              value={(data as Partial<MultiParticipantMission>).requirements?.minParticipants || ''}
              onChange={(e) => handleParticipantsChange('minParticipants', e.target.value)}
              placeholder="Enter minimum participants"
              className="bg-cyber-dark border-cyber-purple"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxParticipants" className="text-cyber-purple-light">
              Maximum Participants
            </Label>
            <Input
              id="maxParticipants"
              type="number"
              min={2}
              value={(data as Partial<MultiParticipantMission>).requirements?.maxParticipants || ''}
              onChange={(e) => handleParticipantsChange('maxParticipants', e.target.value)}
              placeholder="Enter maximum participants"
              className="bg-cyber-dark border-cyber-purple"
            />
          </div>
        </div>
      )}
    </div>
  );
}
