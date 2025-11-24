export type StepperVariant = 'dots' | 'numbers' | 'labels';

export interface Step {
  label?: string;
  completed?: boolean;
}

export interface StepperProps {
  currentStep: number;
  totalSteps?: number;
  steps?: Step[];
  variant?: StepperVariant;
  onStepPress?: (step: number) => void;
  allowSkip?: boolean;
  showProgress?: boolean;
  testID?: string;
}

export interface UseStepperParams {
  currentStep: number;
  totalSteps: number;
  steps?: Step[];
  allowSkip: boolean;
  onStepPress?: (step: number) => void;
}

export interface UseStepperReturn {
  isStepActive: (index: number) => boolean;
  isStepCompleted: (index: number) => boolean;
  canNavigateToStep: (index: number) => boolean;
  handleStepPress: (index: number) => void;
  stepsArray: Step[];
}
