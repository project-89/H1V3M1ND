'use client';

import { MissionProgressWrapper } from '../MissionProgressWrapper';
import {
  MissionType,
  MissionStatus,
  ParticipantType,
  SingleParticipantMission,
  MultiParticipantMission,
  FailureConditionType,
  FailureConditionCategory,
  ROLE,
  Mission,
} from '@H1V3M1ND/types';

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
    objectives: [
      {
        task: 'Deploy Neural Network Model',
        details:
          'Upload the trained model to endpoint: api.hivemind.ai/models/blockchain-pattern-v1',
      },
      {
        task: 'Configure Pattern Detection',
        details: 'Set detection threshold to 0.85 and enable quantum acceleration in settings.json',
      },
      {
        task: 'Implement Security Measures',
        details:
          'Add rate limiting of 1000 req/s and encrypt all transaction data using Protocol X',
      },
    ],
  },
  failureConditions: [
    {
      id: 'fc-1',
      description: 'Model performance degrades by more than 10%',
      type: FailureConditionType.Critical,
      category: FailureConditionCategory.Performance,
    },
    {
      id: 'fc-2',
      description: 'Resource usage exceeds specified limits',
      type: FailureConditionType.Standard,
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
    objectives: [
      {
        task: 'Initialize Swarm Network',
        details: 'Deploy nodes to coordinates (127.89, -42.56) and establish mesh topology',
      },
      {
        task: 'Configure Protocol Parameters',
        details: 'Set consensus timeout to 500ms and enable Byzantine fault tolerance',
      },
      {
        task: 'Implement Failover System',
        details: 'Deploy backup nodes with < 50ms activation time on network partition',
      },
      {
        task: 'Monitor Network Health',
        details: 'Set up monitoring at monitor.hivemind.ai with 99.99% uptime requirement',
      },
    ],
  },
  failureConditions: [
    {
      id: 'fc-3',
      description: 'System latency exceeds 100ms',
      type: FailureConditionType.Critical,
      category: FailureConditionCategory.Performance,
    },
    {
      id: 'fc-4',
      description: 'Node communication failure rate above 0.1%',
      type: FailureConditionType.Standard,
      category: FailureConditionCategory.Technical,
    },
    {
      id: 'fc-5',
      description: 'Team coordination breakdown',
      type: FailureConditionType.Critical,
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

export const sampleMissions: Mission[] = [
  {
    id: '1',
    type: MissionType.Single,
    title: 'Neural Network Training',
    description:
      'Train a specialized neural network for pattern recognition in blockchain transactions.',
    participantType: ParticipantType.Agent,
    status: MissionStatus.Available,
    createdBy: 'system',
    baseRequirements: {
      timeLimit: 24,
      stakeAmount: 100,
    },
    escrowAddress: '0x...',
    createdAt: Date.now(),
    expiryDate: Date.now() + 86400000,
    requirements: {
      objectives: [
        {
          task: 'Deploy Neural Network Model',
          details:
            'Upload the trained model to endpoint: api.hivemind.ai/models/blockchain-pattern-v1',
        },
        {
          task: 'Configure Pattern Detection',
          details:
            'Set detection threshold to 0.85 and enable quantum acceleration in settings.json',
        },
        {
          task: 'Implement Security Measures',
          details:
            'Add rate limiting of 1000 req/s and encrypt all transaction data using Protocol X',
        },
      ],
      minimumRank: ROLE.AGENT_MASTER,
      capabilities: ['neural-networks', 'blockchain', 'security'],
    },
    failureConditions: [
      {
        id: '1-1',
        description: 'Model accuracy falls below 85% on validation dataset',
        type: FailureConditionType.Critical,
        category: FailureConditionCategory.Performance,
      },
      {
        id: '1-2',
        description: 'Training time exceeds the specified time limit',
        type: FailureConditionType.Standard,
        category: FailureConditionCategory.Performance,
      },
      {
        id: '1-3',
        description: 'Insufficient documentation of model architecture',
        type: FailureConditionType.Warning,
        category: FailureConditionCategory.Communication,
      },
      {
        id: '1-4',
        description: 'Model exhibits biased behavior in edge cases',
        type: FailureConditionType.Critical,
        category: FailureConditionCategory.Security,
      },
    ],
  },
  {
    id: '2',
    type: MissionType.Multi,
    title: 'Swarm Intelligence Protocol',
    description:
      'Develop and test a new swarm intelligence protocol for coordinated agent operations.',
    status: MissionStatus.PendingStake,
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
      objectives: [
        {
          task: 'Initialize Swarm Network',
          details: 'Deploy nodes to coordinates (127.89, -42.56) and establish mesh topology',
        },
        {
          task: 'Configure Protocol Parameters',
          details: 'Set consensus timeout to 500ms and enable Byzantine fault tolerance',
        },
        {
          task: 'Implement Failover System',
          details: 'Deploy backup nodes with < 50ms activation time on network partition',
        },
        {
          task: 'Monitor Network Health',
          details: 'Set up monitoring at monitor.hivemind.ai with 99.99% uptime requirement',
        },
      ],
      capabilities: ['swarm-intelligence', 'networking', 'consensus-protocols'],
    },
    failureConditions: [
      {
        id: '2-1',
        description: 'Protocol fails to achieve consensus in test environment',
        type: FailureConditionType.Critical,
        category: FailureConditionCategory.Performance,
      },
      {
        id: '2-2',
        description: 'Network latency exceeds acceptable thresholds',
        type: FailureConditionType.Standard,
        category: FailureConditionCategory.Performance,
      },
      {
        id: '2-3',
        description: 'Inadequate peer review participation',
        type: FailureConditionType.Warning,
        category: FailureConditionCategory.Communication,
      },
      {
        id: '2-4',
        description: 'Critical security vulnerabilities identified in code review',
        type: FailureConditionType.Critical,
        category: FailureConditionCategory.Security,
      },
    ],
  },
];
