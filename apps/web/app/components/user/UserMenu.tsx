'use client';

import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@H1V3M1ND/ui';
import { Settings, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from '@H1V3M1ND/ui';
import { Button } from '@H1V3M1ND/ui';
import { useProfileStore } from '@/store/profileStore';
import { useWalletStore } from '@/store/wallet';
import { getNFTAvatar } from '@/lib/utils/nft';

export function UserMenu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const profile = useProfileStore((state) => state.profile);
  const { isConnected, publicKey } = useWalletStore();
  const [nftAvatar, setNftAvatar] = useState<string | null>(null);
  const [isLoadingNFT, setIsLoadingNFT] = useState(false);

  useEffect(() => {
    const checkForNFT = async () => {
      if (isConnected && publicKey) {
        setIsLoadingNFT(true);
        try {
          const avatarUrl = await getNFTAvatar(publicKey);
          setNftAvatar(avatarUrl);
        } catch (error) {
          console.error('Failed to check for NFT:', error);
          setNftAvatar(null);
        } finally {
          setIsLoadingNFT(false);
        }
      } else {
        setNftAvatar(null);
      }
    };

    checkForNFT();
  }, [isConnected, publicKey]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={isConnected ? nftAvatar || '/89.jpg' : undefined}
              alt={profile?.username || 'User'}
              className={isLoadingNFT ? 'opacity-50' : ''}
            />
            <AvatarFallback>{profile?.username?.[0] ?? 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-cyber-dark border border-cyber-purple mt-6"
        align="end"
      >
        <DropdownMenuLabel className="text-gray-400 px-3 py-2">
          {profile?.username ?? 'My Account'}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-cyber-purple/20" />
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => router.push('/profile/settings')}
        >
          <User className="w-4 h-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => router.push('/profile/settings')}
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 text-red-400">
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
