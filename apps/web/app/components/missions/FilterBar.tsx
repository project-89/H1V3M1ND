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
  [StakeRange.Low]: '< 500 P89',
  [StakeRange.Medium]: '500-2000 P89',
  [StakeRange.High]: '> 2000 P89',
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
    <div className="flex flex-wrap gap-4 p-4 bg-cyber-darker border border-cyber-purple rounded-lg">
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

      {/* Participant Type Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-cyber-purple-light hover:border-neon-pink">
            {filters.participantType || 'Participant Type'}{' '}
            <ChevronDown className="ml-2" size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-cyber-dark border-cyber-purple">
          <DropdownMenuItem onClick={() => updateFilters({ participantType: undefined })}>
            All
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => updateFilters({ participantType: ParticipantType.Human })}
          >
            Human
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => updateFilters({ participantType: ParticipantType.Agent })}
          >
            Agent
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateFilters({ participantType: ParticipantType.Any })}>
            Any
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Scale Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-cyber-purple-light hover:border-neon-pink">
            {filters.scale || 'Scale'} <ChevronDown className="ml-2" size={16} />
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
          <Button variant="outline" className="border-cyber-purple-light hover:border-neon-pink">
            {filters.status || 'Status'} <ChevronDown className="ml-2" size={16} />
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
          <Button variant="outline" className="border-cyber-purple-light hover:border-neon-pink">
            <Clock className="mr-2" size={16} />
            {filters.timeRange ? TIME_RANGE_LABELS[filters.timeRange] : 'Time Range'}
            <ChevronDown className="ml-2" size={16} />
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
          <Button variant="outline" className="border-cyber-purple-light hover:border-neon-pink">
            <Coins className="mr-2" size={16} />
            {filters.stakeRange ? STAKE_RANGE_LABELS[filters.stakeRange] : 'Stake Range'}
            <ChevronDown className="ml-2" size={16} />
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
  );
}
