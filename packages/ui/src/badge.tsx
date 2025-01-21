import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--badge-focus-ring)]',
  {
    variants: {
      variant: {
        default:
          'border-[var(--badge-default-border)] bg-[var(--badge-default-bg)] text-[var(--badge-default-text)] hover:bg-[var(--badge-default-hover)]',
        secondary:
          'border-[var(--badge-secondary-border)] bg-[var(--badge-secondary-bg)] text-[var(--badge-secondary-text)] hover:bg-[var(--badge-secondary-hover)]',
        destructive:
          'border-[var(--badge-destructive-border)] bg-[var(--badge-destructive-bg)] text-[var(--badge-destructive-text)] hover:bg-[var(--badge-destructive-hover)]',
        success:
          'border-[var(--badge-success-border)] bg-[var(--badge-success-bg)] text-[var(--badge-success-text)] hover:bg-[var(--badge-success-hover)]',
        outline:
          'border-[var(--badge-outline-border)] text-[var(--badge-outline-text)] hover:border-[var(--badge-outline-hover-border)] hover:bg-[var(--badge-outline-hover-bg)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
