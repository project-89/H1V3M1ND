'use client';

import { Button } from '@H1V3M1ND/ui';
import { useWalletStore } from '@/store/wallet';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export function WalletButton() {
  const { isConnected, publicKey, setConnected, setPublicKey } = useWalletStore();
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState('0');

  const handleClick = async () => {
    if (isConnected) {
      // Disconnect wallet
      setConnected(false);
      setPublicKey(null);
      return;
    }

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

  return (
    <div className="flex items-center gap-4">
      {isConnected ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">{balance} P89</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClick}
            className="!shadow-none hover:!shadow-none border border-cyber-purple hover:bg-cyber-purple/10 transition-colors duration-200"
          >
            {`${publicKey?.slice(0, 6)}...${publicKey?.slice(-4)}`}
          </Button>
        </div>
      ) : (
        <Button
          variant="default"
          size="sm"
          onClick={handleClick}
          disabled={isLoading}
          className="!shadow-none hover:!shadow-none bg-cyber-purple hover:bg-cyber-purple-light transition-colors duration-200"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            'Connect Wallet'
          )}
        </Button>
      )}
    </div>
  );
}
