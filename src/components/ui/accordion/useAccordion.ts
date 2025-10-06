import { useState, useCallback } from 'react';
import { UseAccordionProps, UseAccordionReturn } from './typesAccordion';

export const useAccordion = ({
  items,
  mode,
  defaultExpandedIds,
  onItemToggle,
}: UseAccordionProps): UseAccordionReturn => {
  const [expandedIds, setExpandedIds] = useState<string[]>(defaultExpandedIds);

  const toggleItem = useCallback(
    (id: string) => {
      setExpandedIds(prev => {
        const isCurrentlyExpanded = prev.includes(id);
        let newExpandedIds: string[];

        if (mode === 'single') {
          newExpandedIds = isCurrentlyExpanded ? [] : [id];
        } else {
          newExpandedIds = isCurrentlyExpanded
            ? prev.filter(itemId => itemId !== id)
            : [...prev, id];
        }

        if (onItemToggle) {
          onItemToggle(id, !isCurrentlyExpanded);
        }

        return newExpandedIds;
      });
    },
    [mode, onItemToggle]
  );

  const isExpanded = useCallback(
    (id: string) => expandedIds.includes(id),
    [expandedIds]
  );

  return {
    expandedIds,
    toggleItem,
    isExpanded,
  };
};
