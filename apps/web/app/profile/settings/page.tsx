'use client';

import { useProfileStore } from '@/store/profileStore';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Switch,
  Textarea,
} from '@H1V3M1ND/ui';
import { User } from 'lucide-react';
import { useState } from 'react';
import { SkillLevel, SpecializationType } from '@/lib/types/profile';

export default function ProfileSettingsPage() {
  const { profile, updateProfile, isLoading } = useProfileStore();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-400">Profile not found</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const updates = {
      username: formData.get('username') as string,
      bio: formData.get('bio') as string,
      contactInfo: {
        email: formData.get('email') as string,
        discord: formData.get('discord') as string,
        twitter: formData.get('twitter') as string,
        github: formData.get('github') as string,
      },
      preferences: {
        isProfilePublic: formData.get('isProfilePublic') === 'on',
        showContactInfo: formData.get('showContactInfo') === 'on',
        showStats: formData.get('showStats') === 'on',
      },
    };

    await updateProfile(updates);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Profile Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-24 w-24 border-2 border-cyber-purple">
                <AvatarImage src={profile.avatarUrl} alt={profile.username} />
                <AvatarFallback>
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="avatar" className="block mb-2">
                  Profile Picture
                </Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="username" className="block mb-2">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                defaultValue={profile.username}
                className="w-full"
                required
              />
            </div>

            <div>
              <Label htmlFor="bio" className="block mb-2">
                Bio
              </Label>
              <Textarea id="bio" name="bio" defaultValue={profile.bio} className="w-full h-24" />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {['email', 'discord', 'twitter', 'github'].map((platform) => (
              <div key={platform}>
                <Label htmlFor={platform} className="block mb-2 capitalize">
                  {platform}
                </Label>
                <Input
                  id={platform}
                  name={platform}
                  defaultValue={profile.contactInfo?.[platform as keyof typeof profile.contactInfo]}
                  className="w-full"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: 'isProfilePublic', label: 'Make profile public' },
              { id: 'showContactInfo', label: 'Show contact information' },
              { id: 'showStats', label: 'Show mission stats' },
            ].map(({ id, label }) => (
              <div key={id} className="flex items-center justify-between">
                <Label htmlFor={id}>{label}</Label>
                <Switch
                  id={id}
                  name={id}
                  defaultChecked={profile.preferences[id as keyof typeof profile.preferences]}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-cyber-purple hover:bg-cyber-purple-light"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
