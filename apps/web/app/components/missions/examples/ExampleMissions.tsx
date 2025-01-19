'use client';

import { MissionProgressWrapper } from '../MissionProgressWrapper';
import {
  MissionType,
  MissionStatus,
  ParticipantType,
  SingleParticipantMission,
  MultiParticipantMission,
  FailureConditionSeverity,
  FailureConditionCategory,
  ROLE,
} from '@/lib/types';

// Example single-participant mission
const singleMission: SingleParticipantMission = {
  id: 'single-1',
  type: MissionType.Single,
  participantType: ParticipantType.Agent,
  title: 'Neural Network Optimization',
  description:
    'Optimize a complex neural network for improved performance and reduced resource consumption.',
  status: MissionStatus.InProgress,
  createdAt: Date.now() - 1000 * 60 * 60 * 24, // 24 hours ago
  expiryDate: Date.now() + 1000 * 60 * 60 * 48, // 48 hours from now
  escrowAddress: '0x123...',
  createdBy: 'agent-master-1',
  baseRequirements: {
    timeLimit: 72,
    stakeAmount: 1000,
  },
  requirements: {
    minimumRank: ROLE.AGENT_SENIOR,
    capabilities: ['Deep Learning', 'PyTorch', 'Model Optimization'],
    specialRequirements: [
      'Experience with transformer architectures',
      'Knowledge of quantization techniques',
    ],
    categorySpecificRanks: {
      'Neural Networks': ROLE.AGENT_MASTER,
      'Performance Optimization': ROLE.AGENT_SENIOR,
      'Resource Management': ROLE.AGENT_FIELD,
    },
  },
  failureConditions: [
    {
      id: 'fc-1',
      description: 'Model performance degrades by more than 10%',
      severity: FailureConditionSeverity.High,
      category: FailureConditionCategory.Performance,
    },
    {
      id: 'fc-2',
      description: 'Resource usage exceeds specified limits',
      severity: FailureConditionSeverity.Medium,
      category: FailureConditionCategory.Technical,
    },
  ],
};

// Example multi-participant mission
const multiMission: MultiParticipantMission = {
  id: 'multi-1',
  type: MissionType.Multi,
  title: 'Distributed AI System Development',
  description:
    'Develop a distributed AI system for real-time data processing across multiple nodes.',
  status: MissionStatus.Active,
  createdAt: Date.now() - 1000 * 60 * 60 * 12, // 12 hours ago
  expiryDate: Date.now() + 1000 * 60 * 60 * 96, // 96 hours from now
  escrowAddress: '0x456...',
  createdBy: 'agent-master-2',
  baseRequirements: {
    timeLimit: 96,
    stakeAmount: 2500,
  },
  requirements: {
    minParticipants: 3,
    maxParticipants: 5,
    capabilities: ['Distributed Systems', 'AI Development', 'System Architecture'],
    composition: {
      humans: 2,
      agents: 3,
      teamStructure:
        'Hierarchical team with one lead architect and specialized implementation teams',
      roleDistribution:
        'Lead Architect (Human), System Designer (Human), Implementation Specialists (AI Agents)',
    },
  },
  failureConditions: [
    {
      id: 'fc-3',
      description: 'System latency exceeds 100ms',
      severity: FailureConditionSeverity.High,
      category: FailureConditionCategory.Performance,
    },
    {
      id: 'fc-4',
      description: 'Node communication failure rate above 0.1%',
      severity: FailureConditionSeverity.Medium,
      category: FailureConditionCategory.Technical,
    },
    {
      id: 'fc-5',
      description: 'Team coordination breakdown',
      severity: FailureConditionSeverity.High,
      category: FailureConditionCategory.Communication,
    },
  ],
};

export function ExampleMissions() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Single Participant Mission Example</h2>
        <MissionProgressWrapper mission={singleMission} />
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-4">Multi-Participant Mission Example</h2>
        <MissionProgressWrapper mission={multiMission} />
      </div>
    </div>
  );
}
