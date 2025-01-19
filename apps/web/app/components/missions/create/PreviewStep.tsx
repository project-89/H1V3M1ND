'use client';

import { Badge } from '@/components/ui';
import {
  Mission,
  MissionType,
  SingleParticipantMission,
  MultiParticipantMission,
  FailureConditionSeverity,
} from '@/lib/types';

interface PreviewStepProps {
  data: Partial<SingleParticipantMission | MultiParticipantMission>;
}

export function PreviewStep({ data }: PreviewStepProps) {
  const isSingleParticipant = data.type === MissionType.Single;

  const getSeverityColor = (severity: FailureConditionSeverity) => {
    switch (severity) {
      case FailureConditionSeverity.High:
        return 'bg-red-500/20 text-red-400 border-red-400/50';
      case FailureConditionSeverity.Medium:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/50';
      case FailureConditionSeverity.Low:
        return 'bg-blue-500/20 text-blue-400 border-blue-400/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-400/50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="bg-cyber-dark border border-cyber-purple/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Mission Overview</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Title</label>
            <p className="text-white">{data.title || 'Not set'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-400">Description</label>
            <p className="text-white">{data.description || 'Not set'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-400">Type</label>
            <p className="text-white">{data.type || 'Not set'}</p>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-cyber-dark border border-cyber-purple/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Requirements</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Time Limit</label>
            <p className="text-white">{data.baseRequirements?.timeLimit || 'Not set'} hours</p>
          </div>
          <div>
            <label className="text-sm text-gray-400">Stake Amount</label>
            <p className="text-white">{data.baseRequirements?.stakeAmount || 'Not set'} P89</p>
          </div>
          {isSingleParticipant && (data as Partial<SingleParticipantMission>).requirements && (
            <>
              <div>
                <label className="text-sm text-gray-400">Minimum Rank</label>
                <p className="text-white">
                  {(data as Partial<SingleParticipantMission>).requirements?.minimumRank ||
                    'Not set'}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Capabilities</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {(data as Partial<SingleParticipantMission>).requirements?.capabilities?.map(
                    (capability, index) => (
                      <Badge key={index} variant="outline">
                        {capability}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            </>
          )}
          {!isSingleParticipant && (data as Partial<MultiParticipantMission>).requirements && (
            <>
              <div>
                <label className="text-sm text-gray-400">Team Size</label>
                <p className="text-white">
                  {(data as Partial<MultiParticipantMission>).requirements?.minParticipants} -{' '}
                  {(data as Partial<MultiParticipantMission>).requirements?.maxParticipants} members
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Team Composition</label>
                <div className="mt-1 space-y-2">
                  <p className="text-white">
                    Humans:{' '}
                    {(data as Partial<MultiParticipantMission>).requirements?.composition?.humans ||
                      'Not set'}
                  </p>
                  <p className="text-white">
                    Agents:{' '}
                    {(data as Partial<MultiParticipantMission>).requirements?.composition?.agents ||
                      'Not set'}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Failure Conditions */}
      {data.failureConditions && data.failureConditions.length > 0 && (
        <div className="bg-cyber-dark border border-cyber-purple/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Failure Conditions</h3>
          <div className="space-y-3">
            {data.failureConditions.map((condition) => (
              <div
                key={condition.id}
                className="bg-black/20 rounded-lg p-3 border border-cyber-purple/30"
              >
                <div className="flex items-center justify-between">
                  <p className="text-white">{condition.description}</p>
                  <Badge variant="outline" className={getSeverityColor(condition.severity)}>
                    {condition.severity}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
