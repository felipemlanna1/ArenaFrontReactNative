import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { StepperProps } from './typesStepper';
import { useStepper } from './useStepper';
import { styles } from './stylesStepper';

export const Stepper: React.FC<StepperProps> = ({
  currentStep,
  totalSteps = 3,
  steps,
  variant = 'dots',
  onStepPress,
  allowSkip = false,
  testID,
}) => {
  const {
    isStepActive,
    isStepCompleted,
    canNavigateToStep,
    handleStepPress,
    stepsArray,
  } = useStepper({
    currentStep,
    totalSteps: steps?.length || totalSteps,
    steps,
    allowSkip,
    onStepPress,
  });

  const renderDots = () => (
    <View style={styles.container} testID={testID}>
      {stepsArray.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            isStepActive(index) && styles.dotActive,
            isStepCompleted(index) && styles.dotCompleted,
          ]}
        />
      ))}
    </View>
  );

  const renderNumbers = () => (
    <View style={styles.container} testID={testID}>
      {stepsArray.map((step, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <View
              style={[
                styles.connector,
                isStepCompleted(index - 1) && styles.connectorCompleted,
              ]}
            />
          )}
          <TouchableOpacity
            onPress={() => handleStepPress(index)}
            disabled={!canNavigateToStep(index) || !onStepPress}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.numberContainer,
                isStepActive(index) && styles.numberContainerActive,
                isStepCompleted(index) && styles.numberContainerCompleted,
              ]}
            >
              <Text
                variant="bodyPrimary"
                style={
                  [
                    styles.numberText,
                    isStepActive(index) && styles.numberTextActive,
                    isStepCompleted(index) && styles.numberTextCompleted,
                  ].filter(Boolean) as never
                }
              >
                {index + 1}
              </Text>
            </View>
          </TouchableOpacity>
        </React.Fragment>
      ))}
    </View>
  );

  const renderLabels = () => (
    <View style={styles.container} testID={testID}>
      {stepsArray.map((step, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <View
              style={[
                styles.connector,
                isStepCompleted(index - 1) && styles.connectorCompleted,
              ]}
            />
          )}
          <TouchableOpacity
            style={styles.stepWrapper}
            onPress={() => handleStepPress(index)}
            disabled={!canNavigateToStep(index) || !onStepPress}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.numberContainer,
                isStepActive(index) && styles.numberContainerActive,
                isStepCompleted(index) && styles.numberContainerCompleted,
              ]}
            >
              <Text
                variant="bodyPrimary"
                style={
                  [
                    styles.numberText,
                    isStepActive(index) && styles.numberTextActive,
                    isStepCompleted(index) && styles.numberTextCompleted,
                  ].filter(Boolean) as never
                }
              >
                {index + 1}
              </Text>
            </View>
            {step.label && (
              <Text
                variant="captionSecondary"
                style={
                  [
                    styles.label,
                    isStepActive(index) && styles.labelActive,
                    isStepCompleted(index) && styles.labelCompleted,
                  ].filter(Boolean) as never
                }
              >
                {step.label}
              </Text>
            )}
          </TouchableOpacity>
        </React.Fragment>
      ))}
    </View>
  );

  if (variant === 'numbers') return renderNumbers();
  if (variant === 'labels') return renderLabels();
  return renderDots();
};
