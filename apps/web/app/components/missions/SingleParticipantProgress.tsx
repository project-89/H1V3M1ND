'use client';

import { Shield, Brain, Star } from 'lucide-react';
import { SingleParticipantMission } from '@H1V3M1ND/types';
import { MissionProgress } from './MissionProgress';

interface SingleParticipantProgressProps {
  mission: SingleParticipantMission;
}

export function SingleParticipantProgress({ mission }: SingleParticipantProgressProps) {
  return (
    <div className="space-y-6">
      <MissionProgress mission={mission} />

      {/* Agent Requirements */}
      <div className="bg-cyber-dark border border-cyber-purple/50 rounded-lg p-6 space-y-6">
        <h3 className="text-lg font-semibold text-white mb-4">Agent Requirements</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Minimum Rank */}
          <div className="bg-black/20 rounded-lg p-4 border border-cyber-purple/30">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="w-4 h-4 text-cyber-purple-light" />
              <span className="text-gray-400">Minimum Rank</span>
            </div>
            <p className="text-xl font-bold text-white">
              {mission.requirements.minimumRank || 'None'}
            </p>
          </div>

          {/* Required Capabilities */}
          <div className="bg-black/20 rounded-lg p-4 border border-cyber-purple/30">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="w-4 h-4 text-cyber-purple-light" />
              <span className="text-gray-400">Required Capabilities</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {mission.requirements.capabilities?.map((capability, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded-md bg-cyber-purple/20 text-cyber-purple-light text-sm"
                >
                  {capability}
                </span>
              ))}
            </div>
          </div>

          {/* Special Requirements */}
          <div className="bg-black/20 rounded-lg p-4 border border-cyber-purple/30">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-4 h-4 text-cyber-purple-light" />
              <span className="text-gray-400">Special Requirements</span>
            </div>
            <div className="space-y-1">
              {(mission.requirements.specialRequirements || []).map(
                (requirement: string, index: number) => (
                  <p key={index} className="text-sm text-white">
                    • {requirement}
                  </p>
                )
              )}
            </div>
          </div>
        </div>

        {/* Category-Specific Ranks */}
        {mission.requirements.categorySpecificRanks && (
          <div className="mt-6">
            <h4 className="text-md font-medium text-white mb-3">
              Category-Specific Rank Requirements
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(mission.requirements.categorySpecificRanks).map(
                ([category, rank]) => (
                  <div
                    key={category}
                    className="bg-black/20 rounded-lg p-3 border border-cyber-purple/30"
                  >
                    <p className="text-sm text-gray-400 mb-1">{category}</p>
                    <p className="text-lg font-semibold text-white">{rank}</p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
