import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/text';
import { useComponentsShowcaseScreen } from './useComponentsShowcaseScreen';
import { ComponentsShowcaseScreenProps } from './typesComponentsShowcaseScreen';
import { ComponentSection } from './component-section';
import { ShowcaseItem } from './showcase-item';
import { ShowcaseHeader } from './showcase-header';
import { TextComponentsSection } from './text-components-section';
import { styles } from './stylesComponentsShowcaseScreen';

export const ComponentsShowcaseScreen: React.FC<ComponentsShowcaseScreenProps> = () => {
  const { actions } = useComponentsShowcaseScreen();

  return (
    <SafeAreaView style={styles.container}>
      <ShowcaseHeader onBackPress={actions.handleBackPress} />

      <View style={styles.content}>
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TextComponentsSection onCopyCode={actions.handleCopyCode} />

          <ComponentSection title="Button Components">
            <ShowcaseItem
              label="Coming Soon"
              description="Componentes de botão em desenvolvimento"
            >
              <Text variant="captionMuted">Em breve...</Text>
            </ShowcaseItem>
          </ComponentSection>

          <ComponentSection title="Input Components">
            <ShowcaseItem
              label="Coming Soon"
              description="Componentes de input em desenvolvimento"
            >
              <Text variant="captionMuted">Em breve...</Text>
            </ShowcaseItem>
          </ComponentSection>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};