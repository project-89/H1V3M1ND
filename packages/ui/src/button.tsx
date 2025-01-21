import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--btn-focus-ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--btn-default-bg)] text-white hover:bg-[var(--btn-default-hover)] border border-[var(--btn-default-border)]',
        destructive:
          'bg-[var(--btn-destructive-bg)] text-[var(--btn-destructive-text)] hover:bg-[var(--btn-destructive-hover)] border border-[var(--btn-destructive-border)]',
        outline:
          'border border-[var(--btn-outline-border)] bg-transparent hover:bg-[var(--btn-outline-hover)]',
        secondary:
          'bg-[var(--btn-secondary-bg)] text-gray-200 hover:bg-[var(--btn-secondary-hover)] border border-[var(--btn-secondary-border)]',
        ghost: 'hover:bg-[var(--btn-ghost-hover-bg)] hover:text-[var(--btn-ghost-hover-text)]',
        link: 'text-[var(--btn-link-text)] underline-offset-4 hover:underline hover:text-[var(--btn-link-hover)]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
