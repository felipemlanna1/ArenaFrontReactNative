import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UseComponentsShowcaseScreenReturn } from './typesComponentsShowcaseScreen';
import { RootStackParamList } from '@/navigation/types';

type ComponentsShowcaseScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ComponentsShowcase'
>;

export const useComponentsShowcaseScreen =
  (): UseComponentsShowcaseScreenReturn => {
    const navigation = useNavigation<ComponentsShowcaseScreenNavigationProp>();

    const [activeSection, setActiveSection] = useState<string | null>('text');

    const handleSectionToggle = useCallback((sectionId: string) => {
      setActiveSection(current => (current === sectionId ? null : sectionId));
    }, []);

    const handleBackPress = useCallback(() => {
      navigation.goBack();
    }, [navigation]);

    const handleCopyCode = useCallback((code: string) => {

    }, []);

    return {
      activeSection,
      actions: {
        handleSectionToggle,
        handleBackPress,
        handleCopyCode,
      },
    };
  };
