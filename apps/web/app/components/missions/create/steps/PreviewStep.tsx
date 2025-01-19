'use client';

import { Badge } from '@H1V3M1ND/ui';
import {
  Mission,
  MissionType,
  SingleParticipantMission,
  MultiParticipantMission,
  FailureConditionSeverity,
} from '@/lib/types';

interface PreviewStepProps {
  data: Partial<Mission>;
}

export function PreviewStep({ data }: PreviewStepProps) {
  const getSeverityColor = (severity: FailureConditionSeverity) => {
    switch (severity) {
      case FailureConditionSeverity.Low:
        return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/50';
      case FailureConditionSeverity.Medium:
        return 'bg-orange-400/10 text-orange-400 border-orange-400/50';
      case FailureConditionSeverity.High:
        return 'bg-red-400/10 text-red-400 border-red-400/50';
      default:
        return 'bg-gray-400/10 text-gray-400 border-gray-400/50';
    }
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-cyber-purple-light">Basic Information</h3>
        <div className="bg-cyber-dark rounded-lg p-4 border border-cyber-purple space-y-2">
          <h4 className="text-xl font-bold text-white">{data.title}</h4>
          <p className="text-gray-300">{data.description}</p>
          <div className="flex space-x-2">
            <Badge variant="outline">
              {data.type === MissionType.Single ? 'Single Agent' : 'Multi Agent'}
            </Badge>
            {data.type === MissionType.Single &&
              (data as Partial<SingleParticipantMission>).participantType && (
                <Badge variant="outline">
                  {(data as Partial<SingleParticipantMission>).participantType}
                </Badge>
              )}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-cyber-purple-light">Requirements</h3>
        <div className="bg-cyber-dark rounded-lg p-4 border border-cyber-purple space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400">Time Limit</p>
              <p className="text-white">{data.baseRequirements?.timeLimit} hours</p>
            </div>
            <div>
              <p className="text-gray-400">Stake Amount</p>
              <p className="text-white">{data.baseRequirements?.stakeAmount} P89</p>
            </div>
          </div>

          {data.type === MissionType.Single ? (
            <div className="space-y-2">
              <p className="text-gray-400">Minimum Rank</p>
              <p className="text-white">
                {(data as Partial<SingleParticipantMission>).requirements?.minimumRank || 'None'}
              </p>
              {(data as Partial<SingleParticipantMission>).requirements?.preferredAgent && (
                <>
                  <p className="text-gray-400 mt-4">Preferred Agent Profile</p>
                  <p className="text-white">
                    {(data as Partial<SingleParticipantMission>).requirements?.preferredAgent}
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400">Min Participants</p>
                  <p className="text-white">
                    {(data as Partial<MultiParticipantMission>).requirements?.minParticipants}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Max Participants</p>
                  <p className="text-white">
                    {(data as Partial<MultiParticipantMission>).requirements?.maxParticipants}
                  </p>
                </div>
              </div>
              {(data as Partial<MultiParticipantMission>).requirements?.composition
                ?.teamStructure && (
                <>
                  <p className="text-gray-400 mt-4">Team Structure</p>
                  <p className="text-white">
                    {
                      (data as Partial<MultiParticipantMission>).requirements?.composition
                        ?.teamStructure
                    }
                  </p>
                </>
              )}
            </div>
          )}

          {data.requirements?.capabilities && data.requirements.capabilities.length > 0 && (
            <div className="space-y-2">
              <p className="text-gray-400">Required Capabilities</p>
              <div className="flex flex-wrap gap-2">
                {data.requirements.capabilities.map((cap) => (
                  <Badge key={cap} variant="outline">
                    {cap}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-cyber-purple-light">Failure Conditions</h3>
        <div className="bg-cyber-dark rounded-lg p-4 border border-cyber-purple space-y-4">
          {data.failureConditions?.map((condition) => (
            <div
              key={condition.id}
              className="flex items-start justify-between p-3 rounded border bg-black/20"
            >
              <div className="space-y-1">
                <p className="text-white">{condition.description}</p>
                <div className="flex space-x-2">
                  <Badge variant="outline" className={getSeverityColor(condition.severity)}>
                    {condition.severity}
                  </Badge>
                  <Badge variant="outline">{condition.category}</Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
