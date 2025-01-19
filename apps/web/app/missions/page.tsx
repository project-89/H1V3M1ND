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
      minimumRank: ROLE.AGENT_MASTER,
    },
    failureConditions: [
      {
        id: '1-1',
        description: 'Model accuracy falls below 85% on validation dataset',
        severity: Severity.High,
        category: Category.Performance,
      },
      {
        id: '1-2',
        description: 'Training time exceeds the specified time limit',
        severity: Severity.High,
        category: Category.Performance,
      },
      {
        id: '1-3',
        description: 'Memory usage exceeds allocated resources',
        severity: Severity.High,
        category: Category.Performance,
      },
      {
        id: '1-4',
        description: 'Failure to implement required safety measures',
        severity: Severity.High,
        category: Category.Security,
      },
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
      {
        id: '2-1',
        description: 'Protocol fails to achieve consensus in test environment',
        severity: Severity.High,
        category: Category.Performance,
      },
      {
        id: '2-2',
        description: 'Network latency exceeds acceptable thresholds',
        severity: Severity.High,
        category: Category.Performance,
      },
      {
        id: '2-3',
        description: 'System fails to scale beyond minimum participant count',
        severity: Severity.High,
        category: Category.Performance,
      },
      {
        id: '2-4',
        description: 'Critical security vulnerabilities identified in code review',
        severity: Severity.High,
        category: Category.Security,
      },
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
      minimumRank: ROLE.AGENT_SENIOR,
    },
    failureConditions: [
      {
        id: '3-1',
        description: 'Missing critical vulnerabilities during the audit',
        severity: Severity.High,
        category: Category.Security,
      },
      {
        id: '3-2',
        description: 'Providing false positives that delay deployment',
        severity: Severity.High,
        category: Category.Performance,
      },
      {
        id: '3-3',
        description: 'Failing to document findings according to standard',
        severity: Severity.High,
        category: Category.Performance,
      },
      {
        id: '3-4',
        description: 'Not completing all test cases in the audit plan',
        severity: Severity.High,
        category: Category.Performance,
      },
    ],
  },
  {
    id: '4',
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
      minimumRank: ROLE.AGENT_MASTER,
    },
    failureConditions: [
      {
        id: '1-1',
        description: 'Model accuracy falls below 85% on validation dataset',
        severity: Severity.High,
        category: Category.Performance,
      },
      {
        id: '1-2',
        description: 'Training time exceeds the specified time limit',
        severity: Severity.High,
        category: Category.Performance,
      },
      {
        id: '1-3',
        description: 'Memory usage exceeds allocated resources',
        severity: Severity.High,
        category: Category.Performance,
      },
      {
        id: '1-4',
        description: 'Failure to implement required safety measures',
        severity: Severity.High,
        category: Category.Security,
      },
    ],
  },
  {
    id: '5',
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
      {
        id: '2-1',
        description: 'Protocol fails to achieve consensus in test environment',
        severity: Severity.High,
        category: Category.Performance,
      },
      {
        id: '2-2',
        description: 'Network latency exceeds acceptable thresholds',
        severity: Severity.High,
        category: Category.Performance,
      },
      {
        id: '2-3',
        description: 'System fails to scale beyond minimum participant count',
        severity: Severity.High,
        category: Category.Performance,
      },
      {
        id: '2-4',
        description: 'Critical security vulnerabilities identified in code review',
        severity: Severity.High,
        category: Category.Security,
      },
    ],
  },
  {
    id: '6',
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
      minimumRank: ROLE.AGENT_SENIOR,
    },
    failureConditions: [
      {
        id: '3-1',
        description: 'Missing critical vulnerabilities during the audit',
        severity: Severity.High,
        category: Category.Security,
      },
      {
        id: '3-2',
        description: 'Providing false positives that delay deployment',
        severity: Severity.High,
        category: Category.Performance,
      },
      {
        id: '3-3',
        description: 'Failing to document findings according to standard',
        severity: Severity.High,
        category: Category.Performance,
      },
      {
        id: '3-4',
        description: 'Not completing all test cases in the audit plan',
        severity: Severity.High,
        category: Category.Performance,
      },
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
  const { missions, fetchMissions, isLoading, createMission } = useMissionStore();
  const [filteredMissions, setFilteredMissions] = useState<Mission[]>(sampleMissions);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

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

      <div className="flex-1 overflow-auto min-h-0">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
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
