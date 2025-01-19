'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, ArrowRight, Wallet } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Button,
  Progress,
} from '@H1V3M1ND/ui';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  amount: number;
  onConfirm: () => Promise<void>;
}

type TransactionStatus = 'initial' | 'processing' | 'success' | 'error';

export function TransactionModal({
  isOpen,
  onClose,
  title,
  description,
  amount,
  onConfirm,
}: TransactionModalProps) {
  const [status, setStatus] = useState<TransactionStatus>('initial');
  const [error, setError] = useState<string>('');

  const handleConfirm = async () => {
    try {
      setStatus('processing');
      await onConfirm();
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('initial');
      }, 2000);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Transaction failed');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-cyber-dark border-cyber-purple/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-cyber-purple" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {status === 'initial' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-cyber-dark/50 border border-cyber-purple/20">
                <span className="text-sm text-gray-400">Amount</span>
                <span className="font-medium">{amount} P89</span>
              </div>

              <Button
                onClick={handleConfirm}
                className="w-full bg-gradient-to-r from-cyber-purple to-neon-pink hover:from-neon-pink hover:to-cyber-purple"
              >
                Confirm Transaction
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {status === 'processing' && (
            <div className="space-y-4 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-cyber-purple" />
              <div>
                <p className="font-medium">Processing Transaction</p>
                <p className="text-sm text-gray-400">Please wait...</p>
              </div>
              <Progress value={66} className="w-full" />
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4 text-center">
              <CheckCircle2 className="h-8 w-8 mx-auto text-green-500" />
              <div>
                <p className="font-medium text-green-400">Transaction Successful</p>
                <p className="text-sm text-gray-400">Your transaction has been confirmed</p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <div className="text-center">
                <AlertCircle className="h-8 w-8 mx-auto text-red-500" />
                <p className="font-medium text-red-400 mt-2">Transaction Failed</p>
                <p className="text-sm text-gray-400">{error}</p>
              </div>
              <Button onClick={() => setStatus('initial')} variant="outline" className="w-full">
                Try Again
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
