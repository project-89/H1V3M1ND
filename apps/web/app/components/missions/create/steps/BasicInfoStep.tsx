'use client';

import { Input, Label, Textarea, RadioGroup, RadioGroupItem } from '@/components/ui';
import {
  Mission,
  MissionType,
  SingleParticipantMission,
  MultiParticipantMission,
} from '@/lib/types';

interface BasicInfoStepProps {
  data: Partial<Mission>;
  onUpdate: (data: Partial<Mission>) => void;
}

export function BasicInfoStep({ data, onUpdate }: BasicInfoStepProps) {
  const handleTypeChange = (value: MissionType) => {
    const baseData = {
      ...data,
      type: value,
      requirements: value === MissionType.Single ? {} : { minParticipants: 2, maxParticipants: 5 },
    };

    if (value === MissionType.Single) {
      onUpdate(baseData as Partial<SingleParticipantMission>);
    } else {
      onUpdate(baseData as Partial<MultiParticipantMission>);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-cyber-purple-light">
          Mission Title
        </Label>
        <Input
          id="title"
          value={data.title || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onUpdate({ ...data, title: e.target.value })
          }
          placeholder="Enter a descriptive title for your mission"
          className="bg-cyber-dark border-cyber-purple"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-cyber-purple-light">
          Mission Description
        </Label>
        <Textarea
          id="description"
          value={data.description || ''}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            onUpdate({ ...data, description: e.target.value })
          }
          placeholder="Describe the mission objectives and context"
          className="bg-cyber-dark border-cyber-purple min-h-[120px]"
        />
      </div>

      <div className="space-y-4">
        <Label className="text-cyber-purple-light">Mission Type</Label>
        <RadioGroup
          value={data.type || MissionType.Single}
          onValueChange={handleTypeChange}
          className="grid grid-cols-2 gap-4"
        >
          <div>
            <RadioGroupItem value={MissionType.Single} id="single" className="peer sr-only" />
            <Label
              htmlFor="single"
              className="flex flex-col items-center justify-between rounded-md border-2 border-cyber-purple bg-cyber-dark p-4 hover:bg-cyber-purple/10 peer-data-[state=checked]:border-neon-pink peer-data-[state=checked]:text-neon-pink [&:has([data-state=checked])]:border-neon-pink cursor-pointer"
            >
              <span className="text-lg">Single Agent</span>
              <span className="text-sm text-gray-400">One agent completes the mission</span>
            </Label>
          </div>

          <div>
            <RadioGroupItem value={MissionType.Multi} id="multi" className="peer sr-only" />
            <Label
              htmlFor="multi"
              className="flex flex-col items-center justify-between rounded-md border-2 border-cyber-purple bg-cyber-dark p-4 hover:bg-cyber-purple/10 peer-data-[state=checked]:border-neon-pink peer-data-[state=checked]:text-neon-pink [&:has([data-state=checked])]:border-neon-pink cursor-pointer"
            >
              <span className="text-lg">Multi Agent</span>
              <span className="text-sm text-gray-400">Multiple agents collaborate</span>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
