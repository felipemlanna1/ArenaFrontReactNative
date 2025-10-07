import React from 'react';
import { View } from 'react-native';
import { ProgressBar } from '@/components/ui/progressBar';
import { ComponentSection } from '../componentSection';
import { ShowcaseItem } from '../showcaseItem';
import { styles } from '../stylesComponentsShowcaseScreen';

interface ProgressBarSectionProps {
  onCopyCode: (code: string) => void;
}

export const ProgressBarSection: React.FC<ProgressBarSectionProps> = ({
  onCopyCode,
}) => {
  return (
    <ComponentSection title="Progress Indicators">
      <ShowcaseItem
        label="Basic Progress Bar"
        description="Progress bar with different values"
        onCopyCode={onCopyCode}
        code={`import { ProgressBar } from '@/components/ui/progressBar';
<ProgressBar progress={25} />
<ProgressBar progress={50} />
<ProgressBar progress={75} />
<ProgressBar progress={100} />`}
      >
        <View style={styles.verticalStack}>
          <ProgressBar progress={25} />
          <ProgressBar progress={50} />
          <ProgressBar progress={75} />
          <ProgressBar progress={100} />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="With Percentage"
        description="Show percentage text below progress bar"
        onCopyCode={onCopyCode}
        code={`<ProgressBar progress={65} showPercentage />`}
      >
        <View style={styles.verticalStack}>
          <ProgressBar progress={65} showPercentage />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Custom Height"
        description="Different heights for progress bars"
        onCopyCode={onCopyCode}
        code={`<ProgressBar progress={60} height={4} />
<ProgressBar progress={60} height={8} />
<ProgressBar progress={60} height={12} />`}
      >
        <View style={styles.verticalStack}>
          <ProgressBar progress={60} height={4} />
          <ProgressBar progress={60} height={8} />
          <ProgressBar progress={60} height={12} />
        </View>
      </ShowcaseItem>
    </ComponentSection>
  );
};
