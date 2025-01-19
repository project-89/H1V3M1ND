'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@H1V3M1ND/ui';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An error occurred while loading the data. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="bg-cyber-dark border border-red-500/50 rounded-lg p-6 text-center">
      <div className="flex justify-center mb-4">
        <AlertTriangle className="w-12 h-12 text-red-500" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-6">{message}</p>
      {onRetry && (
        <Button
          onClick={onRetry}
          className="bg-cyber-purple hover:bg-cyber-purple/80 inline-flex items-center"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
}
