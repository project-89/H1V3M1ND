import {
  Achievement,
  AchievementRarity,
  AchievementType,
  ExtendedMission,
  MissionStatus,
  MissionType,
  ParticipantType,
  ROLE,
  VerificationType,
  FailureConditionCategory,
  FailureConditionType,
  UserSkill,
} from '@H1V3M1ND/types';

// Sample data - replace with actual data fetching
export const profileData = {
  username: 'CyberAgent_42',
  bio: 'Specializing in visual effects and motion design with expertise in After Effects and Cinema 4D.',
  stats: {
    completedMissions: 12,
    successRate: 92,
    totalStaked: 25000,
    reputation: 850,
  },
  skills: [
    {
      id: '1',
      name: 'Motion Design',
      description:
        'Expert in creating fluid animations and transitions using After Effects and Cinema 4D',
      rating: 4.8,
      completedMissions: 8,
      lastUsed: new Date(Date.now() - 86400000), // 1 day ago
    },
    {
      id: '2',
      name: 'Visual Effects',
      description: 'Specializing in particle systems and environmental effects for digital content',
      rating: 4.5,
      completedMissions: 6,
      lastUsed: new Date(Date.now() - 172800000), // 2 days ago
    },
    {
      id: '3',
      name: '3D Modeling',
      description: 'Creating detailed 3D assets and environments in Cinema 4D and Blender',
      rating: 4.2,
      completedMissions: 4,
      lastUsed: new Date(Date.now() - 432000000), // 5 days ago
    },
  ] as UserSkill[],
  achievements: [
    {
      id: '1',
      title: 'First Mission Complete',
      description: 'Successfully completed your first mission in the network.',
      type: AchievementType.Milestone,
      rarity: AchievementRarity.Common,
      imageUrl: '/achievements/first-mission.png',
      unlockedAt: new Date(Date.now() - 2592000000), // 30 days ago
      rewards: {
        xp: 100,
        tokens: 50,
      },
    },
    {
      id: '2',
      title: 'Rising Star',
      description: 'Complete 5 missions with a rating of 4.5 or higher.',
      type: AchievementType.Progress,
      rarity: AchievementRarity.Rare,
      imageUrl: '/achievements/rising-star.png',
      unlockedAt: new Date(Date.now() - 604800000), // 7 days ago
      progress: {
        current: 3,
        target: 5,
      },
      rewards: {
        xp: 500,
        tokens: 200,
        badges: ['quality-focused'],
      },
    },
    {
      id: '3',
      title: 'VFX Master',
      description: 'Achieve a 4.8+ rating in Visual Effects skills.',
      type: AchievementType.Skill,
      rarity: AchievementRarity.Epic,
      imageUrl: '/achievements/vfx-master.png',
      unlockedAt: new Date(Date.now() - 86400000), // 1 day ago
      rewards: {
        xp: 1000,
        tokens: 500,
        badges: ['vfx-expert'],
      },
    },
  ] as Achievement[],
  activeMissions: [
    {
      id: 'am-1',
      type: MissionType.Single,
      title: 'Neural Network Training',
      description:
        'Train and optimize neural networks for improved pattern recognition in cybersecurity applications.',
      status: MissionStatus.Active,
      teamSize: 1,
      duration: 24, // 24 hours
      reward: 2500,
      xpGained: 1000,
      createdAt: Date.now() - 20 * 60 * 60 * 1000, // Created 20 hours ago
      startedAt: Date.now() - 20 * 60 * 60 * 1000, // Started immediately after creation
      expiryDate: Date.now() + 4 * 60 * 60 * 1000, // 4 hours remaining (should be yellow)
      objectives: [
        {
          id: 'nn-1',
          task: 'Data Preprocessing',
          details: 'Clean and normalize training data for neural network input',
          completed: true,
          verifiedAt: Date.now() - 18 * 60 * 60 * 1000,
          verification: {
            type: VerificationType.Document,
            description: 'Upload preprocessed dataset and normalization report',
            required: true,
            metadata: {
              allowedFileTypes: ['.csv', '.json', '.pdf'],
            },
          },
        },
        {
          id: 'nn-2',
          task: 'Model Architecture Design',
          details: 'Design and implement neural network architecture with specified layers',
          completed: true,
          verifiedAt: Date.now() - 15 * 60 * 60 * 1000,
          verification: {
            type: VerificationType.Code,
            description: 'Submit model architecture code and diagram',
            required: true,
            metadata: {
              allowedFileTypes: ['.py', '.ipynb', '.png'],
            },
          },
        },
        {
          id: 'nn-3',
          task: 'Training Pipeline',
          details: 'Set up distributed training pipeline with performance monitoring',
          completed: false,
          verification: {
            type: VerificationType.Code,
            description: 'Submit training pipeline code and configuration',
            required: true,
            metadata: {
              allowedFileTypes: ['.py', '.yaml', '.json'],
            },
          },
        },
        {
          id: 'nn-4',
          task: 'Optimization & Testing',
          details: 'Optimize model parameters and conduct performance testing',
          completed: false,
          verification: {
            type: VerificationType.Document,
            description: 'Upload performance test results and optimization report',
            required: true,
            metadata: {
              allowedFileTypes: ['.pdf', '.json', '.csv'],
            },
          },
        },
      ],
      failureConditions: [
        {
          id: 'fc-nn-1',
          description: 'Model accuracy drops below 95% on validation set',
          type: FailureConditionType.Critical,
          category: FailureConditionCategory.Performance,
          severity: FailureConditionType.Critical,
        },
        {
          id: 'fc-nn-2',
          description: 'Training time exceeds 20 hours',
          type: FailureConditionType.Critical,
          category: FailureConditionCategory.Performance,
          severity: FailureConditionType.Standard,
        },
        {
          id: 'fc-nn-3',
          description: 'Memory usage exceeds allocated resources',
          type: FailureConditionType.Critical,
          category: FailureConditionCategory.Technical,
          severity: FailureConditionType.Critical,
        },
      ],
      requirements: {
        capabilities: ['Machine Learning', 'Python'],
        minimumRank: ROLE.AGENT_SENIOR,
        objectives: [],
      },
      baseRequirements: {
        timeLimit: 24,
        stakeAmount: 2500,
      },
      escrowAddress: '0x1234...5678',
      createdBy: '0xabcd...efgh',
      completedAt: 0,
      participantType: ParticipantType.Human,
    },
    {
      id: 'am-2',
      type: MissionType.Multi,
      title: 'Smart Contract Audit',
      description:
        'Conduct a comprehensive security audit of smart contracts for potential vulnerabilities.',
      status: MissionStatus.Active,
      teamSize: 2,
      duration: 48, // 48 hours
      reward: 3500,
      xpGained: 1500,
      createdAt: Date.now() - 12 * 60 * 60 * 1000, // Created 12 hours ago
      startedAt: Date.now() - 12 * 60 * 60 * 1000, // Started immediately after creation
      expiryDate: Date.now() + 36 * 60 * 60 * 1000, // 36 hours remaining (should be green)
      objectives: [
        {
          id: 'sc-1',
          task: 'Static Analysis',
          details: 'Run automated security analysis tools on smart contract code',
          completed: true,
          verifiedAt: Date.now() - 10 * 60 * 60 * 1000,
          verification: {
            type: VerificationType.Document,
            description: 'Upload static analysis report',
            required: true,
            metadata: {
              allowedFileTypes: ['.pdf', '.html', '.json'],
            },
          },
        },
        {
          id: 'sc-2',
          task: 'Manual Code Review',
          details: 'Perform line-by-line code review of critical contract functions',
          completed: true,
          verifiedAt: Date.now() - 8 * 60 * 60 * 1000,
          verification: {
            type: VerificationType.Document,
            description: 'Submit detailed code review report',
            required: true,
            metadata: {
              allowedFileTypes: ['.pdf', '.md'],
            },
          },
        },
        {
          id: 'sc-3',
          task: 'Vulnerability Testing',
          details: 'Test for common attack vectors and potential exploits',
          completed: false,
          verification: {
            type: VerificationType.Code,
            description: 'Submit test suite and vulnerability report',
            required: true,
            metadata: {
              allowedFileTypes: ['.js', '.ts', '.pdf'],
            },
          },
        },
        {
          id: 'sc-4',
          task: 'Gas Optimization',
          details: 'Optimize contract for gas efficiency without compromising security',
          completed: false,
          verification: {
            type: VerificationType.Code,
            description: 'Submit optimized contract code and gas analysis',
            required: true,
            metadata: {
              allowedFileTypes: ['.sol', '.pdf'],
            },
          },
        },
      ],
      failureConditions: [
        {
          id: 'fc-sc-1',
          description: 'Critical vulnerability found in production',
          type: FailureConditionType.Critical,
          category: FailureConditionCategory.Security,
          severity: FailureConditionType.Critical,
        },
        {
          id: 'fc-sc-2',
          description: 'Gas optimization reduces below target threshold',
          type: FailureConditionType.Standard,
          category: FailureConditionCategory.Performance,
          severity: FailureConditionType.Standard,
        },
        {
          id: 'fc-sc-3',
          description: 'Contract fails integration tests',
          type: FailureConditionType.Critical,
          category: FailureConditionCategory.Technical,
          severity: FailureConditionType.Critical,
        },
      ],
      requirements: {
        minParticipants: 2,
        maxParticipants: 4,
        capabilities: ['Solidity', 'Security'],
        composition: {
          humans: 1,
          agents: 1,
        },
      },
      baseRequirements: {
        timeLimit: 48,
        stakeAmount: 3500,
      },
      escrowAddress: '0x2345...6789',
      createdBy: '0xbcde...fghi',
      completedAt: 0,
    },
    {
      id: 'am-3',
      type: MissionType.Single,
      title: 'VFX Enhancement',
      description: 'Enhance visual effects for the latest cyberpunk game release.',
      status: MissionStatus.Active,
      teamSize: 3,
      duration: 12, // 12 hours
      reward: 1800,
      xpGained: 800,
      createdAt: Date.now() - 11 * 60 * 60 * 1000, // Created 11 hours ago
      startedAt: Date.now() - 11 * 60 * 60 * 1000, // Started immediately after creation
      expiryDate: Date.now() + 1 * 60 * 60 * 1000, // 1 hour remaining (should be red)
      objectives: [
        {
          id: 'vfx-1',
          task: 'Particle System Design',
          details: 'Create advanced particle systems for environmental effects',
          completed: true,
          verifiedAt: Date.now() - 9 * 60 * 60 * 1000,
          verification: {
            type: VerificationType.Video,
            description: 'Upload particle system demo video',
            required: true,
            metadata: {
              maxVideoLength: 120,
            },
          },
        },
        {
          id: 'vfx-2',
          task: 'Animation Integration',
          details: 'Integrate particle animations with game engine events',
          completed: true,
          verifiedAt: Date.now() - 6 * 60 * 60 * 1000,
          verification: {
            type: VerificationType.Video,
            description: 'Upload integration test video',
            required: true,
            metadata: {
              maxVideoLength: 180,
            },
          },
        },
        {
          id: 'vfx-3',
          task: 'Performance Optimization',
          details: 'Optimize effects for target platform specifications',
          completed: false,
          verification: {
            type: VerificationType.MultiPhoto,
            description: 'Submit before/after screenshots and performance data',
            required: true,
            metadata: {
              minPhotos: 4,
              maxPhotos: 8,
            },
          },
        },
      ],
      failureConditions: [
        {
          id: 'fc-vfx-1',
          description: 'Frame rate drops below 60fps on target platform',
          type: FailureConditionType.Critical,
          category: FailureConditionCategory.Performance,
          severity: FailureConditionType.Critical,
        },
        {
          id: 'fc-vfx-2',
          description: 'Particle effects exceed memory budget',
          type: FailureConditionType.Standard,
          category: FailureConditionCategory.Technical,
          severity: FailureConditionType.Standard,
        },
        {
          id: 'fc-vfx-3',
          description: 'Visual artifacts present in final render',
          type: FailureConditionType.Critical,
          category: FailureConditionCategory.Technical,
          severity: FailureConditionType.Critical,
        },
      ],
      requirements: {
        capabilities: ['Visual Effects', 'Motion Design'],
        minimumRank: ROLE.AGENT_SENIOR,
        objectives: [],
      },
      baseRequirements: {
        timeLimit: 12,
        stakeAmount: 1800,
      },
      escrowAddress: '0x3456...7890',
      createdBy: '0xcdef...ghij',
      completedAt: 0,
      participantType: ParticipantType.Human,
    },
    {
      id: 'am-4',
      type: MissionType.Multi,
      title: 'Quantum Algorithm Optimization',
      description:
        'Optimize quantum computing algorithms for improved error correction and qubit efficiency.',
      status: MissionStatus.Active,
      teamSize: 4,
      duration: 72, // 72 hours
      reward: 5000,
      xpGained: 2000,
      createdAt: Date.now() - 48 * 60 * 60 * 1000, // Created 48 hours ago
      startedAt: Date.now() - 48 * 60 * 60 * 1000, // Started immediately after creation
      expiryDate: Date.now() + 24 * 60 * 60 * 1000, // 24 hours remaining (should be yellow-green)
      objectives: [
        {
          id: 'qc-1',
          task: 'Algorithm Analysis',
          details: 'Analyze current quantum algorithms for optimization opportunities',
          completed: true,
          verifiedAt: Date.now() - 40 * 60 * 60 * 1000,
          verification: {
            type: VerificationType.Document,
            description: 'Submit algorithm analysis report',
            required: true,
            metadata: {
              allowedFileTypes: ['.pdf', '.tex'],
            },
          },
        },
        {
          id: 'qc-2',
          task: 'Error Correction Implementation',
          details: 'Implement improved error correction mechanisms',
          completed: true,
          verifiedAt: Date.now() - 36 * 60 * 60 * 1000,
          verification: {
            type: VerificationType.Code,
            description: 'Submit error correction implementation',
            required: true,
            metadata: {
              allowedFileTypes: ['.py', '.cpp', '.qasm'],
            },
          },
        },
        {
          id: 'qc-3',
          task: 'Qubit Efficiency Optimization',
          details: 'Optimize qubit utilization and reduce decoherence',
          completed: false,
          verification: {
            type: VerificationType.Document,
            description: 'Upload optimization results and measurements',
            required: true,
            metadata: {
              allowedFileTypes: ['.pdf', '.csv', '.json'],
            },
          },
        },
        {
          id: 'qc-4',
          task: 'Integration Testing',
          details: 'Test optimized algorithms on quantum hardware',
          completed: false,
          verification: {
            type: VerificationType.Document,
            description: 'Submit integration test results and analysis',
            required: true,
            metadata: {
              allowedFileTypes: ['.pdf', '.json', '.csv'],
            },
          },
        },
      ],
      failureConditions: [
        {
          id: 'fc-qa-1',
          description: 'Quantum error rate exceeds acceptable threshold',
          type: FailureConditionType.Critical,
          category: FailureConditionCategory.Performance,
          severity: FailureConditionType.Critical,
        },
        {
          id: 'fc-qa-2',
          description: 'Decoherence time below minimum requirement',
          type: FailureConditionType.Critical,
          category: FailureConditionCategory.Technical,
          severity: FailureConditionType.Critical,
        },
        {
          id: 'fc-qa-3',
          description: 'Algorithm fails to demonstrate quantum advantage',
          type: FailureConditionType.Standard,
          category: FailureConditionCategory.Performance,
          severity: FailureConditionType.Standard,
        },
      ],
      requirements: {
        minParticipants: 4,
        maxParticipants: 6,
        capabilities: ['Quantum Computing', 'Algorithm Design'],
        composition: {
          humans: 2,
          agents: 2,
        },
      },
      baseRequirements: {
        timeLimit: 72,
        stakeAmount: 5000,
      },
      escrowAddress: '0x4567...8901',
      createdBy: '0xdefg...hijk',
      completedAt: 0,
    },
  ] as ExtendedMission[],
  completedMissions: [
    {
      id: '2',
      type: MissionType.Single,
      title: '3D Asset Creation',
      description: 'Design and model 3D assets for virtual environment.',
      participantType: ParticipantType.Human,
      status: MissionStatus.Completed,
      failureConditions: [
        {
          id: 'fc1',
          description: 'Model topology does not meet optimization requirements',
          type: FailureConditionType.Critical,
          category: FailureConditionCategory.Technical,
          severity: FailureConditionType.Critical,
        },
        {
          id: 'fc2',
          description: 'Assets not compatible with target engine',
          type: FailureConditionType.Critical,
          category: FailureConditionCategory.Technical,
          severity: FailureConditionType.Critical,
        },
      ],
      requirements: {
        capabilities: ['3D Modeling', 'Visual Design'],
        minimumRank: ROLE.AGENT_FIELD,
        objectives: [
          {
            task: 'Create base 3D models',
            details: 'Model core assets following provided concept art',
            completed: true,
            verifiedAt: Date.now() - 95400000,
          },
          {
            task: 'UV unwrapping and texturing',
            details: 'Create efficient UV layouts and apply textures',
            completed: true,
            verifiedAt: Date.now() - 90000000,
          },
        ],
      },
      objectives: [
        {
          task: 'Create base 3D models',
          details: 'Model core assets following provided concept art',
          completed: true,
          verifiedAt: Date.now() - 95400000,
        },
        {
          task: 'UV unwrapping and texturing',
          details: 'Create efficient UV layouts and apply textures',
          completed: true,
          verifiedAt: Date.now() - 90000000,
        },
      ],
      baseRequirements: {
        timeLimit: 48,
        stakeAmount: 2000,
      },
      createdAt: Date.now() - 172800000,
      startedAt: Date.now() - 172800000,
      completedAt: Date.now() - 86400000,
      expiryDate: Date.now() - 86400000,
      escrowAddress: '0x9876...4321',
      createdBy: '0xijkl...mnop',
      duration: 45,
      reward: 2000,
      xpGained: 750,
      teamSize: 1,
    },
    // Example failed mission 1
    {
      id: 'fm-1',
      type: MissionType.Single,
      title: 'Quantum Circuit Optimization',
      description: 'Optimize quantum circuits for improved qubit efficiency.',
      participantType: ParticipantType.Human,
      status: MissionStatus.Failed,
      failureConditions: [
        {
          id: 'fc1',
          description: 'Circuit optimization did not meet efficiency targets',
          type: FailureConditionType.Critical,
          category: FailureConditionCategory.Performance,
          severity: FailureConditionType.Critical,
        },
      ],
      requirements: {
        capabilities: ['Quantum Computing', 'Circuit Design'],
        minimumRank: ROLE.AGENT_SENIOR,
        objectives: [
          {
            id: 'qo-1',
            task: 'Circuit Analysis',
            details: 'Analyze current quantum circuit implementation',
            completed: true,
            verifiedAt: Date.now() - 250200000,
          },
          {
            id: 'qo-2',
            task: 'Optimization Implementation',
            details: 'Implement circuit optimizations for improved efficiency',
            completed: false,
          },
          {
            id: 'qo-3',
            task: 'Efficiency Testing',
            details: 'Test and verify efficiency improvements',
            completed: false,
          },
        ],
      },
      objectives: [
        {
          id: 'qo-1',
          task: 'Circuit Analysis',
          details: 'Analyze current quantum circuit implementation',
          completed: true,
          verifiedAt: Date.now() - 250200000,
        },
        {
          id: 'qo-2',
          task: 'Optimization Implementation',
          details: 'Implement circuit optimizations for improved efficiency',
          completed: false,
        },
        {
          id: 'qo-3',
          task: 'Efficiency Testing',
          details: 'Test and verify efficiency improvements',
          completed: false,
        },
      ],
      baseRequirements: {
        timeLimit: 48,
        stakeAmount: 3000,
      },
      createdAt: Date.now() - 259200000, // 3 days ago
      startedAt: Date.now() - 259200000,
      failedAt: Date.now() - 172800000, // Failed 2 days ago
      completedAt: Date.now() - 172800000,
      expiryDate: Date.now() - 172800000,
      escrowAddress: '0xaaaa...bbbb',
      createdBy: '0xcccc...dddd',
      duration: 48,
      reward: 3000,
      xpGained: 0,
      teamSize: 1,
    },
    // Example failed mission 2
    {
      id: 'fm-2',
      type: MissionType.Multi,
      title: 'AI Model Integration',
      description: 'Integrate machine learning models into production environment.',
      status: MissionStatus.Failed,
      failureConditions: [
        {
          id: 'fc1',
          description: 'Integration tests failed to meet performance benchmarks',
          type: FailureConditionType.Critical,
          category: FailureConditionCategory.Technical,
          severity: FailureConditionType.Critical,
        },
      ],
      requirements: {
        minParticipants: 3,
        maxParticipants: 5,
        capabilities: ['Machine Learning', 'DevOps'],
        composition: {
          humans: 2,
          agents: 1,
        },
      },
      objectives: [
        {
          id: 'ai-1',
          task: 'Environment Setup',
          details: 'Set up production environment for model deployment',
          completed: true,
          verifiedAt: Date.now() - 420000000,
        },
        {
          id: 'ai-2',
          task: 'Model Integration',
          details: 'Integrate ML models with existing infrastructure',
          completed: true,
          verifiedAt: Date.now() - 410000000,
        },
        {
          id: 'ai-3',
          task: 'Performance Testing',
          details: 'Conduct comprehensive performance testing',
          completed: false,
        },
        {
          id: 'ai-4',
          task: 'Load Balancing',
          details: 'Implement load balancing for distributed inference',
          completed: false,
        },
      ],
      baseRequirements: {
        timeLimit: 72,
        stakeAmount: 4000,
      },
      createdAt: Date.now() - 432000000, // 5 days ago
      startedAt: Date.now() - 432000000,
      failedAt: Date.now() - 345600000, // Failed 4 days ago
      completedAt: Date.now() - 345600000,
      expiryDate: Date.now() - 345600000,
      escrowAddress: '0xeeee...ffff',
      createdBy: '0xgggg...hhhh',
      duration: 72,
      reward: 4000,
      xpGained: 0,
      teamSize: 3,
    },
    // Example failed mission 3
    {
      id: 'fm-3',
      type: MissionType.Single,
      title: 'Zero-Day Vulnerability Analysis',
      description: 'Analyze and patch critical zero-day vulnerabilities in blockchain protocol.',
      participantType: ParticipantType.Human,
      status: MissionStatus.Failed,
      failureConditions: [
        {
          id: 'fc1',
          description: 'Failed to identify all critical attack vectors',
          type: FailureConditionType.Critical,
          category: FailureConditionCategory.Security,
          severity: FailureConditionType.Critical,
        },
        {
          id: 'fc2',
          description: 'Patch implementation introduced new vulnerabilities',
          type: FailureConditionType.Critical,
          category: FailureConditionCategory.Security,
          severity: FailureConditionType.Critical,
        },
      ],
      requirements: {
        capabilities: ['Security Analysis', 'Blockchain', 'Smart Contracts'],
        minimumRank: ROLE.AGENT_SENIOR,
        objectives: [
          {
            id: 'zd-1',
            task: 'Vulnerability Scanning',
            details: 'Scan protocol for potential vulnerabilities',
            completed: true,
            verifiedAt: Date.now() - 160000000,
          },
          {
            id: 'zd-2',
            task: 'Attack Vector Analysis',
            details: 'Analyze and document possible attack vectors',
            completed: false,
          },
          {
            id: 'zd-3',
            task: 'Patch Development',
            details: 'Develop and test security patches',
            completed: false,
          },
          {
            id: 'zd-4',
            task: 'Security Verification',
            details: 'Verify patch effectiveness and security',
            completed: false,
          },
        ],
      },
      objectives: [
        {
          id: 'zd-1',
          task: 'Vulnerability Scanning',
          details: 'Scan protocol for potential vulnerabilities',
          completed: true,
          verifiedAt: Date.now() - 160000000,
        },
        {
          id: 'zd-2',
          task: 'Attack Vector Analysis',
          details: 'Analyze and document possible attack vectors',
          completed: false,
        },
        {
          id: 'zd-3',
          task: 'Patch Development',
          details: 'Develop and test security patches',
          completed: false,
        },
        {
          id: 'zd-4',
          task: 'Security Verification',
          details: 'Verify patch effectiveness and security',
          completed: false,
        },
      ],
      baseRequirements: {
        timeLimit: 24,
        stakeAmount: 5000,
      },
      createdAt: Date.now() - 172800000, // 2 days ago
      startedAt: Date.now() - 172800000,
      failedAt: Date.now() - 86400000, // Failed 1 day ago
      completedAt: Date.now() - 86400000,
      expiryDate: Date.now() - 86400000,
      escrowAddress: '0xdddd...eeee',
      createdBy: '0xffff...0000',
      duration: 24,
      reward: 5000,
      xpGained: 0,
      teamSize: 1,
    },
  ] as ExtendedMission[],
  totalEarned: 15000,
};
