'use client';

import { useEffect, useState } from 'react';
import { FilterBar, FilterState } from '@/components/missions/FilterBar';
import { MissionCard } from '@/components/missions/MissionCard';
import { MissionDetailsDialog } from '@/components/missions/MissionDetailsDialog';
import { MissionCreateDialog } from '@/components/missions/create/MissionCreateDialog';
import { useMissionStore } from '@/store/missions';
import {
  Mission,
  TimeRange,
  StakeRange,
  MissionType,
  MissionScale,
  MissionStatus,
  ParticipantType,
  FailureConditionSeverity as Severity,
  FailureConditionCategory as Category,
  SingleParticipantMission,
  MultiParticipantMission,
  ROLE,
} from '@/lib/types';
import { Terminal, Plus } from 'lucide-react';
import { Button } from '@H1V3M1ND/ui';
import { sampleMissions } from '@/lib/examples/missions';

function filterMissions(missions: Mission[], filters: FilterState): Mission[] {
  return missions.filter((mission) => {
    // Text search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        mission.title.toLowerCase().includes(searchLower) ||
        mission.description.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Participant type (for single participant missions)
    if (filters.participantType && 'participantType' in mission) {
      if (mission.participantType !== filters.participantType) return false;
    }

    // Scale (mapped from type and requirements)
    if (filters.scale) {
      // For single missions, solo is implied
      if (mission.type === MissionType.Single && filters.scale !== MissionScale.Solo) return false;
      // For multi missions, check participant count
      if (mission.type === MissionType.Multi) {
        const isParty = mission.requirements.maxParticipants <= 5;
        if (filters.scale === MissionScale.Solo) return false;
        if (filters.scale === MissionScale.Party && !isParty) return false;
        if (filters.scale === MissionScale.Swarm && isParty) return false;
      }
    }

    // Status
    if (filters.status && mission.status !== filters.status) return false;

    // Time Range
    if (filters.timeRange) {
      const timeLimit = mission.baseRequirements.timeLimit || 0;
      switch (filters.timeRange) {
        case TimeRange.Short:
          if (timeLimit >= 24) return false;
          break;
        case TimeRange.Medium:
          if (timeLimit < 24 || timeLimit > 72) return false;
          break;
        case TimeRange.Long:
          if (timeLimit <= 72) return false;
          break;
      }
    }

    // Stake Range
    if (filters.stakeRange) {
      const stakeAmount = mission.baseRequirements.stakeAmount || 0;
      switch (filters.stakeRange) {
        case StakeRange.Low:
          if (stakeAmount >= 500) return false;
          break;
        case StakeRange.Medium:
          if (stakeAmount < 500 || stakeAmount > 2000) return false;
          break;
        case StakeRange.High:
          if (stakeAmount <= 2000) return false;
          break;
      }
    }

    return true;
  });
}

export interface MissionCardProps {
  mission: Mission;
  onClick?: () => void;
}

export interface MissionDetailsDialogProps {
  mission: Mission;
  onClose: () => void;
}

export default function MissionsPage() {
  const { missions, fetchMissions, isLoading, createMission } = useMissionStore();
  const [filteredMissions, setFilteredMissions] = useState<Mission[]>(sampleMissions);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    fetchMissions();
  }, [fetchMissions]);

  useEffect(() => {
    // Keep sample missions until we have real data
    if (missions && missions.length > 0) {
      setFilteredMissions(missions);
    } else {
      setFilteredMissions(sampleMissions);
    }
  }, [missions]);

  const handleFilterChange = (filters: FilterState) => {
    // Always use sample missions if no real missions exist
    const currentMissions = missions.length > 0 ? missions : sampleMissions;
    const filtered = filterMissions(currentMissions, filters);
    setFilteredMissions(filtered);
  };

  const handleCreateMission = async (missionData: Partial<Mission>) => {
    if (!missionData.type) {
      throw new Error('Mission type is required');
    }

    if (missionData.type === MissionType.Single) {
      await createMission(missionData as Partial<SingleParticipantMission>);
    } else {
      await createMission(missionData as Partial<MultiParticipantMission>);
    }
    setIsCreateDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-cyber-purple">Loading missions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex-none container mx-auto px-4 pt-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-1 text-glow-pink">Available Missions</h1>
            <p className="text-gray-400">Find and accept missions that match your capabilities</p>
          </div>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-cyber-purple hover:bg-cyber-purple/80 h-9"
          >
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Create Mission</span>
            </div>
          </Button>
        </div>

        <FilterBar onFilterChange={handleFilterChange} />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMissions.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
                <div className="rounded-full bg-cyber-darker p-4 mb-4">
                  <Terminal className="h-8 w-8 text-neon-pink animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-neon-pink mb-2">No Missions Found</h3>
                <p className="text-gray-400 max-w-md">
                  No missions match your current filters. Try adjusting your search criteria or
                  check back later for new opportunities.
                </p>
              </div>
            ) : (
              filteredMissions.map((mission, index) => (
                <MissionCard
                  key={`${mission.id}-${index}`}
                  mission={mission}
                  onClick={() => setSelectedMission(mission)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {selectedMission && (
        <MissionDetailsDialog
          mission={selectedMission}
          onClose={() => setSelectedMission(null)}
          isOpen={!!selectedMission}
        />
      )}

      <MissionCreateDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateMission}
      />
    </div>
  );
}
