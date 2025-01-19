'use client';

import { useState, useEffect } from 'react';
import { Wallet, TrendingUp, TrendingDown, RefreshCcw } from 'lucide-react';
import { Button } from '@H1V3M1ND/ui';
import { cn } from '@H1V3M1ND/ui/lib/utils';

interface BalanceDisplayProps {
  className?: string;
}

interface TokenBalance {
  amount: number;
  change24h: number;
  symbol: string;
}

export function BalanceDisplay({ className }: BalanceDisplayProps) {
  const [balance, setBalance] = useState<TokenBalance>({
    amount: 0,
    change24h: 0,
    symbol: 'P89',
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchBalance = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setBalance({
        amount: 1250.75,
        change24h: 5.23,
        symbol: 'P89',
      });
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div
      className={cn(
        'p-4 rounded-lg border border-cyber-purple/30 bg-cyber-dark/50',
        'hover:bg-cyber-dark/70 transition-colors group',
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-cyber-purple" />
          <span className="font-medium">Balance</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={fetchBalance}
          className="h-8 w-8 p-0"
          disabled={isLoading}
        >
          <RefreshCcw
            className={cn(
              'h-4 w-4 text-cyber-purple/70',
              'group-hover:text-cyber-purple transition-colors',
              isLoading && 'animate-spin'
            )}
          />
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold">
            {balance.amount.toLocaleString()} {balance.symbol}
          </span>
          <div
            className={cn(
              'flex items-center gap-1 text-sm',
              balance.change24h > 0 ? 'text-green-400' : 'text-red-400'
            )}
          >
            {balance.change24h > 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {Math.abs(balance.change24h)}%
          </div>
        </div>

        <div className="h-1 w-full bg-cyber-dark rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyber-purple to-neon-pink transition-all duration-1000"
            style={{ width: `${Math.min(100, (balance.amount / 2000) * 100)}%` }}
          />
        </div>

        <div className="flex justify-between text-xs text-gray-400">
          <span>0 {balance.symbol}</span>
          <span>2000 {balance.symbol}</span>
        </div>
      </div>
    </div>
  );
}
