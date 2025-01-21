import * as React from 'react';

import { cn } from '../lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2 text-base',
          'text-[var(--input-text)] placeholder:text-[var(--input-placeholder)]',
          'backdrop-blur-sm transition-colors duration-200',
          'hover:border-[var(--input-hover-border)]',
          'focus:border-[var(--input-focus-border)] focus:outline-none focus:ring-1 focus:ring-[var(--input-focus-ring)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'md:text-sm',
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
