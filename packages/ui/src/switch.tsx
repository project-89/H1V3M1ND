import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '../lib/utils';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border border-cyber-purple bg-cyber-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-purple focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-cyber-purple data-[state=unchecked]:bg-cyber-dark/50',
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none block h-[20px] w-[20px] rounded-full bg-white shadow-lg transition-transform duration-200 data-[state=checked]:translate-x-[22px] data-[state=unchecked]:translate-x-[2px]'
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
