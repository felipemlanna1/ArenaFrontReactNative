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
  const displayTitle =
    count !== undefined && count > 0 ? `${title} (${count})` : title;

  return (
    <Accordion
      items={[
        {
          id: title,
          title: displayTitle,
          content: <View style={styles.contentContainer}>{children}</View>,
        },
      ]}
      variant="default"
      mode="multiple"
      defaultExpandedIds={[title]}
      testID={testID}
    />
  );
};
