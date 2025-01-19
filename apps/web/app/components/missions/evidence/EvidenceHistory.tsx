'use client';

import { FileText, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Evidence {
  id: string;
  fileName: string;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  feedback?: string;
}

interface EvidenceHistoryProps {
  evidence: Evidence[];
}

export function EvidenceHistory({ evidence }: EvidenceHistoryProps) {
  const getStatusIcon = (status: Evidence['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-cyber-purple animate-pulse" />;
    }
  };

  const getStatusText = (status: Evidence['status']) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Pending Review';
    }
  };

  if (evidence.length === 0) {
    return (
      <div className="text-center p-8 bg-cyber-dark/30 rounded-lg border border-cyber-purple/20">
        <p className="text-gray-400">No evidence submitted yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {evidence.map((item) => (
        <div
          key={item.id}
          className={cn(
            'p-4 rounded-lg border transition-colors',
            'bg-cyber-dark/30 border-cyber-purple/20',
            item.status === 'approved' && 'border-green-500/30',
            item.status === 'rejected' && 'border-red-500/30'
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-cyber-purple" />
              <span className="font-medium">{item.fileName}</span>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(item.status)}
              <span
                className={cn(
                  'text-sm',
                  item.status === 'approved' && 'text-green-400',
                  item.status === 'rejected' && 'text-red-400',
                  item.status === 'pending' && 'text-cyber-purple'
                )}
              >
                {getStatusText(item.status)}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>
              Submitted {new Date(item.submittedAt).toLocaleDateString()} at{' '}
              {new Date(item.submittedAt).toLocaleTimeString()}
            </span>
          </div>

          {item.feedback && (
            <div className="mt-3 p-2 rounded bg-cyber-dark/50 border-l-2 border-cyber-purple">
              <p className="text-sm">{item.feedback}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
