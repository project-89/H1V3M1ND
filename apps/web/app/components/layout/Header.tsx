'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WalletButton } from '../wallet/WalletButton';
import { Button } from '@H1V3M1ND/ui';
import { Plus } from 'lucide-react';
import { MissionCreateDialog } from '../missions/create/MissionCreateDialog';
import { useMissionStore } from '@/store/missions';
import { useWalletStore } from '@/store/wallet';

export function Header() {
  const pathname = usePathname();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { createMission } = useMissionStore();
  const { isConnected } = useWalletStore();

  const handleCreateMission = async (missionData: any) => {
    await createMission(missionData);
    setIsCreateDialogOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-20 border-b border-gray-800 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex h-[70px] items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-glow-pink">
              H1V3M1ND
            </Link>
            <nav className="hidden md:block">
              <ul className="flex items-center gap-6">
                <li>
                  <Link
                    href="/missions"
                    className={pathname === '/missions' ? 'text-white' : 'text-gray-400'}
                  >
                    Missions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className={pathname === '/profile' ? 'text-white' : 'text-gray-400'}
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {isConnected && (
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-cyber-purple hover:bg-cyber-purple/80 h-9"
              >
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>Create Mission</span>
                </div>
              </Button>
            )}
            <WalletButton />
          </div>
        </div>
      </div>

      <MissionCreateDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateMission}
      />
    </header>
  );
}
