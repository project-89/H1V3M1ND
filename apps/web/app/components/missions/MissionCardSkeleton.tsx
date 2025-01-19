'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@H1V3M1ND/ui';

export function MissionCardSkeleton() {
  return (
    <Card className="cyber-card overflow-hidden animate-pulse">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="h-5 w-24 bg-cyber-purple/20 rounded" />
          <div className="h-5 w-20 bg-cyber-purple/20 rounded" />
        </div>
        <div className="h-6 w-3/4 bg-cyber-purple/20 rounded" />
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="h-4 w-full bg-cyber-purple/20 rounded" />
          <div className="h-4 w-5/6 bg-cyber-purple/20 rounded" />
        </div>

        <div className="flex items-center space-x-2">
          <div className="h-5 w-16 bg-cyber-purple/20 rounded" />
          <div className="h-5 w-16 bg-cyber-purple/20 rounded" />
        </div>
      </CardContent>

      <CardFooter className="border-t border-cyber-purple bg-cyber-dark/50">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-4 w-24 bg-cyber-purple/20 rounded" />
            <div className="h-4 w-20 bg-cyber-purple/20 rounded" />
          </div>
          <div className="h-4 w-24 bg-cyber-purple/20 rounded" />
        </div>
      </CardFooter>
    </Card>
  );
}
