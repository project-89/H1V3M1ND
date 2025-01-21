import * as React from 'react';

import { cn } from '../lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-[var(--textarea-border)] bg-[var(--textarea-bg)] px-3 py-2 text-base',
          'text-[var(--textarea-text)] placeholder:text-[var(--textarea-placeholder)]',
          'backdrop-blur-sm transition-colors duration-200',
          'hover:border-[var(--textarea-hover-border)]',
          'focus:border-[var(--textarea-focus-border)] focus:outline-none focus:ring-1 focus:ring-[var(--textarea-focus-ring)]',
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
