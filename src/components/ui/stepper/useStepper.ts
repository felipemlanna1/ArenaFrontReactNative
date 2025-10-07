import { useCallback, useMemo } from 'react';
import { UseStepperParams, UseStepperReturn, Step } from './typesStepper';

export const useStepper = ({
  currentStep,
  totalSteps,
  steps,
  allowSkip,
  onStepPress,
}: UseStepperParams): UseStepperReturn => {
  const stepsArray = useMemo((): Step[] => {
    if (steps && steps.length > 0) {
      return steps;
    }
    return Array.from({ length: totalSteps }, (_, i) => ({
      label: `Step ${i + 1}`,
      completed: i < currentStep,
    }));
  }, [steps, totalSteps, currentStep]);

  const isStepActive = useCallback(
    (index: number): boolean => {
      return index === currentStep;
    },
    [currentStep]
  );

  const isStepCompleted = useCallback(
    (index: number): boolean => {
      if (steps && steps[index]) {
        return steps[index].completed || false;
      }
      return index < currentStep;
    },
    [currentStep, steps]
  );

  const canNavigateToStep = useCallback(
    (index: number): boolean => {
      if (allowSkip) return true;
      return index <= currentStep;
    },
    [allowSkip, currentStep]
  );

  const handleStepPress = useCallback(
    (index: number) => {
      if (canNavigateToStep(index) && onStepPress) {
        onStepPress(index);
      }
    },
    [canNavigateToStep, onStepPress]
  );

  return {
    isStepActive,
    isStepCompleted,
    canNavigateToStep,
    handleStepPress,
    stepsArray,
  };
};
