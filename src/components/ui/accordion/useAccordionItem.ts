import { useCallback } from 'react';
import {
  UseAccordionItemProps,
  UseAccordionItemReturn,
} from './typesAccordion';

export const useAccordionItem = ({
  isExpanded,
  disabled,
  onToggle,
}: UseAccordionItemProps): UseAccordionItemReturn => {
  const handlePress = useCallback(() => {
    if (!disabled) {
      onToggle();
    }
  }, [disabled, onToggle]);

  const chevronRotation = isExpanded ? '180deg' : '0deg';

  return {
    handlePress,
    chevronRotation,
  };
};
