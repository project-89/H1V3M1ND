'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface FadeProps extends React.HTMLAttributes<HTMLDivElement> {
  show: boolean;
  duration?: number;
}

export function Fade({ show, duration = 200, className, children, ...props }: FadeProps) {
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    if (show) setShouldRender(true);
    else {
      const timer = setTimeout(() => setShouldRender(false), duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  if (!shouldRender) return null;

  return (
    <div
      className={cn(
        'transition-opacity duration-200',
        show ? 'opacity-100' : 'opacity-0',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
