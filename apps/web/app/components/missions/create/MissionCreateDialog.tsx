'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
} from '@H1V3M1ND/ui';
import { Mission, MissionType, MultiParticipantMission } from '@H1V3M1ND/types';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { RequirementsStep } from './steps/RequirementsStep';
import { ParticipantsStep } from './steps/ParticipantsStep';
import { FailureConditionsStep } from './steps/FailureConditionsStep';
import { PreviewStep } from './steps/PreviewStep';

export interface MissionCreateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mission: Partial<Mission>) => Promise<void>;
}

type Step = 'basic' | 'requirements' | 'participants' | 'failure' | 'preview';

const STEPS: Step[] = ['basic', 'requirements', 'participants', 'failure', 'preview'];

const getStepTitle = (step: Step) => {
  switch (step) {
    case 'basic':
      return 'Basic Information';
    case 'requirements':
      return 'Mission Requirements';
    case 'participants':
      return 'Participant Details';
    case 'failure':
      return 'Failure Conditions';
    case 'preview':
      return 'Mission Preview';
  }
};

const validateBasicInfo = (data: Partial<Mission>): boolean => {
  return !!(data.title?.trim() && data.description?.trim() && data.type);
};

const validateRequirements = (data: Partial<Mission>): boolean => {
  const hasBaseRequirements = !!(
    data.baseRequirements?.timeLimit && data.baseRequirements?.stakeAmount
  );

  if (!hasBaseRequirements) return false;

  if (data.type === MissionType.Single) {
    return true; // Optional requirements for single participant missions
  } else {
    const multiData = data as Partial<MultiParticipantMission>;
    return !!(
      multiData.requirements?.minParticipants &&
      multiData.requirements?.maxParticipants &&
      multiData.requirements.minParticipants <= multiData.requirements.maxParticipants
    );
  }
};

const validateParticipants = (data: Partial<Mission>): boolean => {
  if (data.type === MissionType.Single) {
    return true; // Optional for single participant missions
  } else {
    const multiData = data as Partial<MultiParticipantMission>;
    return !!(
      multiData.requirements?.composition?.teamStructure &&
      multiData.requirements?.composition?.roleDistribution
    );
  }
};

const validateFailureConditions = (data: Partial<Mission>): boolean => {
  return !!(data.failureConditions && data.failureConditions.length > 0);
};

export function MissionCreateDialog({ isOpen, onClose, onSubmit }: MissionCreateDialogProps) {
  const [currentStep, setCurrentStep] = useState<Step>('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [missionData, setMissionData] = useState<Partial<Mission>>({
    type: MissionType.Single, // Default to single participant mission
  });

  const currentStepIndex = STEPS.indexOf(currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === STEPS.length - 1;

  const canProceed = () => {
    switch (currentStep) {
      case 'basic':
        return validateBasicInfo(missionData);
      case 'requirements':
        return validateRequirements(missionData);
      case 'participants':
        return validateParticipants(missionData);
      case 'failure':
        return validateFailureConditions(missionData);
      case 'preview':
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!isLastStep && canProceed()) {
      const nextStep = STEPS[currentStepIndex + 1];
      if (nextStep) {
        setCurrentStep(nextStep);
      }
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      const prevStep = STEPS[currentStepIndex - 1];
      if (prevStep) {
        setCurrentStep(prevStep);
      }
    }
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(missionData);
      onClose();
    } catch (error) {
      console.error('Failed to create mission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'basic':
        return <BasicInfoStep data={missionData} onUpdate={setMissionData} />;
      case 'requirements':
        return <RequirementsStep data={missionData} onUpdate={setMissionData} />;
      case 'participants':
        return <ParticipantsStep data={missionData} onUpdate={setMissionData} />;
      case 'failure':
        return <FailureConditionsStep data={missionData} onUpdate={setMissionData} />;
      case 'preview':
        return <PreviewStep data={missionData} />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="cyber-card sm:max-w-[600px]">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/10 to-neon-pink/10 pointer-events-none" />

        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-glow-pink">
            Create New Mission
          </DialogTitle>
          <div className="flex items-center justify-between mt-2">
            <div className="text-sm text-gray-400">
              Step {currentStepIndex + 1} of {STEPS.length}
            </div>
            <div className="text-cyber-purple-light">{getStepTitle(currentStep)}</div>
          </div>
        </DialogHeader>

        <div className="min-h-[400px] py-6">{renderStep()}</div>

        <DialogFooter className="border-t border-cyber-purple pt-4 flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={isFirstStep || isSubmitting}
            className="mr-auto"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {isLastStep ? (
            <Button onClick={handleSubmit} disabled={isSubmitting || !canProceed()}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Mission'
              )}
            </Button>
          ) : (
            <Button onClick={handleNext} disabled={!canProceed()}>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
