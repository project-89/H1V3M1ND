'use client';

import { useState } from 'react';
import { Input, Label, Badge, Button } from '@H1V3M1ND/ui';
import { X, Plus } from 'lucide-react';
import {
  Mission,
  MissionType,
  SingleParticipantMission,
  MultiParticipantMission,
  ROLE,
  TeamComposition,
} from '@/lib/types';

interface RequirementsStepProps {
  data: Partial<Mission>;
  onUpdate: (data: Partial<Mission>) => void;
}

interface ValidationErrors {
  timeLimit?: string;
  stakeAmount?: string;
  capabilities?: string;
  minimumRank?: string;
  minParticipants?: string;
  maxParticipants?: string;
}

export function RequirementsStep({ data, onUpdate }: RequirementsStepProps) {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [newCapability, setNewCapability] = useState('');

  const validateField = (field: keyof ValidationErrors, value: any): string | undefined => {
    switch (field) {
      case 'timeLimit':
        return !value || value < 1 ? 'Time limit must be at least 1 hour' : undefined;
      case 'stakeAmount':
        return value < 0 ? 'Stake amount cannot be negative' : undefined;
      case 'capabilities':
        return !value || value.length === 0 ? 'At least one capability is required' : undefined;
      case 'minimumRank':
        return value < 0 ? 'Minimum rank cannot be negative' : undefined;
      case 'minParticipants':
        return value < 2 ? 'Minimum participants must be at least 2' : undefined;
      case 'maxParticipants':
        const minParticipants = (data as Partial<MultiParticipantMission>)?.requirements
          ?.minParticipants;
        return value < 2 || (minParticipants && value < minParticipants)
          ? 'Maximum participants must be at least 2 and greater than minimum participants'
          : undefined;
      default:
        return undefined;
    }
  };

  const handleBaseRequirementsChange = (field: 'timeLimit' | 'stakeAmount', value: string) => {
    const numValue = parseInt(value) || 0;
    const error = validateField(field, numValue);
    setErrors((prev) => ({ ...prev, [field]: error }));

    const currentRequirements = data.baseRequirements || { timeLimit: 0, stakeAmount: 0 };
    onUpdate({
      ...data,
      baseRequirements: {
        ...currentRequirements,
        [field]: numValue,
      },
    });
  };

  const addCapability = () => {
    if (!newCapability.trim()) return;

    const currentCapabilities = data.requirements?.capabilities || [];
    const updatedCapabilities = [...currentCapabilities, newCapability.trim()];

    if (data.type === MissionType.Single) {
      const updatedData: Partial<SingleParticipantMission> = {
        ...data,
        type: MissionType.Single,
        requirements: {
          ...(data as Partial<SingleParticipantMission>).requirements,
          capabilities: updatedCapabilities,
          minimumRank:
            (data as Partial<SingleParticipantMission>).requirements?.minimumRank || ROLE.USER,
        },
      };
      onUpdate(updatedData);
    } else {
      const updatedData: Partial<MultiParticipantMission> = {
        ...data,
        type: MissionType.Multi,
        requirements: {
          ...(data as Partial<MultiParticipantMission>).requirements,
          capabilities: updatedCapabilities,
          minParticipants:
            (data as Partial<MultiParticipantMission>).requirements?.minParticipants || 2,
          maxParticipants:
            (data as Partial<MultiParticipantMission>).requirements?.maxParticipants || 5,
          composition: (data as Partial<MultiParticipantMission>).requirements?.composition || {},
        },
      };
      onUpdate(updatedData);
    }
    setNewCapability('');
  };

  const removeCapability = (index: number) => {
    const updatedCapabilities = (data.requirements?.capabilities || []).filter(
      (_, i) => i !== index
    );

    if (data.type === MissionType.Single) {
      const updatedData: Partial<SingleParticipantMission> = {
        ...data,
        type: MissionType.Single,
        requirements: {
          ...(data as Partial<SingleParticipantMission>).requirements,
          capabilities: updatedCapabilities,
          minimumRank:
            (data as Partial<SingleParticipantMission>).requirements?.minimumRank || ROLE.USER,
        },
      };
      onUpdate(updatedData);
    } else {
      const updatedData: Partial<MultiParticipantMission> = {
        ...data,
        type: MissionType.Multi,
        requirements: {
          ...(data as Partial<MultiParticipantMission>).requirements,
          capabilities: updatedCapabilities,
          minParticipants:
            (data as Partial<MultiParticipantMission>).requirements?.minParticipants || 2,
          maxParticipants:
            (data as Partial<MultiParticipantMission>).requirements?.maxParticipants || 5,
          composition: (data as Partial<MultiParticipantMission>).requirements?.composition || {},
        },
      };
      onUpdate(updatedData);
    }
  };

  const handleMinimumRankChange = (value: string) => {
    if (data.type !== MissionType.Single) return;

    const numValue = parseInt(value) || 0;
    const error = validateField('minimumRank', numValue);
    setErrors((prev) => ({ ...prev, minimumRank: error }));

    const updatedData: Partial<SingleParticipantMission> = {
      ...data,
      type: MissionType.Single,
      requirements: {
        ...(data as Partial<SingleParticipantMission>).requirements,
        capabilities: (data as Partial<SingleParticipantMission>).requirements?.capabilities || [],
        minimumRank: ROLE.USER, // TODO: Convert number to ROLE enum
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
    const error = validateField(field, numValue);
    setErrors((prev) => ({ ...prev, [field]: error }));

    const currentData = data as Partial<MultiParticipantMission>;
    const updatedData: Partial<MultiParticipantMission> = {
      ...data,
      type: MissionType.Multi,
      requirements: {
        ...currentData.requirements,
        capabilities: currentData.requirements?.capabilities || [],
        minParticipants:
          field === 'minParticipants' ? numValue : currentData.requirements?.minParticipants || 2,
        maxParticipants:
          field === 'maxParticipants' ? numValue : currentData.requirements?.maxParticipants || 5,
        composition: currentData.requirements?.composition || {},
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
            className={`bg-cyber-dark border-cyber-purple ${
              errors.timeLimit ? 'border-red-500' : ''
            }`}
          />
          {errors.timeLimit && <p className="text-sm text-red-400">{errors.timeLimit}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="stakeAmount" className="text-cyber-purple-light">
            Stake Amount (Project89)
          </Label>
          <Input
            id="stakeAmount"
            type="number"
            min={0}
            value={data.baseRequirements?.stakeAmount || ''}
            onChange={(e) => handleBaseRequirementsChange('stakeAmount', e.target.value)}
            placeholder="Enter stake amount"
            className={`bg-cyber-dark border-cyber-purple ${
              errors.stakeAmount ? 'border-red-500' : ''
            }`}
          />
          {errors.stakeAmount && <p className="text-sm text-red-400">{errors.stakeAmount}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-cyber-purple-light">Required Capabilities</Label>
        <div className="flex gap-2 mb-2 flex-wrap">
          {data.requirements?.capabilities?.map((cap, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-cyber-dark border-cyber-purple px-3 py-1"
            >
              {cap}
              <button
                onClick={() => removeCapability(index)}
                className="ml-2 hover:text-red-400 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newCapability}
            onChange={(e) => setNewCapability(e.target.value)}
            placeholder="Enter a capability"
            className="bg-cyber-dark border-cyber-purple"
            onKeyPress={(e) => e.key === 'Enter' && addCapability()}
          />
          <Button
            onClick={addCapability}
            variant="outline"
            className="border-cyber-purple hover:bg-cyber-purple/20"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-gray-400">
          Add capabilities like machine-learning, blockchain-analysis, etc.
        </p>
        {errors.capabilities && <p className="text-sm text-red-400">{errors.capabilities}</p>}
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
            className={`bg-cyber-dark border-cyber-purple ${
              errors.minimumRank ? 'border-red-500' : ''
            }`}
          />
          {errors.minimumRank && <p className="text-sm text-red-400">{errors.minimumRank}</p>}
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
              className={`bg-cyber-dark border-cyber-purple ${
                errors.minParticipants ? 'border-red-500' : ''
              }`}
            />
            {errors.minParticipants && (
              <p className="text-sm text-red-400">{errors.minParticipants}</p>
            )}
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
              className={`bg-cyber-dark border-cyber-purple ${
                errors.maxParticipants ? 'border-red-500' : ''
              }`}
            />
            {errors.maxParticipants && (
              <p className="text-sm text-red-400">{errors.maxParticipants}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
