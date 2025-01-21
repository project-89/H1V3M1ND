import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '../lib/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-2 w-full overflow-hidden rounded-full bg-[var(--progress-bg)]',
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-gradient-to-r from-[var(--progress-indicator-from)] via-[var(--progress-indicator-via)] to-[var(--progress-indicator-to)] transition-all duration-200"
      style={{
        transform: `translateX(-${100 - (value || 0)}%)`,
        boxShadow: `0 0 10px var(--progress-indicator-shadow)`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--progress-shimmer)] to-transparent animate-[shimmer_2s_infinite]" />
    </ProgressPrimitive.Indicator>
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
