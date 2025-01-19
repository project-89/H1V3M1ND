import * as React from 'react';
import { cn } from '@H1V3M1ND/ui/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-cyber-purple/50 bg-cyber-dark/50 px-3 py-1 text-sm shadow-sm',
          'transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'placeholder:text-gray-500',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyber-purple',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'hover:border-cyber-purple',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
