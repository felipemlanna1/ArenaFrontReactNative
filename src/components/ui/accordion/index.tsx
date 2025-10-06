import React from 'react';
import { View } from 'react-native';
import { AccordionProps } from './typesAccordion';
import { useAccordion } from './useAccordion';
import { AccordionItem } from './AccordionItem';
import { styles } from './stylesAccordion';

export const Accordion: React.FC<AccordionProps> = ({
  items,
  variant = 'default',
  mode = 'single',
  defaultExpandedIds = [],
  onItemToggle,
  testID = 'accordion',
  disabled = false,
}) => {
  const { toggleItem, isExpanded } = useAccordion({
    items,
    mode,
    defaultExpandedIds,
    onItemToggle,
  });

  return (
    <View style={styles.container} testID={testID}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          item={item}
          isExpanded={isExpanded(item.id)}
          onToggle={() => toggleItem(item.id)}
          variant={variant}
          disabled={disabled}
          testID={`${testID}-item-${index}`}
        />
      ))}
    </View>
  );
};
