import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

export type ComponentsShowcaseScreenProps = NativeStackScreenProps<RootStackParamList, 'ComponentsShowcase'>;

export interface ComponentSectionProps {
  title: string;
  children: React.ReactNode;
}

export interface ShowcaseItemProps {
  label: string;
  description?: string;
  children: React.ReactNode;
}

export interface UseComponentsShowcaseScreenReturn {
  activeSection: string | null;

  actions: {
    handleSectionToggle: (sectionId: string) => void;
    handleBackPress: () => void;
    handleCopyCode: (code: string) => void;
  };
}

export interface ComponentSection {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType;
}