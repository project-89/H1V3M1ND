'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

interface FadeProps extends React.HTMLAttributes<HTMLDivElement> {
  show: boolean;
  children: React.ReactNode;
}

export function Fade({ show, children, className, ...props }: FadeProps) {
  return (
    <div
      className={cn(
        'transition-opacity duration-200',
        show ? 'opacity-100' : 'opacity-0 pointer-events-none',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
