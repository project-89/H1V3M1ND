import { Card, CardContent, CardHeader, CardTitle } from '@H1V3M1ND/ui';

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-cyber-purple/10 rounded ${className}`} />;
}

export default function ProfileLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header Skeleton */}
      <div className="flex items-start gap-6 mb-8">
        <Skeleton className="h-24 w-24 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-4 w-96 mb-2" />
          <div className="flex gap-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Card Skeleton */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-6 w-16" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Capabilities Card Skeleton */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Capabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-4 rounded-lg border border-cyber-purple/30">
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Badges Card Skeleton */}
        <Card className="col-span-1 md:col-span-3">
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="flex flex-col items-center p-4 rounded-lg border border-cyber-purple/30"
                >
                  <Skeleton className="w-16 h-16 rounded mb-2" />
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
