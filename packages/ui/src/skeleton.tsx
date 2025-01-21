import { cn } from '../lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-[var(--skeleton-bg)] border border-[var(--skeleton-border)] relative before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-[var(--skeleton-glow)] before:blur-sm',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
