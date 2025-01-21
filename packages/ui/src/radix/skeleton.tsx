'use client';

import { cn } from '@H1V3M1ND/ui/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-cyber-dark border border-cyber-purple/20 relative before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-cyber-purple/5 before:blur-sm',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
