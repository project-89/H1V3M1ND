'use client';

import { useEffect, useState } from 'react';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileStats } from '@/components/profile/ProfileStats';
import { ProfileCapabilities } from '@/components/profile/ProfileCapabilities';
import { ProfileAchievements } from '@/components/profile/ProfileAchievements';
import { MissionHistory } from '@/components/profile/MissionHistory';
import {
  Mission,
  MissionStatus,
  MissionType,
  ParticipantType,
  MissionScale,
  ROLE,
  SingleParticipantMission,
} from '@/lib/types';
import {
  ProfileHeaderLoading,
  ProfileStatsLoading,
  ProfileCapabilitiesLoading,
  ProfileAchievementsLoading,
  MissionHistoryLoading,
} from '@/components/profile/loading';
import { Fade } from '@/components/ui/fade';
import { ErrorState } from '@/components/ui/error-state';
import { LoadingProgress } from '@/components/ui/loading-progress';

// Sample data - replace with actual data fetching
const sampleProfileData = {
  username: 'CyberAgent_42',
  stats: {
    completedMissions: 12,
    successRate: 92,
    totalStaked: 25000,
    reputation: 850,
    rank: 5,
  },
  capabilities: [
    { name: 'Neural Networks', level: 8, category: 'ai' as const },
    { name: 'Smart Contracts', level: 7, category: 'development' as const },
    { name: 'Penetration Testing', level: 6, category: 'security' as const },
    { name: 'Distributed Systems', level: 7, category: 'network' as const },
    { name: 'Data Analysis', level: 5, category: 'ai' as const },
    { name: 'Protocol Design', level: 6, category: 'development' as const },
  ],
  achievements: [
    {
      id: '1',
      title: 'Neural Network Master',
      description: 'Successfully trained 10 advanced neural networks with exceptional accuracy.',
      type: 'skill' as const,
      rarity: 'legendary' as const,
      earnedAt: Date.now() - 604800000, // 1 week ago
    },
    {
      id: '2',
      title: 'Security Sentinel',
      description: 'Identified and patched critical vulnerabilities in blockchain protocols.',
      type: 'milestone' as const,
      rarity: 'epic' as const,
      earnedAt: Date.now() - 1209600000, // 2 weeks ago
    },
    {
      id: '3',
      title: 'First Mission Complete',
      description: 'Successfully completed your first mission in record time.',
      type: 'milestone' as const,
      rarity: 'common' as const,
      earnedAt: Date.now() - 2592000000, // 1 month ago
    },
  ],
  activeMissions: [
    {
      id: '1',
      type: MissionType.Single,
      title: 'Neural Network Training',
      description:
        'Train a specialized neural network for pattern recognition in encrypted data streams.',
      participantType: ParticipantType.Agent,
      scale: MissionScale.Solo,
      status: MissionStatus.Active,
      requirements: {
        capabilities: ['Neural Networks', 'Pattern Recognition'],
        minimumRank: ROLE.AGENT_SENIOR,
      },
      baseRequirements: {
        timeLimit: 72,
        stakeAmount: 1000,
      },
      createdAt: Date.now() - 86400000,
      expiryDate: Date.now() + 86400000 * 3,
      escrowAddress: '0x1234...5678',
      createdBy: '0xabcd...efgh',
      failureConditions: [],
    } as SingleParticipantMission,
  ],
  completedMissions: [
    {
      id: '2',
      type: MissionType.Single,
      title: 'Security Protocol Audit',
      description: 'Conduct a thorough security audit of a new blockchain protocol.',
      participantType: ParticipantType.Human,
      scale: MissionScale.Party,
      status: MissionStatus.Completed,
      requirements: {
        capabilities: ['Security Auditing', 'Blockchain'],
        minimumRank: ROLE.AGENT_MASTER,
      },
      baseRequirements: {
        timeLimit: 48,
        stakeAmount: 2000,
      },
      createdAt: Date.now() - 172800000,
      expiryDate: Date.now() - 86400000,
      escrowAddress: '0x9876...4321',
      createdBy: '0xijkl...mnop',
      failureConditions: [],
    } as SingleParticipantMission,
  ],
  totalEarned: 15000,
};

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState(sampleProfileData);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate random error (1 in 4 chance)
      if (Math.random() < 0.25) {
        throw new Error('Failed to load profile data');
      }

      setData(sampleProfileData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <LoadingProgress isLoading={isLoading} />

      {error ? (
        <div className="container mx-auto px-4 py-8">
          <ErrorState title="Failed to Load Profile" message={error.message} onRetry={loadData} />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8 space-y-8">
          <Fade show={!isLoading} className="space-y-8">
            <ProfileHeader username={data.username} stats={data.stats} />
            <ProfileStats stats={data.stats} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ProfileCapabilities capabilities={data.capabilities} />
              <ProfileAchievements achievements={data.achievements} />
            </div>
            <MissionHistory
              activeMissions={data.activeMissions}
              completedMissions={data.completedMissions}
              totalEarned={data.totalEarned}
            />
          </Fade>

          <Fade show={isLoading} className="space-y-8">
            <ProfileHeaderLoading />
            <ProfileStatsLoading />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ProfileCapabilitiesLoading />
              <ProfileAchievementsLoading />
            </div>
            <MissionHistoryLoading />
          </Fade>
        </div>
      )}
    </>
  );
}
