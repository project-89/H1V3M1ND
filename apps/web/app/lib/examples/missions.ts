import {
  Mission,
  MissionType,
  ParticipantType,
  MissionStatus,
  ROLE,
  FailureConditionCategory as Category,
  FailureConditionType,
} from '@/lib/types';

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
    },
    failureConditions: [
      {
        id: '1-1',
        description: 'Model accuracy falls below 85% on validation dataset',
        type: FailureConditionType.Critical,
        category: Category.Performance,
      },
      {
        id: '1-2',
        description: 'Training time exceeds the specified time limit',
        type: FailureConditionType.Standard,
        category: Category.Performance,
      },
      {
        id: '1-3',
        description: 'Insufficient documentation of model architecture',
        type: FailureConditionType.Warning,
        category: Category.Communication,
      },
      {
        id: '1-4',
        description: 'Model exhibits biased behavior in edge cases',
        type: FailureConditionType.Critical,
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
    },
    failureConditions: [
      {
        id: '2-1',
        description: 'Protocol fails to achieve consensus in test environment',
        type: FailureConditionType.Critical,
        category: Category.Performance,
      },
      {
        id: '2-2',
        description: 'Network latency exceeds acceptable thresholds',
        type: FailureConditionType.Standard,
        category: Category.Performance,
      },
      {
        id: '2-3',
        description: 'Inadequate peer review participation',
        type: FailureConditionType.Warning,
        category: Category.Communication,
      },
      {
        id: '2-4',
        description: 'Critical security vulnerabilities identified in code review',
        type: FailureConditionType.Critical,
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
      objectives: [
        {
          task: 'Audit Smart Contract',
          details:
            'Review contract at 0x742d35Cc6634C0532925a3b844Bc454e4438f44e for vulnerabilities',
        },
        {
          task: 'Test Zero-Knowledge Implementation',
          details: 'Verify zk-SNARK proofs in test environment using provided test vectors',
        },
        {
          task: 'Document Security Findings',
          details: 'Submit detailed report to security.hivemind.ai/audits by deadline',
        },
      ],
      minimumRank: ROLE.AGENT_SENIOR,
    },
    failureConditions: [
      {
        id: '3-1',
        description: 'Missing critical vulnerabilities during the audit',
        type: FailureConditionType.Critical,
        category: Category.Security,
      },
      {
        id: '3-2',
        description: 'Providing false positives that delay deployment',
        type: FailureConditionType.Standard,
        category: Category.Performance,
      },
      {
        id: '3-3',
        description: 'Failing to document findings according to standard',
        type: FailureConditionType.Standard,
        category: Category.Performance,
      },
      {
        id: '3-4',
        description: 'Not completing all test cases in the audit plan',
        type: FailureConditionType.Standard,
        category: Category.Performance,
      },
    ],
  },
  {
    id: '4',
    type: MissionType.Single,
    title: 'Data Pipeline Optimization',
    description:
      'Optimize the data processing pipeline for improved throughput and reduced latency.',
    participantType: ParticipantType.Agent,
    status: MissionStatus.InProgress,
    createdBy: 'system',
    baseRequirements: {
      timeLimit: 36,
      stakeAmount: 300,
    },
    escrowAddress: '0x...',
    createdAt: Date.now() - 43200000, // Started 12 hours ago
    expiryDate: Date.now() + 86400000,
    requirements: {
      objectives: [
        {
          task: 'Optimize Pipeline Throughput',
          details:
            'Increase processing speed to >10k transactions/second while maintaining accuracy',
          completed: true,
          verifiedAt: Date.now() - 21600000, // 6 hours ago
        },
        {
          task: 'Reduce Memory Usage',
          details: 'Optimize memory consumption to stay under 4GB during peak load',
          completed: true,
          verifiedAt: Date.now() - 7200000, // 2 hours ago
        },
        {
          task: 'Implement Load Balancing',
          details: 'Deploy load balancer at lb.hivemind.ai with auto-scaling configuration',
          completed: false,
        },
      ],
      minimumRank: ROLE.AGENT_FIELD,
    },
    failureConditions: [
      {
        id: '4-1',
        description: 'Model accuracy falls below 85% on validation dataset',
        type: FailureConditionType.Standard,
        category: Category.Performance,
      },
      {
        id: '4-2',
        description: 'Training time exceeds the specified time limit',
        type: FailureConditionType.Standard,
        category: Category.Performance,
      },
      {
        id: '4-3',
        description: 'Memory usage exceeds allocated resources',
        type: FailureConditionType.Standard,
        category: Category.Performance,
      },
      {
        id: '4-4',
        description: 'Failure to implement required safety measures',
        type: FailureConditionType.Standard,
        category: Category.Security,
      },
    ],
  },
  {
    id: '5',
    type: MissionType.Multi,
    title: 'Consensus Algorithm Implementation',
    description: 'Implement and test a new consensus algorithm for distributed systems.',
    status: MissionStatus.PendingValidation,
    createdBy: 'system',
    baseRequirements: {
      timeLimit: 96,
      stakeAmount: 1000,
    },
    escrowAddress: '0x...',
    createdAt: Date.now() - 259200000, // Started 3 days ago
    expiryDate: Date.now() + 172800000,
    requirements: {
      minParticipants: 3,
      maxParticipants: 6,
      composition: {
        humans: 1,
        agents: 5,
      },
      objectives: [
        {
          task: 'Implement Consensus Algorithm',
          details: 'Develop and test a new consensus algorithm for distributed systems',
        },
        {
          task: 'Build Distributed Computing Systems',
          details: 'Create scalable distributed computing systems',
        },
        {
          task: 'Ensure System Stability',
          details: 'Ensure system stability under varying network conditions',
        },
        {
          task: 'Verify System Correctness',
          details: 'Verify system correctness through formal methods',
        },
      ],
    },
    failureConditions: [
      {
        id: '5-1',
        description: 'Protocol fails to achieve consensus in test environment',
        type: FailureConditionType.Critical,
        category: Category.Performance,
      },
      {
        id: '5-2',
        description: 'Network latency exceeds acceptable thresholds',
        type: FailureConditionType.Standard,
        category: Category.Performance,
      },
      {
        id: '5-3',
        description: 'System fails to scale beyond minimum participant count',
        type: FailureConditionType.Warning,
        category: Category.Performance,
      },
      {
        id: '5-4',
        description: 'Critical security vulnerabilities identified in code review',
        type: FailureConditionType.Critical,
        category: Category.Security,
      },
    ],
  },
  {
    id: '6',
    type: MissionType.Single,
    title: 'Network Security Analysis',
    description: 'Analyze network security and implement enhanced protection measures.',
    participantType: ParticipantType.Human,
    status: MissionStatus.InValidation,
    createdBy: 'system',
    baseRequirements: {
      timeLimit: 24,
      stakeAmount: 200,
    },
    escrowAddress: '0x...',
    createdAt: Date.now() - 172800000, // Started 2 days ago
    expiryDate: Date.now() + 86400000,
    requirements: {
      objectives: [
        {
          task: 'Audit Network Security',
          details: 'Review network security protocols and measures',
        },
        {
          task: 'Identify Security Threats',
          details: 'Identify and analyze potential security threats and vulnerabilities',
        },
        {
          task: 'Deploy Intrusion Detection Systems',
          details: 'Deploy and maintain sophisticated intrusion detection systems',
        },
        {
          task: 'Develop Zero-Day Defense Strategies',
          details: 'Develop proactive defenses against unknown threats',
        },
      ],
      minimumRank: ROLE.AGENT_SENIOR,
    },
    failureConditions: [
      {
        id: '6-1',
        description: 'Missing critical vulnerabilities during the audit',
        type: FailureConditionType.Critical,
        category: Category.Security,
      },
      {
        id: '6-2',
        description: 'Providing false positives that delay deployment',
        type: FailureConditionType.Standard,
        category: Category.Performance,
      },
      {
        id: '6-3',
        description: 'Failing to document findings according to standard',
        type: FailureConditionType.Standard,
        category: Category.Performance,
      },
      {
        id: '6-4',
        description: 'Not completing all test cases in the audit plan',
        type: FailureConditionType.Standard,
        category: Category.Performance,
      },
    ],
  },
  {
    id: '7',
    type: MissionType.Single,
    title: 'AI Model Deployment',
    description: 'Successfully deploy and monitor AI model in production environment.',
    participantType: ParticipantType.Agent,
    status: MissionStatus.Completed,
    createdBy: 'system',
    baseRequirements: {
      timeLimit: 48,
      stakeAmount: 400,
    },
    escrowAddress: '0x...',
    createdAt: Date.now() - 259200000, // Started 3 days ago
    expiryDate: Date.now() - 86400000, // Ended 1 day ago
    requirements: {
      objectives: [
        {
          task: 'Deploy AI Model',
          details: 'Deploy and monitor AI models in production environments',
          completed: true,
          verifiedAt: Date.now() - 172800000, // 2 days ago
        },
        {
          task: 'Train Neural Network',
          details: 'Train and optimize neural networks for specific tasks',
          completed: true,
          verifiedAt: Date.now() - 259200000, // 3 days ago
        },
        {
          task: 'Optimize Model Performance',
          details: 'Optimize model performance and resource usage',
          completed: true,
          verifiedAt: Date.now() - 86400000, // 1 day ago
        },
        {
          task: 'Integrate with Existing Infrastructure',
          details: 'Integrate AI models with existing infrastructure',
          completed: true,
          verifiedAt: Date.now() - 43200000, // 12 hours ago
        },
      ],
      minimumRank: ROLE.AGENT_FIELD,
    },
    failureConditions: [
      {
        id: '7-1',
        description: 'Model accuracy falls below 85% on validation dataset',
        type: FailureConditionType.Standard,
        category: Category.Performance,
      },
      {
        id: '7-2',
        description: 'Training time exceeds the specified time limit',
        type: FailureConditionType.Standard,
        category: Category.Performance,
      },
      {
        id: '7-3',
        description: 'Memory usage exceeds allocated resources',
        type: FailureConditionType.Standard,
        category: Category.Performance,
      },
      {
        id: '7-4',
        description: 'Failure to implement required safety measures',
        type: FailureConditionType.Standard,
        category: Category.Security,
      },
    ],
  },
  {
    id: '8',
    type: MissionType.Multi,
    title: 'System Integration Test',
    description: 'Conduct comprehensive system integration testing across multiple components.',
    status: MissionStatus.Failed,
    createdBy: 'system',
    baseRequirements: {
      timeLimit: 72,
      stakeAmount: 600,
    },
    escrowAddress: '0x...',
    createdAt: Date.now() - 432000000, // Started 5 days ago
    expiryDate: Date.now() - 172800000, // Ended 2 days ago
    requirements: {
      minParticipants: 4,
      maxParticipants: 8,
      composition: {
        humans: 2,
        agents: 6,
      },
      objectives: [
        {
          task: 'Conduct System Testing',
          details: 'Conduct comprehensive system-wide testing',
        },
        {
          task: 'Test Integration',
          details: 'Test interactions between system components',
        },
        {
          task: 'Analyze System Performance',
          details: 'Analyze and optimize system performance',
        },
        {
          task: 'Validate System Security',
          details: 'Validate system security measures and protocols',
        },
      ],
    },
    failureConditions: [
      {
        id: '8-1',
        description: 'Missing critical vulnerabilities during the audit',
        type: FailureConditionType.Critical,
        category: Category.Security,
      },
      {
        id: '8-2',
        description: 'Providing false positives that delay deployment',
        type: FailureConditionType.Standard,
        category: Category.Performance,
      },
      {
        id: '8-3',
        description: 'Failing to document findings according to standard',
        type: FailureConditionType.Standard,
        category: Category.Performance,
      },
      {
        id: '8-4',
        description: 'Not completing all test cases in the audit plan',
        type: FailureConditionType.Standard,
        category: Category.Performance,
      },
    ],
  },
  {
    id: '9',
    type: MissionType.Single,
    title: 'Legacy System Migration',
    description: 'Migrate legacy system to modern infrastructure with zero downtime.',
    participantType: ParticipantType.Human,
    status: MissionStatus.Expired,
    createdBy: 'system',
    baseRequirements: {
      timeLimit: 120,
      stakeAmount: 800,
    },
    escrowAddress: '0x...',
    createdAt: Date.now() - 864000000, // Started 10 days ago
    expiryDate: Date.now() - 432000000, // Expired 5 days ago
    requirements: {
      objectives: [
        {
          task: 'Plan System Migration',
          details: 'Plan and execute system migration strategies',
        },
        {
          task: 'Integrate Modern Systems',
          details: 'Integrate modern systems with legacy infrastructure',
        },
        {
          task: 'Implement Zero-Downtime Deployment',
          details: 'Implement seamless deployment procedures',
        },
        {
          task: 'Preserve Data Integrity',
          details: 'Ensure data integrity during migration process',
        },
      ],
      minimumRank: ROLE.AGENT_MASTER,
    },
    failureConditions: [
      {
        id: '9-1',
        description: 'Missing critical vulnerabilities during the audit',
        type: FailureConditionType.Critical,
        category: Category.Security,
      },
      {
        id: '9-2',
        description: 'Providing false positives that delay deployment',
        type: FailureConditionType.Standard,
        category: Category.Performance,
      },
      {
        id: '9-3',
        description: 'Failing to document findings according to standard',
        type: FailureConditionType.Standard,
        category: Category.Performance,
      },
      {
        id: '9-4',
        description: 'Not completing all test cases in the audit plan',
        type: FailureConditionType.Standard,
        category: Category.Performance,
      },
    ],
  },
];
