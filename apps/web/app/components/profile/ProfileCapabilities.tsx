'use client';

import { Badge } from '@/components/ui';
import { Brain, Code, Shield, Network } from 'lucide-react';

interface Capability {
  name: string;
  level: number;
  category: 'ai' | 'development' | 'security' | 'network';
}

interface ProfileCapabilitiesProps {
  capabilities: Capability[];
}

export function ProfileCapabilities({ capabilities }: ProfileCapabilitiesProps) {
  const getCategoryIcon = (category: Capability['category']) => {
    switch (category) {
      case 'ai':
        return Brain;
      case 'development':
        return Code;
      case 'security':
        return Shield;
      case 'network':
        return Network;
      default:
        return Brain;
    }
  };

  const getLevelColor = (level: number) => {
    if (level >= 8) return 'bg-neon-pink/20 text-neon-pink border-neon-pink/50';
    if (level >= 6) return 'bg-cyber-purple/20 text-cyber-purple border-cyber-purple/50';
    if (level >= 4) return 'bg-blue-500/20 text-blue-400 border-blue-400/50';
    return 'bg-gray-500/20 text-gray-400 border-gray-400/50';
  };

  return (
    <div className="bg-cyber-dark border border-cyber-purple/50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Capabilities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {capabilities.map((capability) => {
          const Icon = getCategoryIcon(capability.category);
          return (
            <div
              key={capability.name}
              className="flex items-center justify-between p-3 border border-cyber-purple/20 rounded-lg bg-black/20"
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5 text-cyber-purple-light" />
                <span className="text-white">{capability.name}</span>
              </div>
              <Badge variant="outline" className={getLevelColor(capability.level)}>
                Level {capability.level}
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
}
