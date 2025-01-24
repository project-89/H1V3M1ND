'use client';

import * as React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './button';
import { cn } from '../lib/utils';

interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Error',
  message = 'Something went wrong',
  onRetry,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      className={cn('flex flex-col items-center justify-center p-8 text-center', className)}
      {...props}
    >
      <div className="rounded-full bg-red-500/20 p-4 mb-4">
        <AlertTriangle className="h-8 w-8 text-red-500" />
      </div>
      <h3 className="text-xl font-bold text-red-500 mb-2">{title}</h3>
      <p className="text-gray-400 max-w-md mb-4">{message}</p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="border-cyber-purple-light text-neon-pink hover:text-neon-pink/80 hover:bg-cyber-purple"
        >
          Try Again
        </Button>
      )}
    </div>
  );
}
