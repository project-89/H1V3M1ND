import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@H1V3M1ND/ui/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyber-purple disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-cyber-purple text-white shadow-cyber hover:bg-cyber-purple-light hover:shadow-cyber-lg',
        destructive: 'bg-destructive text-white shadow-sm hover:bg-destructive/90',
        outline:
          'border border-cyber-purple bg-cyber-dark shadow-cyber hover:bg-cyber-purple/10 hover:shadow-cyber-lg',
        secondary:
          'bg-cyber-dark text-cyber-purple-light border border-cyber-purple/50 shadow-sm hover:border-cyber-purple hover:text-white',
        ghost: 'text-cyber-purple hover:bg-cyber-purple/10 hover:text-white',
        link: 'text-cyber-purple underline-offset-4 hover:text-cyber-purple-light hover:underline',
        neon: 'bg-gradient-to-r from-cyber-purple to-cyber-pink text-white shadow-neon-glow hover:shadow-neon-glow-strong transition-shadow',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9 p-0',
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
