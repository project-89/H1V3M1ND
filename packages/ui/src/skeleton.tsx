'use client';

import { cn } from '@H1V3M1ND/ui/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('animate-pulse rounded-md bg-cyber-purple/10', className)} {...props} />
  );
}

export { Skeleton };
