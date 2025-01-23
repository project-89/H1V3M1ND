'use client';

import { useState } from 'react';
import {
  Button,
  Input,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@H1V3M1ND/ui';
import { ParticipantType, MissionScale, MissionStatus, TimeRange, StakeRange } from '@/lib/types';
import { ChevronDown, Search, Clock, Coins } from 'lucide-react';

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  search: string;
  participantType?: ParticipantType;
  scale?: MissionScale;
  status?: MissionStatus;
  timeRange?: TimeRange;
  stakeRange?: StakeRange;
}

const TIME_RANGE_LABELS: Record<TimeRange, string> = {
  [TimeRange.Short]: '< 24 hours',
  [TimeRange.Medium]: '24-72 hours',
  [TimeRange.Long]: '> 72 hours',
};

const STAKE_RANGE_LABELS: Record<StakeRange, string> = {
  [StakeRange.Low]: '< 500 Project89',
  [StakeRange.Medium]: '500-2000 Project89',
  [StakeRange.High]: '> 2000 Project89',
};

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
  });

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFilterChange(updated);
  };

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 p-4 bg-cyber-darker border border-cyber-purple-light rounded-lg backdrop-blur-md shadow-[0_0_35px_hsl(var(--cyber-purple-hsl)/0.3)]">
      {/* Search Input */}
      <div className="relative flex-grow max-w-md">
        <Search
          className="absolute left-3 top-1/2 z-10 transform -translate-y-1/2 text-neon-pink"
          size={18}
        />
        <Input
          placeholder="Search missions..."
          className="pl-10 bg-cyber-dark text-neon-pink border-cyber-purple-light hover:border-cyber-pink hover:ring-2 hover:ring-inset hover:ring-neon-purple/60 focus:border-cyber-pink focus:ring-2 focus:ring-inset focus:ring-neon-purple/80 transition-all duration-100 placeholder:text-neon-pink/80"
          value={filters.search}
          onChange={(e) => updateFilters({ search: e.target.value })}
        />
      </div>

      {/* Filter Group */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Participant Type Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-cyber-purple-light hover:border-cyber-pink h-9 focus:border-cyber-pink focus:outline-none transition-colors duration-100 text-neon-pink hover:bg-cyber-purple/70"
            >
              <div className="flex items-center gap-2">
                <span>{filters.participantType || 'Participant Type'}</span>
                <ChevronDown size={16} className="ml-auto" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-cyber-dark border-cyber-purple-light w-40 mt-6">
            <DropdownMenuItem
              onClick={() => updateFilters({ participantType: undefined })}
              className="text-neon-pink data-[highlighted]:bg-cyber-purple/70 data-[highlighted]:text-neon-pink"
            >
              All
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateFilters({ participantType: ParticipantType.Human })}
              className="text-neon-pink data-[highlighted]:bg-cyber-purple/70 data-[highlighted]:text-neon-pink"
            >
              Human
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateFilters({ participantType: ParticipantType.Agent })}
              className="text-neon-pink data-[highlighted]:bg-cyber-purple/70 data-[highlighted]:text-neon-pink"
            >
              Agent
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateFilters({ participantType: ParticipantType.Any })}
              className="text-neon-pink data-[highlighted]:bg-cyber-purple/70 data-[highlighted]:text-neon-pink"
            >
              Any
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Scale Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-cyber-purple-light hover:border-cyber-pink h-9 focus:border-cyber-pink focus:outline-none transition-colors duration-100 text-neon-pink hover:bg-cyber-purple/70 "
            >
              <div className="flex items-center gap-2">
                <span>{filters.scale || 'Scale'}</span>
                <ChevronDown size={16} className="ml-auto" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-cyber-dark border-cyber-purple-light w-20 mt-6">
            <DropdownMenuItem
              onClick={() => updateFilters({ scale: undefined })}
              className="text-neon-pink data-[highlighted]:bg-cyber-purple/70 data-[highlighted]:text-neon-pink"
            >
              All
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateFilters({ scale: MissionScale.Solo })}
              className="text-neon-pink data-[highlighted]:bg-cyber-purple/70 data-[highlighted]:text-neon-pink"
            >
              Solo
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateFilters({ scale: MissionScale.Party })}
              className="text-neon-pink data-[highlighted]:bg-cyber-purple/70 data-[highlighted]:text-neon-pink"
            >
              Party
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateFilters({ scale: MissionScale.Swarm })}
              className="text-neon-pink data-[highlighted]:bg-cyber-purple/70 data-[highlighted]:text-neon-pink"
            >
              Swarm
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Status Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-cyber-purple-light hover:border-cyber-pink h-9 focus:border-cyber-pink focus:outline-none transition-colors duration-100 text-neon-pink hover:bg-cyber-purple/70"
            >
              <div className="flex items-center gap-2">
                <span>{filters.status || 'Status'}</span>
                <ChevronDown size={16} className="ml-auto" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-cyber-dark border-cyber-purple-light w-24 mt-6">
            <DropdownMenuItem
              onClick={() => updateFilters({ status: undefined })}
              className="text-neon-pink data-[highlighted]:bg-cyber-purple/70 data-[highlighted]:text-neon-pink"
            >
              All
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateFilters({ status: MissionStatus.Active })}
              className="text-neon-pink data-[highlighted]:bg-cyber-purple/70 data-[highlighted]:text-neon-pink"
            >
              Active
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateFilters({ status: MissionStatus.InProgress })}
              className="text-neon-pink data-[highlighted]:bg-cyber-purple/70 data-[highlighted]:text-neon-pink"
            >
              In Progress
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateFilters({ status: MissionStatus.PendingValidation })}
              className="text-neon-pink data-[highlighted]:bg-cyber-purple/70 data-[highlighted]:text-neon-pink"
            >
              Pending Validation
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateFilters({ status: MissionStatus.Completed })}
              className="text-neon-pink data-[highlighted]:bg-cyber-purple/70 data-[highlighted]:text-neon-pink"
            >
              Completed
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Time Range Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-cyber-purple-light hover:border-cyber-pink h-9 focus:border-cyber-pink focus:outline-none transition-colors duration-100 text-neon-pink hover:bg-cyber-purple/70"
            >
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>
                  {filters.timeRange ? TIME_RANGE_LABELS[filters.timeRange] : 'Time Range'}
                </span>
                <ChevronDown size={16} />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-cyber-dark border-cyber-purple-light w-40 mt-6">
            <DropdownMenuItem
              onClick={() => updateFilters({ timeRange: undefined })}
              className="text-neon-pink data-[highlighted]:bg-cyber-purple/70 data-[highlighted]:text-neon-pink"
            >
              All
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateFilters({ timeRange: TimeRange.Short })}
              className="text-neon-pink data-[highlighted]:bg-cyber-purple/70 data-[highlighted]:text-neon-pink"
            >
              {TIME_RANGE_LABELS[TimeRange.Short]}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateFilters({ timeRange: TimeRange.Medium })}
              className="text-neon-pink data-[highlighted]:bg-cyber-purple/70 data-[highlighted]:text-neon-pink"
            >
              {TIME_RANGE_LABELS[TimeRange.Medium]}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateFilters({ timeRange: TimeRange.Long })}
              className="text-neon-pink data-[highlighted]:bg-cyber-purple/70 data-[highlighted]:text-neon-pink"
            >
              {TIME_RANGE_LABELS[TimeRange.Long]}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Stake Range Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-cyber-purple-light hover:border-cyber-pink h-9 focus:border-cyber-pink focus:outline-none transition-colors duration-100 text-neon-pink hover:bg-cyber-purple/70"
            >
              <div className="flex items-center gap-2">
                <Coins size={16} />
                <span>
                  {filters.stakeRange ? STAKE_RANGE_LABELS[filters.stakeRange] : 'Stake Range'}
                </span>
                <ChevronDown size={16} />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-cyber-dark border-cyber-purple-light w-40 mt-6">
            <DropdownMenuItem
              onClick={() => updateFilters({ stakeRange: undefined })}
              className="text-neon-pink data-[highlighted]:bg-cyber-purple/70 data-[highlighted]:text-neon-pink"
            >
              All
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateFilters({ stakeRange: StakeRange.Low })}
              className="text-neon-pink data-[highlighted]:bg-cyber-purple/70 data-[highlighted]:text-neon-pink"
            >
              {STAKE_RANGE_LABELS[StakeRange.Low]}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateFilters({ stakeRange: StakeRange.Medium })}
              className="text-neon-pink data-[highlighted]:bg-cyber-purple/70 data-[highlighted]:text-neon-pink"
            >
              {STAKE_RANGE_LABELS[StakeRange.Medium]}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateFilters({ stakeRange: StakeRange.High })}
              className="text-neon-pink data-[highlighted]:bg-cyber-purple/70 data-[highlighted]:text-neon-pink"
            >
              {STAKE_RANGE_LABELS[StakeRange.High]}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
