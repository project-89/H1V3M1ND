// Mock NFT data - simulating NFT metadata from blockchain/bucket
const NFT_AVATARS: Record<string, string> = {
  // Example wallet addresses mapped to avatar URLs
  '0x1234...5678': '/nameless-one.png',
  '0xabcd...ef12': '/nameless-one.png',
  '0x7890...1234': '/nameless-one.png',
};

export async function getNFTAvatar(walletAddress: string): Promise<string | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // For development, always return the NFT avatar with 30% chance
  if (!NFT_AVATARS[walletAddress]) {
    // 30% chance of having an NFT for testing
    if (Math.random() < 0.3) {
      return '/nameless-one.png';
    }
    return null;
  }

  return NFT_AVATARS[walletAddress];
}
