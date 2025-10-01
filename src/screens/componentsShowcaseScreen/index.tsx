import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useComponentsShowcaseScreen } from './useComponentsShowcaseScreen';
import { ComponentsShowcaseScreenProps } from './typesComponentsShowcaseScreen';
import { ShowcaseHeader } from './showcaseHeader';
import { TextComponentsSection } from './textComponentsSection';
import {
  BrandSection,
  ButtonSection,
  InputSection,
  LoadingSection,
  CheckboxSection,
  LinkSection,
} from './components';
import { styles } from './stylesComponentsShowcaseScreen';

export const ComponentsShowcaseScreen: React.FC<
  ComponentsShowcaseScreenProps
> = () => {
  const { actions } = useComponentsShowcaseScreen();

  return (
    <SafeAreaView style={styles.container}>
      <ShowcaseHeader onBackPress={actions.handleBackPress} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TextComponentsSection onCopyCode={actions.handleCopyCode} />
        <BrandSection onCopyCode={actions.handleCopyCode} />
        <ButtonSection onCopyCode={actions.handleCopyCode} />
        <InputSection onCopyCode={actions.handleCopyCode} />
        <CheckboxSection onCopyCode={actions.handleCopyCode} />
        <LinkSection onCopyCode={actions.handleCopyCode} />
        <LoadingSection onCopyCode={actions.handleCopyCode} />
      </ScrollView>
    </SafeAreaView>
  );
};
