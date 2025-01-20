import { Card, CardContent, CardHeader, CardTitle } from '@H1V3M1ND/ui';

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-cyber-purple/10 rounded ${className}`} />;
}

export default function SettingsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-8 w-48 mb-8" />

      <div className="space-y-6">
        {/* Basic Information Skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <Skeleton className="h-24 w-24 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div>
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-24 w-full" />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information Skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Privacy Settings Skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-5 w-9" />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}
