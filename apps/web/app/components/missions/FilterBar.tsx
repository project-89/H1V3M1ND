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
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-cyber-darker border border-cyber-purple rounded-lg">
      {/* Search Input */}
      <div className="relative flex-grow max-w-md">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
        <Input
          placeholder="Search missions..."
          className="pl-10 bg-cyber-dark border-cyber-purple-light focus:border-neon-pink"
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
              className="border-cyber-purple-light hover:border-cyber-pink h-9 focus:border-cyber-pink-dark focus:outline-none transition-colors duration-100"
            >
              <div className="flex items-center gap-2">
                <span>{filters.participantType || 'Participant Type'}</span>
                <ChevronDown size={16} className="ml-auto" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-cyber-dark border-cyber-purple shadow-cyber hover:shadow-cyber-lg">
            <DropdownMenuItem
              onClick={() => updateFilters({ participantType: undefined })}
              className="hover:bg-cyber-purple/70 hover:text-white"
            >
              All
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateFilters({ participantType: ParticipantType.Human })}
              className="hover:bg-cyber-purple/70 hover:text-white"
            >
              Human
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateFilters({ participantType: ParticipantType.Agent })}
              className="hover:bg-cyber-purple/70 hover:text-white"
            >
              Agent
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateFilters({ participantType: ParticipantType.Any })}
              className="hover:bg-cyber-purple/70 hover:text-white"
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
              className="border-cyber-purple-light hover:border-cyber-pink h-9 focus:border-cyber-pink-dark focus:outline-none transition-colors duration-100"
            >
              <div className="flex items-center gap-2">
                <span>{filters.scale || 'Scale'}</span>
                <ChevronDown size={16} className="ml-auto" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-cyber-dark border-cyber-purple">
            <DropdownMenuItem onClick={() => updateFilters({ scale: undefined })}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateFilters({ scale: MissionScale.Solo })}>
              Solo
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateFilters({ scale: MissionScale.Party })}>
              Party
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateFilters({ scale: MissionScale.Swarm })}>
              Swarm
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Status Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-cyber-purple-light hover:border-cyber-pink h-9 focus:border-cyber-pink-dark focus:outline-none transition-colors duration-100"
            >
              <div className="flex items-center gap-2">
                <span>{filters.status || 'Status'}</span>
                <ChevronDown size={16} className="ml-auto" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-cyber-dark border-cyber-purple">
            <DropdownMenuItem onClick={() => updateFilters({ status: undefined })}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateFilters({ status: MissionStatus.Active })}>
              Active
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateFilters({ status: MissionStatus.InProgress })}>
              In Progress
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateFilters({ status: MissionStatus.PendingValidation })}
            >
              Pending Validation
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateFilters({ status: MissionStatus.Completed })}>
              Completed
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Time Range Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-cyber-purple-light hover:border-cyber-pink h-9 focus:border-cyber-pink-dark focus:outline-none transition-colors duration-100"
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
          <DropdownMenuContent className="bg-cyber-dark border-cyber-purple">
            <DropdownMenuItem onClick={() => updateFilters({ timeRange: undefined })}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateFilters({ timeRange: TimeRange.Short })}>
              {TIME_RANGE_LABELS[TimeRange.Short]}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateFilters({ timeRange: TimeRange.Medium })}>
              {TIME_RANGE_LABELS[TimeRange.Medium]}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateFilters({ timeRange: TimeRange.Long })}>
              {TIME_RANGE_LABELS[TimeRange.Long]}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Stake Range Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-cyber-purple-light hover:border-cyber-pink h-9 focus:border-cyber-pink-dark focus:outline-none transition-colors duration-100"
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
          <DropdownMenuContent className="bg-cyber-dark border-cyber-purple">
            <DropdownMenuItem onClick={() => updateFilters({ stakeRange: undefined })}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateFilters({ stakeRange: StakeRange.Low })}>
              {STAKE_RANGE_LABELS[StakeRange.Low]}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateFilters({ stakeRange: StakeRange.Medium })}>
              {STAKE_RANGE_LABELS[StakeRange.Medium]}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateFilters({ stakeRange: StakeRange.High })}>
              {STAKE_RANGE_LABELS[StakeRange.High]}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
