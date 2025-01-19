'use client';

import { RadioGroup, RadioGroupItem, Label, Input } from '@H1V3M1ND/ui';
import {
  MissionType,
  ParticipantType,
  SingleParticipantMission,
  MultiParticipantMission,
} from '@/lib/types';

interface ParticipantsStepProps {
  data: Partial<SingleParticipantMission | MultiParticipantMission>;
  onUpdate: (data: Partial<SingleParticipantMission | MultiParticipantMission>) => void;
}

export function ParticipantsStep({ data, onUpdate }: ParticipantsStepProps) {
  const isSingleParticipant = data.type === MissionType.Single;

  const handleParticipantTypeChange = (value: ParticipantType) => {
    if (isSingleParticipant) {
      onUpdate({
        ...data,
        participantType: value,
      } as Partial<SingleParticipantMission>);
    }
  };

  const handleTeamSizeChange = (field: 'minParticipants' | 'maxParticipants', value: string) => {
    if (!isSingleParticipant) {
      const numValue = parseInt(value) || 0;
      onUpdate({
        ...data,
        requirements: {
          ...(data as Partial<MultiParticipantMission>).requirements,
          [field]: numValue,
        },
      } as Partial<MultiParticipantMission>);
    }
  };

  const handleCompositionChange = (field: 'humans' | 'agents', value: string) => {
    if (!isSingleParticipant) {
      const numValue = parseInt(value) || 0;
      onUpdate({
        ...data,
        requirements: {
          ...(data as Partial<MultiParticipantMission>).requirements,
          composition: {
            ...(data as Partial<MultiParticipantMission>).requirements?.composition,
            [field]: numValue,
          },
        },
      } as Partial<MultiParticipantMission>);
    }
  };

  return (
    <div className="space-y-6">
      {isSingleParticipant ? (
        <div className="space-y-4">
          <Label>Participant Type</Label>
          <RadioGroup
            value={data.type === MissionType.Single ? data.participantType : undefined}
            onValueChange={(value) => handleParticipantTypeChange(value as ParticipantType)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={ParticipantType.Human} id="human" />
              <Label htmlFor="human">Human</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={ParticipantType.Agent} id="agent" />
              <Label htmlFor="agent">AI Agent</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={ParticipantType.Any} id="any" />
              <Label htmlFor="any">Any</Label>
            </div>
          </RadioGroup>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Minimum Participants</Label>
              <Input
                type="number"
                min={2}
                value={
                  (data as Partial<MultiParticipantMission>).requirements?.minParticipants || ''
                }
                onChange={(e) => handleTeamSizeChange('minParticipants', e.target.value)}
                placeholder="2"
              />
            </div>
            <div className="space-y-2">
              <Label>Maximum Participants</Label>
              <Input
                type="number"
                min={2}
                value={
                  (data as Partial<MultiParticipantMission>).requirements?.maxParticipants || ''
                }
                onChange={(e) => handleTeamSizeChange('maxParticipants', e.target.value)}
                placeholder="5"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Team Composition</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Humans</Label>
                <Input
                  type="number"
                  min={0}
                  value={
                    (data as Partial<MultiParticipantMission>).requirements?.composition?.humans ||
                    ''
                  }
                  onChange={(e) => handleCompositionChange('humans', e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label>AI Agents</Label>
                <Input
                  type="number"
                  min={0}
                  value={
                    (data as Partial<MultiParticipantMission>).requirements?.composition?.agents ||
                    ''
                  }
                  onChange={(e) => handleCompositionChange('agents', e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
