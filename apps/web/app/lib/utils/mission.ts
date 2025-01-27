import { MissionStatus } from '../types/missions';

export function getMissionTimeColor(percentageRemaining: number): string {
  // Calculate hue based on percentage (120 = green, 60 = yellow, 0 = red)
  const hue = Math.max(0, Math.min(120, percentageRemaining * 1.2));
  return `bg-[hsl(${hue},100%,50%)]`;
}

export function calculateTimeRemaining(expiryDate: number): string {
  const now = Date.now();
  const remaining = expiryDate - now;

  if (remaining <= 0) {
    return 'Expired';
  }

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
}

export const getMissionStatusStyle = (status: MissionStatus) => {
  switch (status) {
    case MissionStatus.Available:
      return { color: 'border-matrix-green text-matrix-green', label: 'Available' };
    case MissionStatus.PendingStake:
      return { color: 'border-cyber-orange text-cyber-orange', label: 'Awaiting Stake' };
    case MissionStatus.Active:
      return { color: 'border-cyber-yellow text-cyber-yellow', label: 'Active' };
    case MissionStatus.InProgress:
      return { color: 'border-cyber-yellow/70 text-cyber-yellow/70', label: 'In Progress' };
    case MissionStatus.PendingValidation:
      return { color: 'border-cyber-purple text-cyber-purple', label: 'Pending Validation' };
    case MissionStatus.InValidation:
      return { color: 'border-cyber-purple-light text-cyber-purple-light', label: 'Under Review' };
    case MissionStatus.Completed:
      return { color: 'border-neon-cyan text-neon-cyan', label: 'Completed' };
    case MissionStatus.Failed:
      return { color: 'border-red-500 text-red-500', label: 'Failed' };
    case MissionStatus.Expired:
      return { color: 'border-red-500/70 text-red-500/70', label: 'Expired' };
    default:
      return { color: 'border-gray-500 text-gray-500', label: status };
  }
};
