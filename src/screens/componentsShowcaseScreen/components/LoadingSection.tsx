import React from 'react';
import { View } from 'react-native';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { ComponentSection } from '../componentSection';
import { ShowcaseItem } from '../showcaseItem';
import { styles } from '../stylesComponentsShowcaseScreen';

interface LoadingSectionProps {
  onCopyCode: (code: string) => void;
}

export const LoadingSection: React.FC<LoadingSectionProps> = ({
  onCopyCode,
}) => {
  return (
    <ComponentSection title="Loading Indicators">
      <ShowcaseItem
        label="Sports Loading"
        description="Animated sports icons loading indicator"
        onCopyCode={onCopyCode}
        code={`import { SportsLoading } from '@/components/ui/sportsLoading';
<SportsLoading size="md" animationSpeed="normal" />`}
      >
        <View style={styles.loadingGrid}>
          <SportsLoading
            size="sm"
            animationSpeed="normal"
            testID="loading-sm"
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Loading Orientations"
        description="Horizontal and vertical layouts"
        onCopyCode={onCopyCode}
        code={`<SportsLoading orientation="horizontal" />
<SportsLoading orientation="vertical" />`}
      >
        <View style={styles.orientationShowcase}>
          <View style={styles.orientationItem}>
            <SportsLoading
              size="sm"
              orientation="horizontal"
              animationSpeed="normal"
              testID="loading-horizontal"
            />
          </View>
          <View style={styles.orientationItem}>
            <SportsLoading
              size="sm"
              orientation="vertical"
              animationSpeed="normal"
              testID="loading-vertical"
            />
          </View>
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Animation Speeds"
        description="Different animation speeds"
        onCopyCode={onCopyCode}
        code={`<SportsLoading animationSpeed="slow" />
<SportsLoading animationSpeed="normal" />
<SportsLoading animationSpeed="fast" />`}
      >
        <View style={styles.speedShowcase}>
          <View style={styles.speedItem}>
            <SportsLoading
              size="sm"
              animationSpeed="slow"
              testID="loading-slow"
            />
          </View>
          <View style={styles.speedItem}>
            <SportsLoading
              size="sm"
              animationSpeed="normal"
              testID="loading-normal"
            />
          </View>
          <View style={styles.speedItem}>
            <SportsLoading
              size="sm"
              animationSpeed="fast"
              testID="loading-fast"
            />
          </View>
        </View>
      </ShowcaseItem>
    </ComponentSection>
  );
};
