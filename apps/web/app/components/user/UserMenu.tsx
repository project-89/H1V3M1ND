'use client';

import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@H1V3M1ND/ui';
import { Settings, User, LogOut } from 'lucide-react';

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center w-9 h-9 rounded-full bg-cyber-dark border border-cyber-purple/50 hover:border-cyber-purple transition-colors">
          <div className="w-8 h-8 rounded-full bg-cyber-darker flex items-center justify-center">
            <User className="w-4 h-4 text-cyber-purple" />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-cyber-dark border border-cyber-purple mt-5"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-gray-400 px-3 py-2">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-cyber-purple/20" />
        <DropdownMenuItem className="flex items-center gap-2">
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
