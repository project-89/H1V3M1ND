import * as React from 'react';

import { cn } from '../lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-cyber-purple/50 bg-cyber-dark/50 px-3 py-2 text-base',
          'text-gray-200 placeholder:text-gray-500',
          'backdrop-blur-sm transition-colors duration-200',
          'hover:border-cyber-purple/70',
          'focus:border-cyber-purple focus:outline-none focus:ring-1 focus:ring-cyber-purple/50',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'md:text-sm',
          'resize-none',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
