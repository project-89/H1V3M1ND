'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateMissionForm, MissionFormData } from '@/components/missions/CreateMissionForm';
import { toast } from 'sonner';

export default function CreateMissionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: MissionFormData) => {
    const toastId = toast.loading('Creating mission...');
    try {
      setIsSubmitting(true);
      // TODO: Replace with actual API call
      console.log('Creating mission:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      toast.success('Mission created successfully!', {
        id: toastId,
        description: 'Your mission has been posted and is now visible to potential participants.',
      });

      router.push('/missions');
    } catch (error) {
      console.error('Failed to create mission:', error);
      toast.error('Failed to create mission', {
        id: toastId,
        description: 'There was an error creating your mission. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <CreateMissionForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
