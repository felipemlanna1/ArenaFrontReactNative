import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Accordion } from '@/components/ui/accordion';
import { AccordionItemData } from '@/components/ui/accordion/typesAccordion';
import { useComponentsShowcaseScreen } from './useComponentsShowcaseScreen';
import { ComponentsShowcaseScreenProps } from './typesComponentsShowcaseScreen';
import { ShowcaseHeader } from './showcaseHeader';
import { TextComponentsSection } from './textComponentsSection';
import {
  BadgeSection,
  BrandSection,
  ButtonSection,
  CardSection,
  InputSection,
  LoadingSection,
  CheckboxSection,
  LinkSection,
  DropdownSection,
  AccordionSection,
} from './components';
import { styles } from './stylesComponentsShowcaseScreen';

export const ComponentsShowcaseScreen: React.FC<
  ComponentsShowcaseScreenProps
> = () => {
  const { actions } = useComponentsShowcaseScreen();

  const componentSections: AccordionItemData[] = [
    {
      id: 'accordion',
      title: 'Accordion',
      content: <AccordionSection onCopyCode={actions.handleCopyCode} />,
    },
    {
      id: 'badge',
      title: 'Badge',
      content: <BadgeSection onCopyCode={actions.handleCopyCode} />,
    },
    {
      id: 'brand',
      title: 'Brand (Logo, Symbol, Icon)',
      content: <BrandSection onCopyCode={actions.handleCopyCode} />,
    },
    {
      id: 'button',
      title: 'Button',
      content: <ButtonSection onCopyCode={actions.handleCopyCode} />,
    },
    {
      id: 'card',
      title: 'Card',
      content: <CardSection onCopyCode={actions.handleCopyCode} />,
    },
    {
      id: 'checkbox',
      title: 'Checkbox',
      content: <CheckboxSection onCopyCode={actions.handleCopyCode} />,
    },
    {
      id: 'dropdown',
      title: 'Dropdown',
      content: <DropdownSection onCopyCode={actions.handleCopyCode} />,
    },
    {
      id: 'input',
      title: 'Input',
      content: <InputSection onCopyCode={actions.handleCopyCode} />,
    },
    {
      id: 'link',
      title: 'Link',
      content: <LinkSection onCopyCode={actions.handleCopyCode} />,
    },
    {
      id: 'loading',
      title: 'Loading (SportsLoading)',
      content: <LoadingSection onCopyCode={actions.handleCopyCode} />,
    },
    {
      id: 'text',
      title: 'Text',
      content: <TextComponentsSection onCopyCode={actions.handleCopyCode} />,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ShowcaseHeader onBackPress={actions.handleBackPress} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Accordion
          variant="default"
          mode="single"
          items={componentSections}
          testID="components-showcase-accordion"
        />
      </ScrollView>
    </SafeAreaView>
  );
};
