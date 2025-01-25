import { AchievementType } from '@/lib/types/achievements';
import { AchievementRarity } from '@/lib/types/achievements';
import { Achievement } from '@/lib/types/achievements';
import { MissionStatus, MissionType, ParticipantType, ROLE } from '@/lib/types/missions';
import { ExtendedMission } from '@/lib/types/missions';
import { UserSkill } from '../types/profile';
import { VerificationType, MissionObjective, FailureRecord } from '@/lib/types/missions';

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
      id: '1',
      type: MissionType.Single,
      title: 'VFX Enhancement',
      description: 'Create particle effects and environmental enhancements for promotional video.',
      participantType: ParticipantType.Human,
      status: MissionStatus.Active,
      failureConditions: [
        {
          id: 'fc1',
          description: 'Missing required visual effects elements specified in brief',
          type: 'Critical',
          category: 'Technical',
          severity: 'High',
        },
        {
          id: 'fc2',
          description: 'Delivery after specified deadline',
          type: 'Critical',
          category: 'Performance',
          severity: 'High',
        },
        {
          id: 'fc3',
          description: 'Final output resolution below 4K standard',
          type: 'Standard',
          category: 'Technical',
          severity: 'Medium',
        },
      ],
      requirements: {
        capabilities: ['Visual Effects', 'Motion Design'],
        minimumRank: ROLE.AGENT_SENIOR,
        objectives: [
          {
            task: 'Create particle system for energy effects',
            details: 'Design and implement dynamic particle system for energy flow visualization',
            completed: false,
          },
          {
            task: 'Environmental atmosphere enhancements',
            details: 'Add volumetric lighting and atmospheric effects to enhance scene depth',
            completed: false,
          },
          {
            task: 'Final composition and color grading',
            details: 'Combine all elements and apply color grading according to style guide',
            completed: false,
          },
        ],
      },
      objectives: [
        {
          task: 'Create particle system for energy effects',
          details: 'Design and implement dynamic particle system for energy flow visualization',
          completed: false,
        },
        {
          task: 'Environmental atmosphere enhancements',
          details: 'Add volumetric lighting and atmospheric effects to enhance scene depth',
          completed: false,
        },
        {
          task: 'Final composition and color grading',
          details: 'Combine all elements and apply color grading according to style guide',
          completed: false,
        },
      ],
      baseRequirements: {
        timeLimit: 72,
        stakeAmount: 1000,
      },
      createdAt: Date.now() - 86400000,
      expiryDate: Date.now() + 30 * 1000, // 30 seconds remaining
      escrowAddress: '0x1234...5678',
      createdBy: '0xabcd...efgh',
      duration: 72,
      reward: 1000,
      xpGained: 500,
      teamSize: 1,
      completedAt: Date.now() + 86400000 * 3, // Expected completion date
    },
    {
      id: 'am-2',
      type: MissionType.Multi,
      title: 'Neural Network Training',
      description:
        'Develop and train a specialized neural network for real-time video processing with focus on optimization.',
      participantType: ParticipantType.Agent,
      status: MissionStatus.Active,
      failureConditions: [
        {
          id: 'fc1',
          description: 'Model accuracy falls below 95% benchmark',
          type: 'Critical',
          category: 'Performance',
          severity: 'High',
        },
        {
          id: 'fc2',
          description: 'Processing latency exceeds 50ms',
          type: 'Critical',
          category: 'Technical',
          severity: 'High',
        },
      ],
      requirements: {
        capabilities: ['Machine Learning', 'Python', 'PyTorch'],
        minimumRank: ROLE.AGENT_SENIOR,
        objectives: [
          {
            task: 'Dataset Preparation',
            details: 'Curate and preprocess training dataset',
            completed: true,
            verifiedAt: Date.now() - 43200000,
          },
          {
            task: 'Model Architecture',
            details: 'Design and implement neural network architecture',
            completed: false,
          },
          {
            task: 'Training Pipeline',
            details: 'Set up distributed training pipeline',
            completed: false,
          },
        ],
      },
      objectives: [
        {
          task: 'Dataset Preparation',
          details: 'Curate and preprocess training dataset',
          completed: true,
          verifiedAt: Date.now() - 43200000,
        },
        {
          task: 'Model Architecture',
          details: 'Design and implement neural network architecture',
          completed: false,
        },
        {
          task: 'Training Pipeline',
          details: 'Set up distributed training pipeline',
          completed: false,
        },
      ],
      baseRequirements: {
        timeLimit: 96,
        stakeAmount: 2500,
      },
      createdAt: Date.now() - 172800000,
      expiryDate: Date.now() + 5 * 60 * 1000, // 5 minutes remaining
      escrowAddress: '0x5678...9012',
      createdBy: '0xefgh...ijkl',
      duration: 96,
      reward: 2500,
      xpGained: 1000,
      teamSize: 3,
      completedAt: Date.now() + 172800000,
    },
    {
      id: 'am-3',
      type: MissionType.Single,
      title: 'Smart Contract Audit',
      description:
        'Perform comprehensive security audit of DeFi protocol smart contracts including vulnerability assessment and optimization recommendations.',
      participantType: ParticipantType.Agent,
      status: MissionStatus.Active,
      failureConditions: [
        {
          id: 'fc1',
          description: 'Critical vulnerabilities missed in audit',
          type: 'Critical',
          category: 'Security',
          severity: 'High',
        },
      ],
      requirements: {
        capabilities: ['Solidity', 'Security Auditing', 'DeFi'],
        minimumRank: ROLE.AGENT_MASTER,
        objectives: [
          {
            task: 'Static Analysis',
            details: 'Run automated tools and analyze results',
            completed: true,
            verifiedAt: Date.now() - 21600000,
          },
          {
            task: 'Manual Review',
            details: 'In-depth manual code review and testing',
            completed: false,
          },
          {
            task: 'Gas Optimization',
            details: 'Identify gas optimization opportunities',
            completed: false,
          },
        ],
      },
      objectives: [
        {
          task: 'Static Analysis',
          details: 'Run automated tools and analyze results',
          completed: true,
          verifiedAt: Date.now() - 21600000,
        },
        {
          task: 'Manual Review',
          details: 'In-depth manual code review and testing',
          completed: false,
        },
        {
          task: 'Gas Optimization',
          details: 'Identify gas optimization opportunities',
          completed: false,
        },
      ],
      baseRequirements: {
        timeLimit: 48,
        stakeAmount: 3000,
      },
      createdAt: Date.now() - 43200000,
      expiryDate: Date.now() + 45 * 60 * 1000, // 45 minutes remaining
      escrowAddress: '0x3456...7890',
      createdBy: '0xmnop...qrst',
      duration: 48,
      reward: 3000,
      xpGained: 1500,
      teamSize: 1,
      completedAt: Date.now() + 129600000,
    },
    {
      id: 'am-4',
      type: MissionType.Multi,
      title: 'Quantum Algorithm Optimization',
      description:
        'Optimize quantum computing algorithms for improved error correction and qubit efficiency in partnership with quantum hardware specialists.',
      participantType: ParticipantType.Agent,
      status: MissionStatus.Active,
      failureConditions: [
        {
          id: 'fc1',
          description: 'Error correction rate below 99.9%',
          type: 'Critical',
          category: 'Performance',
          severity: 'High',
        },
        {
          id: 'fc2',
          description: 'Qubit coherence time degradation',
          type: 'Critical',
          category: 'Technical',
          severity: 'High',
        },
      ],
      requirements: {
        capabilities: ['Quantum Computing', 'Algorithm Design', 'Physics'],
        minimumRank: ROLE.AGENT_MASTER,
        objectives: [
          {
            task: 'Error Correction Analysis',
            details:
              'Analyze current error correction methods and identify optimization opportunities',
            completed: true,
            verifiedAt: Date.now() - 10800000,
          },
          {
            task: 'Algorithm Redesign',
            details: 'Implement new error correction algorithms with improved efficiency',
            completed: false,
          },
          {
            task: 'Hardware Integration',
            details: 'Work with quantum hardware team to implement optimizations',
            completed: false,
          },
        ],
      },
      objectives: [
        {
          task: 'Error Correction Analysis',
          details:
            'Analyze current error correction methods and identify optimization opportunities',
          completed: true,
          verifiedAt: Date.now() - 10800000,
        },
        {
          task: 'Algorithm Redesign',
          details: 'Implement new error correction algorithms with improved efficiency',
          completed: false,
        },
        {
          task: 'Hardware Integration',
          details: 'Work with quantum hardware team to implement optimizations',
          completed: false,
        },
      ],
      baseRequirements: {
        timeLimit: 120,
        stakeAmount: 5000,
      },
      createdAt: Date.now() - 86400000,
      expiryDate: Date.now() + 12 * 60 * 60 * 1000, // 12 hours remaining
      escrowAddress: '0x7890...1234',
      createdBy: '0xuvwx...yz12',
      duration: 120,
      reward: 5000,
      xpGained: 2000,
      teamSize: 4,
      completedAt: Date.now() + 432000000,
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
          type: 'Critical',
          category: 'Technical',
          severity: 'High',
        },
        {
          id: 'fc2',
          description: 'Assets not compatible with target engine',
          type: 'Critical',
          category: 'Technical',
          severity: 'High',
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
      expiryDate: Date.now() - 86400000,
      escrowAddress: '0x9876...4321',
      createdBy: '0xijkl...mnop',
      duration: 45,
      reward: 2000,
      xpGained: 750,
      teamSize: 1,
      completedAt: Date.now() - 86400000,
    },
  ] as ExtendedMission[],
  totalEarned: 15000,
};
