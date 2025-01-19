'use client';

import { Users, Brain, Puzzle } from 'lucide-react';
import { MultiParticipantMission } from '@/lib/types';
import { MissionProgress } from './MissionProgress';

interface MultiParticipantProgressProps {
  mission: MultiParticipantMission;
}

export function MultiParticipantProgress({ mission }: MultiParticipantProgressProps) {
  const composition = mission.requirements?.composition || {};

  return (
    <div className="space-y-6">
      <MissionProgress mission={mission} />

      {/* Team Requirements */}
      <div className="bg-cyber-dark border border-cyber-purple/50 rounded-lg p-6 space-y-6">
        <h3 className="text-lg font-semibold text-white mb-4">Team Requirements</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Participant Count */}
          <div className="bg-black/20 rounded-lg p-4 border border-cyber-purple/30">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-4 h-4 text-cyber-purple-light" />
              <span className="text-gray-400">Team Size</span>
            </div>
            <p className="text-xl font-bold text-white">
              {mission.requirements?.minParticipants} - {mission.requirements?.maxParticipants}{' '}
              Members
            </p>
          </div>

          {/* Required Capabilities */}
          <div className="bg-black/20 rounded-lg p-4 border border-cyber-purple/30">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="w-4 h-4 text-cyber-purple-light" />
              <span className="text-gray-400">Required Capabilities</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {mission.requirements?.capabilities?.map((capability, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded-md bg-cyber-purple/20 text-cyber-purple-light text-sm"
                >
                  {capability}
                </span>
              ))}
            </div>
          </div>

          {/* Team Composition */}
          <div className="bg-black/20 rounded-lg p-4 border border-cyber-purple/30">
            <div className="flex items-center space-x-2 mb-2">
              <Puzzle className="w-4 h-4 text-cyber-purple-light" />
              <span className="text-gray-400">Team Composition</span>
            </div>
            <div className="space-y-2">
              {composition.humans && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Humans</span>
                  <span className="text-white font-medium">{composition.humans}</span>
                </div>
              )}
              {composition.agents && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">AI Agents</span>
                  <span className="text-white font-medium">{composition.agents}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Team Structure */}
        {composition.teamStructure && (
          <div className="mt-6">
            <h4 className="text-md font-medium text-white mb-3">Team Structure</h4>
            <div className="bg-black/20 rounded-lg p-4 border border-cyber-purple/30">
              <p className="text-white">{composition.teamStructure}</p>
            </div>
          </div>
        )}

        {/* Role Distribution */}
        {composition.roleDistribution && (
          <div className="mt-6">
            <h4 className="text-md font-medium text-white mb-3">Role Distribution</h4>
            <div className="bg-black/20 rounded-lg p-4 border border-cyber-purple/30">
              <p className="text-white">{composition.roleDistribution}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
