'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@H1V3M1ND/ui';
import { ArrowLeft, Clock, Users, Timer, Coins, Award, Check } from 'lucide-react';
import {
  MissionWithHistory,
  MissionStatus,
  MultiParticipantRequirements,
  SingleParticipantRequirements,
} from '@H1V3M1ND/types';
import { VerificationUpload } from '@/components/missions/verification/VerificationUpload';
import { getMissionTimeColor } from '@/lib/utils/mission';

export default function MissionPage() {
  const params = useParams();
  const [mission, setMission] = useState<MissionWithHistory | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [statusColor, setStatusColor] = useState<string>('');

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchMission = async () => {
      const response = await fetch(`/api/missions/${params.id}`);
      const data = await response.json();
      setMission(data);
    };

    fetchMission();
  }, [params.id]);

  useEffect(() => {
    if (!mission) return;

    const updateTimer = () => {
      const now = Date.now();
      const expiry = mission.expiryDate;
      const remaining = expiry - now;

      if (remaining <= 0) {
        setTimeRemaining('Expired');
        setStatusColor('bg-cyber-gray');
        return 0;
      }

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      let timeString = '';
      if (hours > 0) {
        timeString = `${hours}h remaining`;
      } else if (minutes > 0) {
        timeString = `${minutes}m remaining`;
      } else {
        timeString = `${seconds}s remaining`;
      }

      setTimeRemaining(timeString);
      const totalDuration = mission.duration * 60 * 60 * 1000;
      const percentageRemaining = (remaining / totalDuration) * 100;
      setStatusColor(getMissionTimeColor(percentageRemaining));

      // Update interval based on remaining time
      return hours > 0 ? 60000 : minutes > 0 ? 1000 : 100;
    };

    const interval = setInterval(updateTimer, updateTimer());

    return () => clearInterval(interval);
  }, [mission]);

  const handleUpload = async (files: File[]) => {
    // TODO: Implement file upload logic
    console.log('Uploading files:', files);
  };

  const handleLocationSubmit = async (coords: { latitude: number; longitude: number }) => {
    // TODO: Implement location verification logic
    console.log('Verifying location:', coords);
  };

  if (!mission) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-cyber-gray">Loading mission...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-cyber-gray hover:text-neon-cyan hover:bg-cyber-dark/50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className={`w-1 h-8 rounded-full ${statusColor}`} />
            <h1 className="text-2xl font-bold text-neon-cyan">{mission.title}</h1>
          </div>
          <p className="text-cyber-gray mt-1">{mission.description}</p>
        </div>
      </div>

      {/* Mission Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-cyber-dark/80 p-4 rounded-lg border-2 border-cyber-purple hover:border-neon-cyan transition-colors">
          <div className="text-cyber-yellow text-sm flex items-center gap-2">
            <Users className="w-4 h-4" />
            Team Size
          </div>
          <div className="text-cyber-yellow text-lg font-semibold">{mission.teamSize}</div>
        </div>
        <div className="bg-cyber-dark/80 p-4 rounded-lg border-2 border-cyber-purple hover:border-neon-cyan transition-colors">
          <div className="text-matrix-green text-sm flex items-center gap-2">
            <Timer className="w-4 h-4" />
            Duration
          </div>
          <div className="text-matrix-green text-lg font-semibold">{mission.duration}h</div>
        </div>
        <div className="bg-cyber-dark/80 p-4 rounded-lg border-2 border-cyber-purple hover:border-neon-cyan transition-colors">
          <div className="text-neon-cyan text-sm flex items-center gap-2">
            <Coins className="w-4 h-4" />
            Reward
          </div>
          <div className="text-neon-cyan text-lg font-semibold">{mission.reward}</div>
        </div>
        <div className="bg-cyber-dark/80 p-4 rounded-lg border-2 border-cyber-purple hover:border-neon-cyan transition-colors">
          <div className="text-neon-pink text-sm flex items-center gap-2">
            <Award className="w-4 h-4" />
            XP Gained
          </div>
          <div className="text-neon-pink text-lg font-semibold">{mission.xpGained}</div>
        </div>
      </div>

      {/* Time Remaining */}
      {mission.status === MissionStatus.InProgress && (
        <div className="flex items-center gap-2 text-lg">
          <Clock className={`w-5 h-5 ${statusColor.replace('bg-', 'text-')}`} />
          <span className={`font-mono ${statusColor.replace('bg-', 'text-')}`}>
            {timeRemaining}
          </span>
        </div>
      )}

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Objectives */}
        <div className="space-y-6">
          <div className="bg-cyber-dark/80 border-2 border-cyber-purple hover:border-neon-cyan transition-colors rounded-lg p-6">
            <h2 className="text-xl font-bold text-neon-cyan mb-4">Mission Objectives</h2>
            <div className="space-y-4">
              {mission.objectives?.map((objective, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-start gap-2 font-mono">
                    <span className="text-cyber-gray">$</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-cyber-purple hover:text-cyber-purple-light transition-colors">
                          {objective.task}
                        </span>
                        {objective.verifiedAt ? (
                          <span className="text-neon-cyan text-sm flex items-center gap-1">
                            <Check className="w-4 h-4" />
                            Verified
                          </span>
                        ) : (
                          objective.verification &&
                          mission.status === MissionStatus.InProgress && (
                            <VerificationUpload
                              verification={objective.verification}
                              onUpload={handleUpload}
                              onLocationSubmit={handleLocationSubmit}
                            />
                          )
                        )}
                      </div>
                      <p className="text-cyber-gray text-sm mt-1">{objective.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Mission Info */}
        <div className="space-y-6">
          {/* Failure Conditions */}
          <div className="bg-cyber-dark/80 border-2 border-cyber-purple hover:border-neon-cyan transition-colors rounded-lg p-6">
            <h2 className="text-xl font-bold text-neon-cyan mb-4">Failure Conditions</h2>
            <div className="space-y-4">
              {mission.failureConditions?.map((condition, index) => (
                <div key={index} className="flex items-start gap-2 font-mono">
                  <span className="text-cyber-gray">$</span>
                  <div>
                    <div className="text-neon-pink hover:text-neon-pink/80 transition-colors">
                      [!] {condition.description}
                    </div>
                    <div className="text-cyber-gray text-sm">
                      Type: {condition.type} | Category: {condition.category} | Severity:{' '}
                      {condition.severity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-cyber-dark/80 border-2 border-cyber-purple hover:border-neon-cyan transition-colors rounded-lg p-6">
            <h2 className="text-xl font-bold text-neon-cyan mb-4">Requirements</h2>
            <div className="space-y-4">
              {mission.requirements?.capabilities?.map((capability, index) => (
                <div key={index} className="flex items-start gap-2 font-mono">
                  <span className="text-cyber-gray">$</span>
                  <div className="text-cyber-purple hover:text-cyber-purple-light transition-colors">
                    {capability}
                  </div>
                </div>
              ))}
              {(mission.requirements as SingleParticipantRequirements)?.minimumRank && (
                <div className="flex items-start gap-2 font-mono">
                  <span className="text-cyber-gray">$</span>
                  <div className="text-cyber-purple hover:text-cyber-purple-light transition-colors">
                    Minimum Rank:{' '}
                    {(mission.requirements as SingleParticipantRequirements).minimumRank}
                  </div>
                </div>
              )}
              {(mission.requirements as MultiParticipantRequirements)?.minParticipants && (
                <div className="flex items-start gap-2 font-mono">
                  <span className="text-cyber-gray">$</span>
                  <div className="text-cyber-purple hover:text-cyber-purple-light transition-colors">
                    Team Size:{' '}
                    {(mission.requirements as MultiParticipantRequirements).minParticipants}-
                    {(mission.requirements as MultiParticipantRequirements).maxParticipants}{' '}
                    participants
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
