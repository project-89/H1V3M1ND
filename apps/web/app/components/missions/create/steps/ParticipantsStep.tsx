'use client';

import { Label, Textarea } from '@H1V3M1ND/ui';
import {
  Mission,
  MissionType,
  SingleParticipantMission,
  MultiParticipantMission,
  ROLE,
} from '@/lib/types';

interface ParticipantsStepProps {
  data: Partial<Mission>;
  onUpdate: (data: Partial<Mission>) => void;
}

export function ParticipantsStep({ data, onUpdate }: ParticipantsStepProps) {
  const handleSingleParticipantUpdate = (
    field: keyof SingleParticipantMission['requirements'],
    value: string
  ) => {
    if (data.type !== MissionType.Single) return;

    const updatedData: Partial<SingleParticipantMission> = {
      ...data,
      type: MissionType.Single,
      requirements: {
        ...data.requirements,
        capabilities: data.requirements?.capabilities || [],
        minimumRank: data.requirements?.minimumRank || ROLE.AGENT_INITIATE,
        [field]: value,
      },
    };
    onUpdate(updatedData);
  };

  const handleMultiParticipantUpdate = (field: string, value: string) => {
    if (data.type !== MissionType.Multi) return;

    const currentData = data as Partial<MultiParticipantMission>;
    const updatedData: Partial<MultiParticipantMission> = {
      ...data,
      type: MissionType.Multi,
      requirements: {
        minParticipants: currentData.requirements?.minParticipants || 2,
        maxParticipants: currentData.requirements?.maxParticipants || 5,
        capabilities: currentData.requirements?.capabilities || [],
        composition: {
          ...currentData.requirements?.composition,
          [field]: value,
        },
      },
    };
    onUpdate(updatedData);
  };

  if (data.type === MissionType.Single) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="preferredAgent" className="text-cyber-purple-light">
            Preferred Agent Profile
          </Label>
          <Textarea
            id="preferredAgent"
            value={(data as Partial<SingleParticipantMission>).requirements?.preferredAgent || ''}
            onChange={(e) => handleSingleParticipantUpdate('preferredAgent', e.target.value)}
            placeholder="Describe the ideal agent for this mission..."
            className="bg-cyber-dark border-cyber-purple h-32"
          />
          <p className="text-sm text-gray-400">
            Describe the ideal agent profile, including experience level and specializations
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialRequirements" className="text-cyber-purple-light">
            Special Requirements
          </Label>
          <Textarea
            id="specialRequirements"
            value={
              (data as Partial<SingleParticipantMission>).requirements?.specialRequirements || ''
            }
            onChange={(e) => handleSingleParticipantUpdate('specialRequirements', e.target.value)}
            placeholder="List any special requirements or qualifications..."
            className="bg-cyber-dark border-cyber-purple h-32"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="teamStructure" className="text-cyber-purple-light">
          Team Structure
        </Label>
        <Textarea
          id="teamStructure"
          value={
            (data as Partial<MultiParticipantMission>).requirements?.composition?.teamStructure ||
            ''
          }
          onChange={(e) => handleMultiParticipantUpdate('teamStructure', e.target.value)}
          placeholder="Describe the required team structure and roles..."
          className="bg-cyber-dark border-cyber-purple h-32"
        />
        <p className="text-sm text-gray-400">
          Define the team structure, including required roles and responsibilities
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="roleDistribution" className="text-cyber-purple-light">
          Role Distribution
        </Label>
        <Textarea
          id="roleDistribution"
          value={
            (data as Partial<MultiParticipantMission>).requirements?.composition
              ?.roleDistribution || ''
          }
          onChange={(e) => handleMultiParticipantUpdate('roleDistribution', e.target.value)}
          placeholder="Specify how roles should be distributed..."
          className="bg-cyber-dark border-cyber-purple h-32"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="collaborationRequirements" className="text-cyber-purple-light">
          Collaboration Requirements
        </Label>
        <Textarea
          id="collaborationRequirements"
          value={
            (data as Partial<MultiParticipantMission>).requirements?.composition
              ?.collaborationRequirements || ''
          }
          onChange={(e) =>
            handleMultiParticipantUpdate('collaborationRequirements', e.target.value)
          }
          placeholder="Describe collaboration requirements and communication protocols..."
          className="bg-cyber-dark border-cyber-purple h-32"
        />
      </div>
    </div>
  );
}
