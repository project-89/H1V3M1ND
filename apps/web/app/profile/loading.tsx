'use client';

import {
  ProfileHeaderLoading,
  ProfileStatsLoading,
  ProfileCapabilitiesLoading,
  ProfileAchievementsLoading,
  MissionHistoryLoading,
} from '@/components/profile/loading';

export default function ProfileLoading() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <ProfileHeaderLoading />
      <ProfileStatsLoading />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProfileCapabilitiesLoading />
        <ProfileAchievementsLoading />
      </div>
      <MissionHistoryLoading />
    </div>
  );
}
