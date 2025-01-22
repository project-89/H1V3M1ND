'use client';

import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface LoadingProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
}

export function LoadingProgress({ isLoading, className, ...props }: LoadingProgressProps) {
  if (!isLoading) return null;

  return (
    <div
      className={cn('flex flex-col items-center justify-center p-8 text-center', className)}
      {...props}
    >
      <Loader2 className="h-8 w-8 animate-spin text-cyber-purple" />
      <p className="mt-2 text-gray-400">Loading...</p>
    </div>
  );
}
