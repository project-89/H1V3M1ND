'use client';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@H1V3M1ND/ui';

import { useWalletStore } from '@/store/wallet';
import { useState } from 'react';
import { Loader2, Coins, LogOut } from 'lucide-react';

export function WalletButton() {
  const { isConnected, publicKey, setConnected, setPublicKey } = useWalletStore();
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState('0');

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      // Simulate wallet connection for now
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockPublicKey = '0x1234567890abcdef1234567890abcdef12345678';
      setPublicKey(mockPublicKey);
      setConnected(true);
      setBalance('1,234.56'); // Mock balance
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    setConnected(false);
    setPublicKey(null);
  };

  if (!isConnected) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleConnect}
        disabled={isLoading}
        data-wallet-button="true"
        className="border-neon-purple hover:border-neon-purple text-neon-pink hover:text-neon-pink transition-colors duration-200 bg-cyber-dark/50 hover:bg-cyber-purple"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <Coins className="h-4 w-4 mr-2" />
        )}
        Connect Wallet
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-cyber-purple hover:border-neon-purple text-neon-pink hover:text-neon-pink transition-colors duration-200 bg-cyber-purple hover:bg-cyber-dark font-mono"
        >
          <Coins className="h-4 w-4 mr-2" />
          {publicKey?.slice(0, 6)}...{publicKey?.slice(-4)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-cyber-dark border-cyber-purple-light w-56 z-10 mt-6"
      >
        <DropdownMenuLabel className="text-cyber-gray">Wallet</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-cyber-purple" />
        <DropdownMenuItem className="text-sm cursor-default">
          <Coins className="w-4 h-4 text-neon-cyan" />
          <span className="text-neon-cyan ml-2">{balance} Project89</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="group cursor-pointer text-neon-pink/70 transition-colors duration-200 hover:!text-neon-pink focus:!text-neon-pink hover:bg-cyber-purple focus:bg-cyber-purple"
          onClick={handleDisconnect}
        >
          <LogOut className="h-4 w-4 mr-2 text-neon-pink/70 transition-colors duration-200 group-hover:!text-neon-pink" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
