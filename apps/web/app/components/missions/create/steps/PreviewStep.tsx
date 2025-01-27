'use client';

import { Badge } from '@H1V3M1ND/ui';
import {
  Mission,
  MissionType,
  SingleParticipantMission,
  MultiParticipantMission,
  FailureConditionType,
} from '@H1V3M1ND/types';

interface PreviewStepProps {
  data: Partial<SingleParticipantMission | MultiParticipantMission>;
}

export function PreviewStep({ data }: PreviewStepProps) {
  const getTypeColor = (type: FailureConditionType) => {
    switch (type) {
      case FailureConditionType.Warning:
        return 'bg-yellow-500';
      case FailureConditionType.Standard:
        return 'bg-blue-500';
      case FailureConditionType.Critical:
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Mission Overview</h3>
        <div className="mt-2 space-y-2">
          <p>
            <span className="font-medium">Title:</span> {data.title}
          </p>
          <p>
            <span className="font-medium">Description:</span> {data.description}
          </p>
          <p>
            <span className="font-medium">Type:</span>{' '}
            {data.type === MissionType.Single ? 'Single Participant' : 'Multi Participant'}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Requirements</h3>
        <div className="mt-2 space-y-2">
          <p>
            <span className="font-medium">Time Limit:</span> {data.baseRequirements?.timeLimit}{' '}
            hours
          </p>
          <p>
            <span className="font-medium">Stake Amount:</span> {data.baseRequirements?.stakeAmount}{' '}
            tokens
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Objectives</h3>
        <div className="mt-2 space-y-2">
          {data.requirements?.objectives?.map((objective, index) => (
            <div key={index} className="rounded-md border border-gray-200 p-3">
              <p className="font-medium">{objective.task}</p>
              <p className="text-sm text-gray-600">{objective.details}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Failure Conditions</h3>
        <div className="mt-2 space-y-2">
          {data.failureConditions?.map((condition, index) => (
            <div key={index} className="rounded-md border border-gray-200 p-3">
              <p>{condition.description}</p>
              <div className="mt-2 flex gap-2">
                <Badge variant="outline" className={getTypeColor(condition.type)}>
                  {condition.type}
                </Badge>
                <Badge variant="outline">{condition.category}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
