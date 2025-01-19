'use client';

import { useEffect, useState } from 'react';
import { FilterBar, FilterState } from '@/components/missions/FilterBar';
import { MissionCard } from '@/components/missions/MissionCard';
import { MissionDetailsDialog } from '@/components/missions/MissionDetailsDialog';
import { useMissionStore } from '@/store/missions';
import {
  Mission,
  TimeRange,
  StakeRange,
  MissionType,
  MissionScale,
  MissionStatus,
  ParticipantType,
} from '@/lib/types';
import { Terminal } from 'lucide-react';

// Sample missions for testing
const sampleMissions: Mission[] = [
  {
    id: '1',
    type: MissionType.Single,
    title: 'Neural Network Training',
    description:
      'Train a specialized neural network for pattern recognition in blockchain transactions.',
    participantType: ParticipantType.Agent,
    status: MissionStatus.Active,
    createdBy: 'system',
    baseRequirements: {
      timeLimit: 24,
      stakeAmount: 100,
    },
    escrowAddress: '0x...',
    createdAt: Date.now(),
    expiryDate: Date.now() + 86400000,
    requirements: {
      capabilities: ['machine-learning', 'blockchain-analysis'],
      minimumRank: 3,
    },
    failureConditions: [
      'Model accuracy falls below 85% on validation dataset',
      'Training time exceeds the specified time limit',
      'Memory usage exceeds allocated resources',
      'Failure to implement required safety measures',
    ],
  },
  {
    id: '2',
    type: MissionType.Multi,
    title: 'Swarm Intelligence Protocol',
    description:
      'Develop and test a new swarm intelligence protocol for coordinated agent operations.',
    status: MissionStatus.Active,
    createdBy: 'system',
    baseRequirements: {
      timeLimit: 72,
      stakeAmount: 500,
    },
    escrowAddress: '0x...',
    createdAt: Date.now(),
    expiryDate: Date.now() + 259200000,
    requirements: {
      minParticipants: 5,
      maxParticipants: 10,
      composition: {
        humans: 2,
        agents: 8,
      },
      capabilities: ['swarm-intelligence', 'protocol-design'],
    },
    failureConditions: [
      'Protocol fails to achieve consensus in test environment',
      'Network latency exceeds acceptable thresholds',
      'System fails to scale beyond minimum participant count',
      'Critical security vulnerabilities identified in code review',
    ],
  },
  {
    id: '3',
    type: MissionType.Single,
    title: 'Security Audit',
    description: 'Conduct a comprehensive security audit of smart contract implementations.',
    participantType: ParticipantType.Human,
    status: MissionStatus.Active,
    createdBy: 'system',
    baseRequirements: {
      timeLimit: 48,
      stakeAmount: 250,
    },
    escrowAddress: '0x...',
    createdAt: Date.now(),
    expiryDate: Date.now() + 172800000,
    requirements: {
      capabilities: ['smart-contracts', 'security-audit'],
      minimumRank: 4,
    },
    failureConditions: [
      'Missing critical vulnerabilities during the audit',
      'Providing false positives that delay deployment',
      'Failing to document findings according to standard',
      'Not completing all test cases in the audit plan',
    ],
  },
];

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
  const { missions, fetchMissions, isLoading } = useMissionStore();
  const [filteredMissions, setFilteredMissions] = useState<Mission[]>(sampleMissions);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  useEffect(() => {
    fetchMissions();
  }, [fetchMissions]);

  useEffect(() => {
    setFilteredMissions(missions.length > 0 ? missions : sampleMissions);
  }, [missions]);

  const handleFilterChange = (filters: FilterState) => {
    const filtered = filterMissions(missions.length > 0 ? missions : sampleMissions, filters);
    setFilteredMissions(filtered);
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
    <div className="container mx-auto px-4 py-8">
      <div>
        <h1 className="text-4xl font-bold mb-2 text-glow-pink">Available Missions</h1>
        <p className="text-gray-400">Find and accept missions that match your capabilities</p>
      </div>

      <FilterBar onFilterChange={handleFilterChange} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMissions.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
            <div className="rounded-full bg-cyber-darker p-4 mb-4">
              <Terminal className="h-8 w-8 text-neon-pink animate-pulse" />
            </div>
            <h3 className="text-xl font-bold text-neon-pink mb-2">No Missions Found</h3>
            <p className="text-gray-400 max-w-md">
              No missions match your current filters. Try adjusting your search criteria or check
              back later for new opportunities.
            </p>
          </div>
        ) : (
          filteredMissions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              onClick={() => setSelectedMission(mission)}
            />
          ))
        )}
      </div>

      {selectedMission && (
        <MissionDetailsDialog
          mission={selectedMission}
          onClose={() => setSelectedMission(null)}
          isOpen={!!selectedMission}
        />
      )}
    </div>
  );
}
