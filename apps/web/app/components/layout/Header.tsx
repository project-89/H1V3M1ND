'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WalletButton } from '../wallet/WalletButton';

export function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-20 border-b border-gray-800 bg-black">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-primary">
              H1V3M1ND
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link
                href="/missions"
                className={`text-sm ${isActive('/missions') ? 'text-primary' : 'text-gray-400 hover:text-white'}`}
              >
                Missions
              </Link>
              <Link
                href="/create-mission"
                className={`text-sm ${isActive('/create-mission') ? 'text-primary' : 'text-gray-400 hover:text-white'}`}
              >
                Create Mission
              </Link>
              <Link
                href="/profile"
                className={`text-sm ${isActive('/profile') ? 'text-primary' : 'text-gray-400 hover:text-white'}`}
              >
                Profile
              </Link>
            </nav>
          </div>
          <WalletButton />
        </div>
      </div>
    </header>
  );
}
