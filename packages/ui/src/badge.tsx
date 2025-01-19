import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@H1V3M1ND/ui/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-cyber-purple text-white shadow-cyber hover:bg-cyber-purple-light',
        secondary:
          'border-transparent bg-cyber-dark text-cyber-purple-light hover:bg-cyber-dark/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-cyber-purple-light border-cyber-purple/50 hover:bg-cyber-purple/10',
        success: 'border-transparent bg-green-500/20 text-green-400 border-green-500/50',
        warning: 'border-transparent bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
        info: 'border-transparent bg-blue-500/20 text-blue-400 border-blue-500/50',
        neon: 'border-transparent bg-gradient-to-r from-cyber-purple to-cyber-pink text-white shadow-neon-glow hover:shadow-neon-glow-strong',
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
