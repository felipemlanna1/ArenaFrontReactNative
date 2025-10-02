import React from 'react';
import { View } from 'react-native';
import { Accordion } from '@/components/ui/accordion';
import { FilterSectionProps } from './typesFilterSection';
import { styles } from './stylesFilterSection';

export const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  children,
  count,
  testID = 'filter-section',
}) => {
  const badge = count !== undefined && count > 0 ? count.toString() : undefined;

  return (
    <Accordion
      items={[
        {
          id: title,
          title,
          content: <View style={styles.contentContainer}>{children}</View>,
          badge,
        },
      ]}
      variant="default"
      mode="multiple"
      defaultExpandedIds={[title]}
      testID={testID}
    />
  );
};
