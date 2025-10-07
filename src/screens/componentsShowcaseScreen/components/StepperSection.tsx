import React from 'react';
import { View } from 'react-native';
import { Stepper } from '@/components/ui/stepper';
import { ComponentSection } from '../componentSection';
import { ShowcaseItem } from '../showcaseItem';
import { styles } from '../stylesComponentsShowcaseScreen';

interface StepperSectionProps {
  onCopyCode: (code: string) => void;
}

export const StepperSection: React.FC<StepperSectionProps> = ({
  onCopyCode,
}) => {
  return (
    <ComponentSection title="Wizard Navigation">
      <ShowcaseItem
        label="Dots Variant"
        description="Minimal step indicators with dots"
        onCopyCode={onCopyCode}
        code={`import { Stepper } from '@/components/ui/stepper';
<Stepper currentStep={0} totalSteps={3} variant="dots" />
<Stepper currentStep={1} totalSteps={3} variant="dots" />
<Stepper currentStep={2} totalSteps={3} variant="dots" />`}
      >
        <View style={styles.verticalStack}>
          <Stepper currentStep={0} totalSteps={3} variant="dots" />
          <Stepper currentStep={1} totalSteps={3} variant="dots" />
          <Stepper currentStep={2} totalSteps={3} variant="dots" />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Numbers Variant"
        description="Numbered circles with connectors"
        onCopyCode={onCopyCode}
        code={`<Stepper currentStep={1} totalSteps={4} variant="numbers" />`}
      >
        <View style={styles.verticalStack}>
          <Stepper currentStep={1} totalSteps={4} variant="numbers" />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Labels Variant"
        description="Steps with text labels"
        onCopyCode={onCopyCode}
        code={`<Stepper
  currentStep={1}
  steps={[
    { label: 'Info' },
    { label: 'Details' },
    { label: 'Review' },
  ]}
  variant="labels"
/>`}
      >
        <View style={styles.verticalStack}>
          <Stepper
            currentStep={1}
            steps={[
              { label: 'Info' },
              { label: 'Details' },
              { label: 'Review' },
            ]}
            variant="labels"
          />
        </View>
      </ShowcaseItem>
    </ComponentSection>
  );
};
