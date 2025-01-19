'use client';

import { MissionType, SingleParticipantMission, MultiParticipantMission } from '@/lib/types';

import { SingleParticipantProgress } from './SingleParticipantProgress';
import { MultiParticipantProgress } from './MultiParticipantProgress';

interface MissionProgressWrapperProps {
  mission: SingleParticipantMission | MultiParticipantMission;
}

export function MissionProgressWrapper({ mission }: MissionProgressWrapperProps) {
  // Type guard function to check mission type
  const isSingleParticipantMission = (
    mission: SingleParticipantMission | MultiParticipantMission
  ): mission is SingleParticipantMission => {
    return mission.type === MissionType.Single;
  };

  if (isSingleParticipantMission(mission)) {
    return <SingleParticipantProgress mission={mission} />;
  }

  if (mission.type === MissionType.Multi) {
    return <MultiParticipantProgress mission={mission} />;
  }

  // This case should never happen due to TypeScript's exhaustive type checking
  return (
    <div className="bg-cyber-dark border border-red-500/50 rounded-lg p-6">
      <p className="text-red-400">Invalid mission type</p>
    </div>
  );
}
