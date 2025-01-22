'use client';

import { useEffect, useState } from 'react';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileStats } from '@/components/profile/ProfileStats';
import { ProfileCapabilities } from '@/components/profile/ProfileCapabilities';
import { ProfileAchievements } from '@/components/profile/ProfileAchievements';
import { MissionHistory } from '@/components/profile/MissionHistory';

import {
  ProfileHeaderLoading,
  ProfileStatsLoading,
  ProfileCapabilitiesLoading,
  ProfileAchievementsLoading,
  MissionHistoryLoading,
} from '@/components/profile/loading';
import { Fade, ErrorState, LoadingProgress } from '@H1V3M1ND/ui';
import { ExtendedMission, ROLE } from '@/lib/types/missions';
import { MissionType, ParticipantType } from '@/lib/types';
import { MissionStatus } from '@/lib/types/missions';
import { Achievement, AchievementRarity, AchievementType } from '@/lib/types/achievements';

interface UserSkill {
  id: string;
  name: string;
  description: string;
  // Ratings and reputation built through completed missions
  rating?: number;
  completedMissions: number;
  lastUsed?: Date;
}

// Sample data - replace with actual data fetching
const sampleProfileData = {
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
      requirements: {
        capabilities: ['Visual Effects', 'Motion Design'],
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
      duration: 72,
      reward: 1000,
      xpGained: 500,
      teamSize: 1,
      completedAt: Date.now() + 86400000 * 3, // Expected completion date
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
      requirements: {
        capabilities: ['3D Modeling', 'Visual Design'],
        minimumRank: ROLE.AGENT_FIELD,
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
      duration: 45,
      reward: 2000,
      xpGained: 750,
      teamSize: 1,
      completedAt: Date.now() - 86400000,
    },
  ] as ExtendedMission[],
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
            <ProfileHeader username={data.username} bio={data.bio} stats={data.stats} />
            <ProfileStats stats={data.stats} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ProfileCapabilities skills={data.skills} />
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
