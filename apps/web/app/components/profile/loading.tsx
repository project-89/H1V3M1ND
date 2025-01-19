'use client';

import { Skeleton } from '@H1V3M1ND/ui';

export function ProfileHeaderLoading() {
  return (
    <div className="bg-cyber-dark border border-cyber-purple rounded-lg p-6 mb-8">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Skeleton className="w-20 h-20 rounded-full" />
            <div className="absolute -bottom-2 -right-2">
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-10 w-36" />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-black/20 rounded-lg p-4 border border-cyber-purple/50">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-8 w-20 mb-1" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProfileStatsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-cyber-dark border border-cyber-purple/50 rounded-lg p-4">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-8 w-24" />
        </div>
      ))}
    </div>
  );
}

export function ProfileCapabilitiesLoading() {
  return (
    <div className="bg-cyber-dark border border-cyber-purple/50 rounded-lg p-6">
      <Skeleton className="h-6 w-32 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 border border-cyber-purple/20 rounded-lg bg-black/20"
          >
            <div className="flex items-center space-x-3">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-6 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProfileAchievementsLoading() {
  return (
    <div className="bg-cyber-dark border border-cyber-purple/50 rounded-lg p-6">
      <Skeleton className="h-6 w-32 mb-4" />
      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-start space-x-4 p-4 border border-cyber-purple/20 rounded-lg bg-black/20"
          >
            <Skeleton className="w-6 h-6 rounded-full flex-shrink-0" />
            <div className="flex-grow">
              <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MissionHistoryLoading() {
  return (
    <div className="space-y-6">
      <div className="bg-black/20 rounded-lg p-4 border border-cyber-purple/50">
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-8 w-24 mb-1" />
        <Skeleton className="h-4 w-48" />
      </div>

      <div>
        <Skeleton className="h-10 w-full mb-4" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-cyber-dark border border-cyber-purple/50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="h-4 w-full mb-4" />
              <div className="grid grid-cols-3 gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
