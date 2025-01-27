'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Badge, Button } from '@H1V3M1ND/ui';
import { Clock, Coins, Users, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils/date';
import { getMissionTimeColor, calculateTimeRemaining } from '@/lib/utils/mission';
import { ExtendedMission, MissionStatus } from '@/lib/types/missions';
import { VerificationUpload } from '@/components/missions/verification/VerificationUpload';

export default function MissionPage() {
  const params = useParams();
  const [mission, setMission] = useState<ExtendedMission | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [statusColor, setStatusColor] = useState<string>('');

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchMission = async () => {
      try {
        const response = await fetch(`/api/missions/${params.id}`);
        const data = await response.json();
        setMission(data);
      } catch (error) {
        console.error('Failed to fetch mission:', error);
      }
    };

    fetchMission();
  }, [params.id]);

  useEffect(() => {
    if (mission?.status === MissionStatus.Active) {
      let timer: NodeJS.Timeout;

      const updateTimer = () => {
        const timeString = calculateTimeRemaining(mission.expiryDate);
        setTimeRemaining(timeString);

        const now = Date.now();
        const remaining = mission.expiryDate - now;
        const duration = mission.duration * 60 * 60 * 1000;
        const percentageRemaining = (remaining / duration) * 100;
        setStatusColor(getMissionTimeColor(percentageRemaining));

        if (timeString === 'Expired') {
          clearInterval(timer);
          return 0;
        }

        return remaining > 3600000 ? 60000 : 1000; // Update every minute if > 1h, else every second
      };

      // Initial update
      updateTimer();

      // Set up interval with dynamic update frequency
      const runTimer = () => {
        const interval = updateTimer();
        if (interval > 0) {
          timer = setInterval(updateTimer, interval);
        }
      };

      runTimer();

      return () => {
        if (timer) {
          clearInterval(timer);
        }
      };
    }
  }, [mission]);

  const handleUpload = async (files: File[]) => {
    // TODO: Implement file upload
    console.log('Uploading files:', files);
  };

  const handleLocationSubmit = async (coords: { latitude: number; longitude: number }) => {
    // TODO: Implement location verification
    console.log('Submitting location:', coords);
  };

  if (!mission) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          className="mb-4 text-cyber-gray hover:text-cyber-white"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Missions
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-cyber-white mb-2">{mission.title}</h1>
            <p className="text-cyber-gray mb-4">{mission.description}</p>
          </div>
          {mission.status === MissionStatus.Active && (
            <div className={cn('text-lg font-mono', statusColor)}>{timeRemaining}</div>
          )}
        </div>

        <div className="flex gap-4">
          <Badge variant="outline" className="border-cyber-purple text-cyber-purple">
            <Users className="mr-2 h-4 w-4" />
            Team Size: {mission.teamSize}
          </Badge>
          <Badge variant="outline" className="border-cyber-yellow text-cyber-yellow">
            <Clock className="mr-2 h-4 w-4" />
            Duration: {mission.duration}h
          </Badge>
          <Badge variant="outline" className="border-neon-cyan text-neon-cyan">
            <Coins className="mr-2 h-4 w-4" />
            Reward: {mission.reward}
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Mission Objectives */}
        <div className="space-y-6">
          <div className="bg-cyber-dark/80 border border-cyber-purple/30 rounded-lg p-6">
            <h2 className="text-xl font-bold text-cyber-white mb-4">Mission Objectives</h2>
            <div className="space-y-4">
              {mission.objectives?.map((objective) => (
                <div key={objective.id} className="flex gap-3">
                  <div className="font-mono text-lg">{objective.completed ? '[✓]' : '[_]'}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-cyber-purple">{objective.task}</span>
                      {objective.verifiedAt && (
                        <span className="text-neon-pink font-mono text-sm">
                          {formatDate(objective.verifiedAt)}
                        </span>
                      )}
                    </div>
                    <p className="text-cyber-gray text-sm mt-1">{objective.details}</p>
                    {mission.status === MissionStatus.Active &&
                      !objective.completed &&
                      objective.verification && (
                        <div className="mt-2">
                          <VerificationUpload
                            verification={objective.verification}
                            onUpload={handleUpload}
                            onLocationSubmit={handleLocationSubmit}
                          />
                        </div>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Mission Info */}
        <div className="space-y-6">
          {/* Requirements */}
          <div className="bg-cyber-dark/80 border border-cyber-purple/30 rounded-lg p-6">
            <h2 className="text-xl font-bold text-cyber-white mb-4">Mission Requirements</h2>
            <div className="space-y-4">
              {'minimumRank' in mission.requirements && (
                <div>
                  <h3 className="text-cyber-purple">Minimum Rank</h3>
                  <p className="text-cyber-gray">{mission.requirements.minimumRank}</p>
                </div>
              )}
              {'minParticipants' in mission.requirements && (
                <div>
                  <h3 className="text-cyber-purple">Team Size</h3>
                  <p className="text-cyber-gray">
                    {mission.requirements.minParticipants} - {mission.requirements.maxParticipants}{' '}
                    participants
                  </p>
                </div>
              )}
              <div>
                <h3 className="text-cyber-purple">Required Capabilities</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {mission.requirements.capabilities.map((capability) => (
                    <Badge key={capability} variant="outline" className="border-cyber-purple-light">
                      {capability}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Failure Conditions */}
          <div className="bg-cyber-dark/80 border border-cyber-purple/30 rounded-lg p-6">
            <h2 className="text-xl font-bold text-cyber-white mb-4">Failure Conditions</h2>
            <div className="space-y-4">
              {mission.failureConditions?.map((condition) => (
                <div key={condition.id} className="flex gap-3">
                  <div className="font-mono text-lg text-neon-pink">[!]</div>
                  <div>
                    <p className="text-cyber-white">{condition.description}</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="border-neon-pink/50">
                        {condition.type}
                      </Badge>
                      <Badge variant="outline" className="border-neon-pink/50">
                        {condition.category}
                      </Badge>
                      <Badge variant="outline" className="border-neon-pink/50">
                        {condition.severity}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
