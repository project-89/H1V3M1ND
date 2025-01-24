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
import { profileData as sampleProfileData } from '@/lib/examples/profile';
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
        <div className="container mx-auto px-4">
          <ErrorState title="Failed to Load Profile" message={error.message} onRetry={loadData} />
        </div>
      ) : (
        <div className="container mx-auto px-4 space-y-8 relative">
          {!isLoading && (
            <Fade show={true} className="space-y-8">
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
          )}

          {isLoading && (
            <Fade show={true} className="space-y-8">
              <ProfileHeaderLoading />
              <ProfileStatsLoading />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ProfileCapabilitiesLoading />
                <ProfileAchievementsLoading />
              </div>
              <MissionHistoryLoading />
            </Fade>
          )}
        </div>
      )}
    </>
  );
}
