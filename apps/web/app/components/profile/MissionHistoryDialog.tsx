'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, Button, Badge } from '@H1V3M1ND/ui';
import {
  Clock,
  Coins,
  Users,
  Check,
  AlertTriangle,
  AlertCircle,
  AlertOctagon,
  ExternalLink,
  Upload,
  Camera,
  MapPin,
  Video,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ExtendedMission,
  MissionStatus,
  VerificationType,
  MissionObjective,
  FailureRecord,
} from '@/lib/types/missions';

interface MissionHistoryDialogProps {
  mission: ExtendedMission;
  isOpen: boolean;
  onClose: () => void;
}

const getMissionStatusStyle = (status: MissionStatus) => {
  switch (status) {
    case MissionStatus.Active:
      return { color: 'matrix-green', label: 'Active' };
    case MissionStatus.InProgress:
      return { color: 'cyber-yellow', label: 'In Progress' };
    case MissionStatus.PendingValidation:
      return { color: 'cyber-purple', label: 'Pending Validation' };
    case MissionStatus.InValidation:
      return { color: 'cyber-purple-light', label: 'Under Review' };
    case MissionStatus.Completed:
      return { color: 'neon-cyan', label: 'Completed' };
    case MissionStatus.Failed:
      return { color: 'red-500', label: 'Failed' };
    case MissionStatus.Expired:
      return { color: 'red-500/70', label: 'Expired' };
    default:
      return { color: 'gray-500', label: status };
  }
};

export function MissionHistoryDialog({ mission, isOpen, onClose }: MissionHistoryDialogProps) {
  const statusStyle = getMissionStatusStyle(mission.status);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [statusColor, setStatusColor] = useState<string>('text-emerald-400');

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (expiryDate: number) => {
    const now = Date.now();
    const remaining = expiryDate - now;
    const duration = mission.duration * 60 * 60 * 1000;
    const percentageRemaining = (remaining / duration) * 100;

    if (remaining <= 0) return 'text-red-400';
    if (percentageRemaining <= 10) {
      return 'text-red-400';
    } else if (percentageRemaining <= 40) {
      return 'text-cyber-yellow';
    } else {
      return 'text-emerald-400';
    }
  };

  const calculateTimeRemaining = (expiryDate: number) => {
    const now = Date.now();
    const remaining = expiryDate - now;
    if (remaining <= 0) return 'Expired';

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    if (hours > 0) {
      return `${hours}h remaining`;
    } else if (minutes > 0) {
      return `${minutes}m remaining`;
    } else {
      return `${seconds}s remaining`;
    }
  };

  useEffect(() => {
    if (mission.status === MissionStatus.Active) {
      // Initial calculation
      const initialTime = calculateTimeRemaining(mission.expiryDate);
      setTimeRemaining(initialTime);
      setStatusColor(getStatusColor(mission.expiryDate));

      // Update interval based on remaining time
      const updateTimer = () => {
        const now = Date.now();
        const msRemaining = mission.expiryDate - now;

        // Set update frequency based on remaining time
        let interval = 1000; // default to 1 second
        if (msRemaining > 3600000) {
          // > 1 hour
          interval = 60000; // update every minute
        } else if (msRemaining > 60000) {
          // > 1 minute
          interval = 1000; // update every second
        }

        const timeString = calculateTimeRemaining(mission.expiryDate);
        setTimeRemaining(timeString);
        setStatusColor(getStatusColor(mission.expiryDate));

        if (timeString === 'Expired') {
          clearInterval(timer);
        }

        return interval;
      };

      // Initial interval
      let interval = updateTimer();
      const timer = setInterval(updateTimer, interval);

      return () => clearInterval(timer);
    }
  }, [mission.expiryDate, mission.status, mission.duration]);

  const getVerificationButton = (type: VerificationType) => {
    switch (type) {
      case VerificationType.Photo:
      case VerificationType.MultiPhoto:
        return (
          <Button
            variant="outline"
            size="sm"
            className="text-neon-cyan hover:text-neon-cyan/80 hover:bg-neon-cyan/10"
          >
            <Camera className="w-4 h-4 mr-2" />
            Upload Photo
          </Button>
        );
      case VerificationType.Video:
        return (
          <Button
            variant="outline"
            size="sm"
            className="text-neon-cyan hover:text-neon-cyan/80 hover:bg-neon-cyan/10"
          >
            <Video className="w-4 h-4 mr-2" />
            Upload Video
          </Button>
        );
      case VerificationType.AutoGPS:
        return (
          <Button
            variant="outline"
            size="sm"
            className="text-matrix-green hover:text-matrix-green/80 hover:bg-matrix-green/10"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Verify Location
          </Button>
        );
      case VerificationType.ManualGPS:
        return (
          <Button
            variant="outline"
            size="sm"
            className="text-neon-cyan hover:text-neon-cyan/80 hover:bg-neon-cyan/10"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Submit Location
          </Button>
        );
      default:
        return (
          <Button
            variant="outline"
            size="sm"
            className="text-neon-cyan hover:text-neon-cyan/80 hover:bg-neon-cyan/10"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Verification
          </Button>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-cyber-dark border-2 border-cyber-purple-light h-[80vh] sm:max-w-[800px] w-[90vw] z-50 flex flex-col px-0">
        <DialogHeader className="space-y-4 relative px-10 pt-2">
          {/* Status and Timer */}
          <div className="flex items-center gap-2">
            <div className={`w-1 h-8 ${statusColor.replace('text-', 'bg-')}`} />
            {mission.status === MissionStatus.Active && timeRemaining && (
              <div className="flex items-center gap-2 text-lg">
                <Clock className={cn('w-5 h-5', statusColor)} />
                <span className={cn('font-medium', statusColor)}>{timeRemaining}</span>
              </div>
            )}
          </div>

          {/* Mission Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              variant="outline"
              className="border-cyber-yellow text-cyber-yellow font-medium flex items-center gap-1.5"
            >
              <Users className="w-4 h-4" />
              {mission.teamSize > 1 ? mission.teamSize : 'Solo'}
            </Badge>
            <Badge variant="outline" className="border-neon-pink text-neon-pink font-medium">
              <Clock className="h-4 w-4 mr-1 inline-block" />
              {mission.duration}h
            </Badge>
            <Badge
              variant="outline"
              className={cn(
                'transition-all duration-200',
                mission.status === MissionStatus.Completed
                  ? 'border-neon-cyan text-neon-cyan drop-shadow-[0_0_3px_rgba(0,255,255,0.5)]'
                  : 'border-neon-cyan/60 text-neon-cyan/60'
              )}
            >
              <Coins className="h-4 w-4 mr-1 inline-block" />
              {mission.reward} Project89
            </Badge>
          </div>

          {/* Title and Description */}
          <DialogTitle className="text-3xl font-bold text-neon-cyan tracking-tight">
            {mission.title}
          </DialogTitle>
          <p className="text-base text-white leading-relaxed font-medium">{mission.description}</p>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 px-10 py-6 pt-1 overflow-y-auto hover:pr-8 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-cyber-dark [&::-webkit-scrollbar-thumb]:bg-cyber-purple-light [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-cyber-purple/30">
          <div className="space-y-6">
            {/* Mission Objectives */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-neon-pink tracking-wide">Mission Objectives</h4>
              <div className="bg-cyber-black rounded-lg p-6 border-2 border-cyber-purple-light h-[200px] overflow-y-auto hover:pr-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-cyber-dark [&::-webkit-scrollbar-thumb]:bg-cyber-purple-light [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-cyber-purple/30">
                {mission.objectives.map((objective, index) => (
                  <div key={index} className="flex gap-3 mb-4 last:mb-0">
                    <div
                      className={cn(
                        'w-5 h-5 border rounded flex items-center justify-center mt-1',
                        objective.completed
                          ? 'bg-neon-cyan border-neon-cyan'
                          : 'border-neon-cyan hover:bg-neon-cyan/10'
                      )}
                    >
                      {objective.completed && <Check className="w-4 h-4 text-black" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-base text-cyber-purple-light mb-1">
                        {objective.task}
                      </p>
                      <p className="text-cyber-gray text-sm">{objective.details}</p>
                      {objective.completed && objective.verifiedAt && (
                        <p className="text-xs text-cyber-gray mt-1">
                          Verified {formatDate(objective.verifiedAt)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Failure Records or Conditions */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-neon-pink tracking-wide">
                {mission.status === MissionStatus.Active
                  ? 'Failure Conditions'
                  : mission.status === MissionStatus.Failed
                    ? 'Failure Records'
                    : 'Mission Conditions'}
              </h4>
              <div className="bg-cyber-black rounded-lg p-6 border-2 border-cyber-purple-light h-[200px] overflow-y-auto hover:pr-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-cyber-dark [&::-webkit-scrollbar-thumb]:bg-cyber-purple-light [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-cyber-purple/30">
                <div className="space-y-3">
                  {mission.status === MissionStatus.Failed && mission.failureRecords
                    ? mission.failureRecords.map((record, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 bg-cyber-dark/50 rounded-md p-3"
                        >
                          <AlertOctagon className="h-5 w-5 text-red-500 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-cyber-gray mb-1">
                              Failed on {formatDate(record.occurredAt)}
                            </p>
                            <p className="text-red-500 font-medium">{record.details}</p>
                            {record.disputed && (
                              <div className="mt-2 pt-2 border-t border-cyber-purple/20">
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    'text-xs',
                                    record.disputeStatus === 'accepted'
                                      ? 'border-matrix-green text-matrix-green'
                                      : record.disputeStatus === 'rejected'
                                        ? 'border-red-500 text-red-500'
                                        : 'border-cyber-yellow text-cyber-yellow'
                                  )}
                                >
                                  Dispute {record.disputeStatus}
                                </Badge>
                                {record.disputeDetails && (
                                  <p className="text-sm text-cyber-gray mt-2">
                                    {record.disputeDetails}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    : mission.failureConditions?.map((condition, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 bg-cyber-dark/50 rounded-md p-3"
                        >
                          <AlertTriangle className="h-5 w-5 text-cyber-yellow mt-0.5" />
                          <p className="text-cyber-gray font-medium">{condition.description}</p>
                        </div>
                      ))}
                </div>
              </div>
            </div>

            {/* Token Payout for Completed Missions */}
            {mission.status === MissionStatus.Completed && mission.tokenPayout && (
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-neon-pink tracking-wide">Reward Payout</h4>
                <div className="bg-cyber-black rounded-lg p-6 border-2 border-cyber-purple-light">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-cyber-gray">Amount</span>
                    <span className="text-neon-pink font-bold">
                      {mission.tokenPayout.amount} Project89
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-cyber-gray">Transaction</span>
                    <Button
                      variant="link"
                      className="text-neon-cyan hover:text-neon-cyan/80 p-0 h-auto font-mono text-sm"
                      onClick={() =>
                        window.open(`https://etherscan.io/tx/${mission.tokenPayout!.txHash}`)
                      }
                    >
                      {mission.tokenPayout.txHash.slice(0, 6)}...
                      {mission.tokenPayout.txHash.slice(-4)}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
