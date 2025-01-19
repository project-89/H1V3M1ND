'use client';

import { useState } from 'react';
import { Button, Input, Badge, Card, CardContent, CardFooter, CardHeader } from '@H1V3M1ND/ui';
import { ParticipantType, MissionScale } from '@/lib/types';
import { Clock, Coins, Users } from 'lucide-react';
import { z } from 'zod';
import { toast } from 'sonner';

// Validation schema
const missionSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  participantType: z.enum(['human', 'agent', 'any'] as const),
  scale: z.enum(['solo', 'party', 'swarm'] as const),
  timeLimit: z
    .number()
    .min(1, 'Time limit must be at least 1 hour')
    .max(720, 'Time limit must be less than 30 days'),
  stakeAmount: z.number().min(0, 'Stake amount must be non-negative'),
  capabilities: z.array(z.string()).min(1, 'At least one capability is required'),
  minimumRank: z.number().min(0).optional(),
});

interface CreateMissionFormProps {
  onSubmit: (data: MissionFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export interface MissionFormData {
  title: string;
  description: string;
  participantType: ParticipantType;
  scale: MissionScale;
  timeLimit: number;
  stakeAmount: number;
  capabilities: string[];
  minimumRank?: number;
}

export function CreateMissionForm({ onSubmit, isSubmitting = false }: CreateMissionFormProps) {
  const [formData, setFormData] = useState<MissionFormData>({
    title: '',
    description: '',
    participantType: ParticipantType.Human,
    scale: MissionScale.Solo,
    timeLimit: 24,
    stakeAmount: 100,
    capabilities: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [capability, setCapability] = useState('');

  const validateField = (field: keyof MissionFormData, value: any) => {
    try {
      const schema = missionSchema.shape[field];
      if (schema) {
        schema.parse(value);
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({
          ...prev,
          [field]: error.errors[0]?.message || `Invalid ${field}`,
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = missionSchema.parse(formData) as MissionFormData;
      await onSubmit(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path[0];
          if (typeof path === 'string') {
            newErrors[path] = err.message;
          }
        });
        setErrors(newErrors);
        toast.error('Please fix the form errors before submitting');
      }
    }
  };

  const addCapability = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && capability.trim()) {
      e.preventDefault();
      const newCapabilities = [...formData.capabilities, capability.trim()];
      setFormData((prev) => ({
        ...prev,
        capabilities: newCapabilities,
      }));
      validateField('capabilities', newCapabilities);
      setCapability('');
    }
  };

  const removeCapability = (index: number) => {
    const newCapabilities = formData.capabilities.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      capabilities: newCapabilities,
    }));
    validateField('capabilities', newCapabilities);
  };

  const handleFieldChange = (field: keyof MissionFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="bg-cyber-darker border-cyber-purple">
        <CardHeader>
          <h2 className="text-2xl font-bold text-glow-pink">Create New Mission</h2>
          <p className="text-gray-400">Define the parameters for your new mission</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Basic Info */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Mission Title</label>
            <Input
              value={formData.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              placeholder="Enter mission title"
              required
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Description</label>
            <textarea
              className={`w-full h-24 rounded-md bg-cyber-dark border border-cyber-purple-light focus:border-neon-pink text-gray-200 p-2 text-sm ${
                errors.description ? 'border-red-500' : ''
              }`}
              value={formData.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              placeholder="Describe the mission objectives and requirements"
              required
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* Mission Parameters */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Participant Type</label>
              <select
                className={`w-full rounded-md bg-cyber-dark border border-cyber-purple-light focus:border-neon-pink text-gray-200 p-2 text-sm ${
                  errors.participantType ? 'border-red-500' : ''
                }`}
                value={formData.participantType}
                onChange={(e) => handleFieldChange('participantType', e.target.value)}
              >
                <option value="human">Human</option>
                <option value="agent">Agent</option>
                <option value="any">Any</option>
              </select>
              {errors.participantType && (
                <p className="text-red-500 text-xs mt-1">{errors.participantType}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Scale</label>
              <select
                className={`w-full rounded-md bg-cyber-dark border border-cyber-purple-light focus:border-neon-pink text-gray-200 p-2 text-sm ${
                  errors.scale ? 'border-red-500' : ''
                }`}
                value={formData.scale}
                onChange={(e) => handleFieldChange('scale', e.target.value)}
              >
                <option value="solo">Solo</option>
                <option value="party">Party</option>
                <option value="swarm">Swarm</option>
              </select>
              {errors.scale && <p className="text-red-500 text-xs mt-1">{errors.scale}</p>}
            </div>
          </div>

          {/* Requirements */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 flex items-center">
                <Clock className="mr-2 h-4 w-4 text-neon-pink" />
                Time Limit (hours)
              </label>
              <Input
                type="number"
                min={1}
                value={formData.timeLimit}
                onChange={(e) => handleFieldChange('timeLimit', parseInt(e.target.value))}
                required
                className={errors.timeLimit ? 'border-red-500' : ''}
              />
              {errors.timeLimit && <p className="text-red-500 text-xs mt-1">{errors.timeLimit}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 flex items-center">
                <Coins className="mr-2 h-4 w-4 text-cyber-purple-light" />
                Stake Amount (P89)
              </label>
              <Input
                type="number"
                min={0}
                value={formData.stakeAmount}
                onChange={(e) => handleFieldChange('stakeAmount', parseInt(e.target.value))}
                required
                className={errors.stakeAmount ? 'border-red-500' : ''}
              />
              {errors.stakeAmount && (
                <p className="text-red-500 text-xs mt-1">{errors.stakeAmount}</p>
              )}
            </div>
          </div>

          {/* Capabilities */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Required Capabilities</label>
            <Input
              value={capability}
              onChange={(e) => setCapability(e.target.value)}
              onKeyDown={addCapability}
              placeholder="Type and press Enter to add"
              className={errors.capabilities ? 'border-red-500' : ''}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.capabilities.map((cap, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-cyber-purple-light cursor-pointer hover:border-red-500"
                  onClick={() => removeCapability(index)}
                >
                  {cap} ×
                </Badge>
              ))}
            </div>
            {errors.capabilities && (
              <p className="text-red-500 text-xs mt-1">{errors.capabilities}</p>
            )}
          </div>

          {formData.participantType !== 'agent' && (
            <div className="space-y-2">
              <label className="text-sm text-gray-400 flex items-center">
                <Users className="mr-2 h-4 w-4 text-neon-purple" />
                Minimum Rank
              </label>
              <Input
                type="number"
                min={0}
                value={formData.minimumRank || 0}
                onChange={(e) => handleFieldChange('minimumRank', parseInt(e.target.value))}
                className={errors.minimumRank ? 'border-red-500' : ''}
              />
              {errors.minimumRank && (
                <p className="text-red-500 text-xs mt-1">{errors.minimumRank}</p>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-end space-x-4">
          <Button
            type="submit"
            disabled={isSubmitting || Object.keys(errors).length > 0}
            className="bg-neon-pink hover:bg-neon-pink/80 text-black font-bold"
          >
            {isSubmitting ? 'Creating...' : 'Create Mission'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
