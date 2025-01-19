'use client';

import { useEffect, useState } from 'react';
import { cn } from '@H1V3M1ND/ui/lib/utils';

interface LoadingProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  duration?: number;
}

export function LoadingProgress({
  isLoading,
  duration = 2000,
  className,
  ...props
}: LoadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      return;
    }

    setProgress(0);
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 99);
      setProgress(newProgress);
    }, 50);

    return () => clearInterval(interval);
  }, [isLoading, duration]);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => setProgress(0), 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div
      className={cn('fixed top-0 left-0 right-0 h-1 bg-black/20 z-50 overflow-hidden', className)}
      {...props}
    >
      <div
        className="h-full bg-gradient-to-r from-cyber-purple via-neon-pink to-cyber-purple-light"
        style={{
          width: `${progress}%`,
          transition: 'width 50ms linear',
          boxShadow: '0 0 10px rgba(157, 78, 221, 0.5)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
      </div>
    </div>
  );
}
