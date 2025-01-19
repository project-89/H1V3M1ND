'use client';

import { Button } from '../ui/button';

export function WalletButton() {
  // TODO: Implement wallet connection logic
  const isConnected = false;
  const walletAddress = '';

  const handleClick = () => {
    // TODO: Implement wallet connection
    console.log('Connecting wallet...');
  };

  if (isConnected) {
    return (
      <Button variant="outline" size="sm" onClick={handleClick}>
        {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
      </Button>
    );
  }

  return (
    <Button variant="default" size="sm" onClick={handleClick}>
      Connect Wallet
    </Button>
  );
}
