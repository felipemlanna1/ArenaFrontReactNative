// Arena ComponentsShowcaseScreen - Tipos TypeScript
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

// =============================================================================
// NAVIGATION TYPES
// =============================================================================

export type ComponentsShowcaseScreenProps = NativeStackScreenProps<RootStackParamList, 'ComponentsShowcase'>;

// =============================================================================
// COMPONENT TYPES
// =============================================================================

export interface ComponentSectionProps {
  title: string;
  children: React.ReactNode;
}

export interface ShowcaseItemProps {
  label: string;
  description?: string;
  children: React.ReactNode;
}

// =============================================================================
// HOOK TYPES
// =============================================================================

export interface UseComponentsShowcaseScreenReturn {
  // Estados da tela
  activeSection: string | null;

  // Ações da tela
  actions: {
    handleSectionToggle: (sectionId: string) => void;
    handleBackPress: () => void;
    handleCopyCode: (code: string) => void;
  };
}

// =============================================================================
// DATA TYPES
// =============================================================================

export interface ComponentSection {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType;
}