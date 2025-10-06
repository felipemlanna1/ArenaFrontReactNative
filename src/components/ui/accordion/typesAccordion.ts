import { ReactNode } from 'react';

export type AccordionVariant = 'default' | 'outlined' | 'filled' | 'minimal';
export type AccordionMode = 'single' | 'multiple';

export interface AccordionItemData {
  id: string;
  title: string;
  content: ReactNode;
  disabled?: boolean;
  icon?: React.ComponentType<{ size: number; color: string }>;
}

export interface AccordionProps {
  items: AccordionItemData[];
  variant?: AccordionVariant;
  mode?: AccordionMode;
  defaultExpandedIds?: string[];
  onItemToggle?: (id: string, isExpanded: boolean) => void;
  testID?: string;
  disabled?: boolean;
}

export interface AccordionItemProps {
  item: AccordionItemData;
  isExpanded: boolean;
  onToggle: () => void;
  variant: AccordionVariant;
  disabled?: boolean;
  testID?: string;
}

export interface UseAccordionProps {
  items: AccordionItemData[];
  mode: AccordionMode;
  defaultExpandedIds: string[];
  onItemToggle?: (id: string, isExpanded: boolean) => void;
}

export interface UseAccordionReturn {
  expandedIds: string[];
  toggleItem: (id: string) => void;
  isExpanded: (id: string) => boolean;
}

export interface UseAccordionItemProps {
  isExpanded: boolean;
  disabled?: boolean;
  onToggle: () => void;
}

export interface UseAccordionItemReturn {
  handlePress: () => void;
  chevronRotation: string;
}
