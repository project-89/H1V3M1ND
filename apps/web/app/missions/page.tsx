'use client';

import { useEffect, useState } from 'react';
import { FilterBar, FilterState } from '@/components/missions/FilterBar';
import { MissionCard } from '@/components/missions/MissionCard';
import { MissionDetailsDialog } from '@/components/missions/MissionDetailsDialog';
import { MissionCreateDialog } from '@/components/missions/create/MissionCreateDialog';
import { useMissionStore, useWalletStore } from '@/store';
import { Button } from '@H1V3M1ND/ui';
import { Terminal, Plus } from 'lucide-react';
import { sampleMissions } from '@/lib/examples/missions';
import { toast } from 'sonner';

import {
  Mission,
  TimeRange,
  StakeRange,
  MissionType,
  MissionScale,
  SingleParticipantMission,
  MultiParticipantMission,
} from '@/lib/types';

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
  const { isConnected: isWalletConnected } = useWalletStore();
  const [filteredMissions, setFilteredMissions] = useState<Mission[]>(sampleMissions);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    fetchMissions();
  }, [fetchMissions]);

  useEffect(() => {
    // Only update if we get valid missions from the backend
    if (missions && Array.isArray(missions) && missions.length > 0) {
      setFilteredMissions(missions);
    }
  }, [missions]);

  const handleFilterChange = (filters: FilterState) => {
    // Always use sample missions if no real missions exist
    const currentMissions =
      missions && Array.isArray(missions) && missions.length > 0 ? missions : sampleMissions;
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

  const handleCreateMissionClick = () => {
    if (!isWalletConnected) {
      toast('Connect Wallet', {
        description: 'Please connect your wallet to create missions',
        action: {
          label: 'Connect',
          onClick: () => {
            const walletButton = document.querySelector(
              '[data-wallet-button="true"]'
            ) as HTMLElement;
            walletButton?.click();
          },
        },
      });
      return;
    }
    setIsCreateDialogOpen(true);
  };

  // Only show loading when we're refreshing actual mission data
  if (isLoading && missions && missions.length > 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-cyber-purple">Loading missions...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="fixed top-[6%] pt-4 left-0 right-0 z-[0] bg-gradient-to-b from-black via-cyber-darker/90 to-transparent pb-6">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between my-6">
              <div>
                <h1 className="text-3xl font-bold mb-1 text-glow-pink">Available Missions</h1>
                <p className="text-gray-400">
                  Find and accept missions that match your capabilities
                </p>
              </div>
              <Button
                variant="default"
                size="lg"
                onClick={handleCreateMissionClick}
                className="shadow-none hover:shadow-none border-2 bg-[#582cd0] border-cyber-purple hover:bg-[#582cd0]/70 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <Plus className="h-5 w-5" />
                  Create Mission
                </div>
              </Button>
            </div>

            <FilterBar onFilterChange={handleFilterChange} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-10 mt-[180px] py-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </>
  );
}
