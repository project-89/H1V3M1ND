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
        variant="default"
        size="sm"
        onClick={handleConnect}
        disabled={isLoading}
        data-wallet-button="true"
        className="!shadow-none hover:!shadow-none bg-cyber-purple hover:bg-cyber-purple-light transition-colors duration-200"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Connecting...</span>
          </div>
        ) : (
          'Connect Wallet'
        )}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="!shadow-none hover:!shadow-none border border-cyber-purple hover:bg-cyber-purple/70 transition-colors duration-200"
        >
          {`${publicKey?.slice(0, 6)}...${publicKey?.slice(-4)}`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-cyber-dark border border-cyber-purple mt-6 mr-20"
        align="center"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-gray-400 px-3 py-2">Wallet</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-cyber-purple/20" />
        <div className="px-3 py-2 flex items-center gap-2 text-sm">
          <Coins className="w-4 h-4 text-cyber-purple" />
          <span>{balance} Project89</span>
        </div>
        <DropdownMenuItem
          className="flex items-center gap-2 text-red-400"
          onClick={handleDisconnect}
        >
          <LogOut className="w-4 h-4" />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
