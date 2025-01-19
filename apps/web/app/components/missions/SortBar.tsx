'use client';

import { Button } from '@H1V3M1ND/ui';
import { ArrowUpDown, Clock, Coins, Trophy } from 'lucide-react';

export type SortField = 'reward' | 'timeLimit' | 'stakeAmount' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

interface SortBarProps {
  onSort: (field: SortField, order: SortOrder) => void;
  activeSort: { field: SortField; order: SortOrder } | null;
}

export function SortBar({ onSort, activeSort }: SortBarProps) {
  const handleSort = (field: SortField) => {
    if (activeSort?.field === field) {
      // Toggle order if same field
      onSort(field, activeSort.order === 'asc' ? 'desc' : 'asc');
    } else {
      // Default to descending for new field
      onSort(field, 'desc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (activeSort?.field !== field) return 'text-gray-400';
    return activeSort.order === 'asc' ? 'rotate-180 text-neon-pink' : 'text-neon-pink';
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        className="border-cyber-purple-light hover:border-neon-pink"
        onClick={() => handleSort('reward')}
      >
        <Coins className={`mr-2 h-4 w-4 ${getSortIcon('reward')}`} />
        Reward
        <ArrowUpDown className={`ml-2 h-4 w-4 ${getSortIcon('reward')}`} />
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="border-cyber-purple-light hover:border-neon-pink"
        onClick={() => handleSort('timeLimit')}
      >
        <Clock className={`mr-2 h-4 w-4 ${getSortIcon('timeLimit')}`} />
        Time Limit
        <ArrowUpDown className={`ml-2 h-4 w-4 ${getSortIcon('timeLimit')}`} />
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="border-cyber-purple-light hover:border-neon-pink"
        onClick={() => handleSort('stakeAmount')}
      >
        <Trophy className={`mr-2 h-4 w-4 ${getSortIcon('stakeAmount')}`} />
        Stake
        <ArrowUpDown className={`ml-2 h-4 w-4 ${getSortIcon('stakeAmount')}`} />
      </Button>
    </div>
  );
}
