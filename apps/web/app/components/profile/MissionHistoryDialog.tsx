'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Badge,
  DialogDescription,
} from '@H1V3M1ND/ui';
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
import { getMissionTimeColor, calculateTimeRemaining } from '@/lib/utils/mission';
import {
  MissionWithHistory,
  MissionStatus,
  VerificationType,
  MissionObjective,
  FailureRecord,
  VerificationRequirement,
} from '@H1V3M1ND/types';

interface MissionHistoryDialogProps {
  mission: MissionWithHistory;
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
  const [statusColor, setStatusColor] = useState<string>('');

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  useEffect(() => {
    if (mission?.status === MissionStatus.Active) {
      let timer: NodeJS.Timeout;

      const updateTimer = () => {
        const now = Date.now();
        const remaining = mission.expiryDate - now;
        const duration = mission.duration * 60 * 60 * 1000;
        const percentageRemaining = (remaining / duration) * 100;

        const timeString = calculateTimeRemaining(remaining);
        setTimeRemaining(timeString);
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

  const getVerificationButton = (verification: VerificationRequirement) => {
    switch (verification.type) {
      case VerificationType.Photo:
      case VerificationType.MultiPhoto:
        return (
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="text-neon-cyan hover:text-neon-cyan/80 hover:bg-neon-cyan/10"
            >
              <Camera className="w-4 h-4 mr-2" />
              Upload Photo{' '}
              {verification.type === VerificationType.MultiPhoto &&
                verification.metadata?.minPhotos &&
                `(1/${verification.metadata.minPhotos})`}
            </Button>
            {verification.type === VerificationType.MultiPhoto &&
              verification.metadata?.minPhotos && (
                <p className="text-xs text-cyber-gray">
                  {'>'} Minimum {verification.metadata.minPhotos} photos required
                </p>
              )}
          </div>
        );
      case VerificationType.Video:
        return (
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="text-neon-cyan hover:text-neon-cyan/80 hover:bg-neon-cyan/10"
            >
              <Video className="w-4 h-4 mr-2" />
              Upload Video
            </Button>
            {verification.metadata?.maxVideoLength && (
              <p className="text-xs text-cyber-gray">
                {'>'} Maximum length: {verification.metadata.maxVideoLength} seconds
              </p>
            )}
          </div>
        );
      case VerificationType.AutoGPS:
      case VerificationType.ManualGPS:
        return (
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="text-neon-cyan hover:text-neon-cyan/80 hover:bg-neon-cyan/10"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Verify Location
            </Button>
            {verification.metadata?.gpsCoordinates && (
              <p className="text-xs text-cyber-gray">
                {'>'} Required coordinates: {verification.metadata.gpsCoordinates.latitude},{' '}
                {verification.metadata.gpsCoordinates.longitude}
              </p>
            )}
          </div>
        );
      case VerificationType.Document:
        return (
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="text-neon-cyan hover:text-neon-cyan/80 hover:bg-neon-cyan/10"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
            {verification.metadata?.allowedFileTypes && (
              <p className="text-xs text-cyber-gray">
                {'>'} Allowed types: {verification.metadata.allowedFileTypes.join(', ')}
              </p>
            )}
          </div>
        );
      case VerificationType.Code:
        return (
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="text-neon-cyan hover:text-neon-cyan/80 hover:bg-neon-cyan/10"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Code
            </Button>
            {verification.metadata?.allowedFileTypes && (
              <p className="text-xs text-cyber-gray">
                {'>'} Allowed types: {verification.metadata.allowedFileTypes.join(', ')}
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-cyber-dark border-2 border-cyber-purple-light h-[80vh] sm:max-w-[800px] w-[90vw] z-50 flex flex-col px-0">
        <DialogHeader className="space-y-4 relative px-10 pt-6">
          {/* Title section with status line and timer */}
          <div className="flex items-start gap-3">
            <div className={`w-1 h-8 rounded-full ${statusColor}`} />
            <div className="flex-1 flex items-center justify-between">
              <DialogTitle className="text-2xl font-semibold text-neon-cyan">
                {mission.title}
              </DialogTitle>
              {mission.status === MissionStatus.Active && timeRemaining && (
                <div className="flex items-center gap-1.5">
                  <Clock
                    className="w-4 h-4"
                    style={{ color: statusColor.replace('bg-', 'text-') }}
                  />
                  <span style={{ color: statusColor.replace('bg-', 'text-') }}>
                    {timeRemaining}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-base text-cyber-gray leading-relaxed">{mission.description}</p>

          {/* Mission Stats */}
          <div className="flex items-center gap-4 pt-2">
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
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 px-10 py-6 pt-1 overflow-y-auto hover:pr-8 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-cyber-dark [&::-webkit-scrollbar-thumb]:bg-cyber-purple-light [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-cyber-purple/30">
          <div className="space-y-6">
            {/* Mission Objectives */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-neon-pink tracking-wide">Mission Objectives</h4>
              <div className="bg-cyber-black rounded-lg p-6 border-2 border-cyber-purple-light h-[200px] overflow-y-auto hover:pr-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-cyber-dark [&::-webkit-scrollbar-thumb]:bg-cyber-purple-light [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-cyber-purple-light">
                {mission.objectives.map((objective, index) => (
                  <div key={index} className="flex gap-3 mb-4 last:mb-0">
                    <div className="font-mono text-lg text-neon-cyan/80 mt-1">
                      {objective.completed ? '[✓]' : '[_]'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-base text-cyber-purple-light">
                          {objective.task}
                        </p>
                        {objective.completed && objective.verifiedAt && (
                          <p className="text-xs text-neon-pink font-mono">
                            {formatDate(objective.verifiedAt)}
                          </p>
                        )}
                      </div>
                      <p className="text-cyber-gray text-sm">{objective.details}</p>
                      {mission.status === MissionStatus.Active && !objective.completed && (
                        <div className="mt-2">
                          <Badge
                            variant="outline"
                            className="text-xs border-neon-cyan text-neon-cyan"
                          >
                            {objective.verification?.type.replace('_', ' ')} verification required
                          </Badge>
                        </div>
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

            {/* Add a link to the full mission page for active missions */}
            {mission.status === MissionStatus.Active && (
              <div className="px-10 pb-6">
                <Button
                  variant="outline"
                  className="w-full text-neon-cyan border-neon-cyan hover:bg-neon-cyan/10"
                  onClick={() => (window.location.href = `/missions/${mission.id}`)}
                >
                  Open Mission Control
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
