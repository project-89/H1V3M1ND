'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WalletButton } from '../wallet/WalletButton';
import { UserMenu } from '../user/UserMenu';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-[40] border-b border-gray-800 bg-black w-full">
      <div className="max-w-[1800px] mx-auto px-6">
        <div className="flex h-[70px] items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-xl font-bold text-[#ff00ff] hover:text-[#ff00ff]/80 transition-colors duration-200"
            >
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
          <div className="flex items-center gap-4 mr-4">
            <WalletButton />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
