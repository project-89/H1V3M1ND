import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@H1V3M1ND/ui';
import { User } from 'lucide-react';
import { useProfileStore } from '@/store/profileStore';
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@H1V3M1ND/ui';

export default function ProfilePage({ params }: { params: { id: string } }) {
  const { profile, isLoading, error } = useProfileStore();

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-400">Failed to load profile</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-cyber-purple">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex items-start gap-6 mb-8">
        <Avatar className="h-24 w-24 border-2 border-cyber-purple">
          <AvatarImage src={profile.avatarUrl} alt={profile.username} />
          <AvatarFallback>
            <User className="h-12 w-12" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold mb-2">{profile.username}</h1>
          {profile.bio && <p className="text-gray-400 mb-4">{profile.bio}</p>}
          <div className="flex gap-4">
            {profile.preferences.showContactInfo && profile.contactInfo && (
              <div className="flex gap-3">
                {Object.entries(profile.contactInfo).map(
                  ([platform, handle]) =>
                    handle && (
                      <a
                        key={platform}
                        href={`https://${platform}.com/${handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyber-purple hover:text-cyber-purple-light transition-colors"
                      >
                        {platform}
                      </a>
                    )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Card */}
        {profile.preferences.showStats && (
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Missions Completed</p>
                  <p className="text-xl font-bold">{profile.stats.missionsCompleted}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Success Rate</p>
                  <p className="text-xl font-bold">{profile.stats.successRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Reputation</p>
                  <p className="text-xl font-bold">{profile.stats.reputation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Capabilities Card */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Capabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.capabilities.map((capability) => (
                <div
                  key={capability.id}
                  className="p-4 rounded-lg border border-cyber-purple/30 hover:border-cyber-purple/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{capability.name}</h3>
                    {capability.isVerified && (
                      <Badge variant="default" className="bg-cyber-purple">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{capability.type}</p>
                  <p className="text-sm">{capability.level}</p>
                  {capability.description && (
                    <p className="text-sm text-gray-400 mt-2">{capability.description}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Badges Card */}
        {profile.badges.length > 0 && (
          <Card className="col-span-1 md:col-span-3">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {profile.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex flex-col items-center p-4 rounded-lg border border-cyber-purple/30 hover:border-cyber-purple/50 transition-colors"
                  >
                    <img src={badge.imageUrl} alt={badge.name} className="w-16 h-16 mb-2" />
                    <h4 className="font-semibold text-center">{badge.name}</h4>
                    <p className="text-sm text-gray-400 text-center mt-1">{badge.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
