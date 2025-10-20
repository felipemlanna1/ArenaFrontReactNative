import React from 'react';
import { View } from 'react-native';
import { Accordion } from '@/components/ui/accordion';
import { Text } from '@/components/ui/text';
import { styles } from './stylesEventDescriptionSection';

interface EventDescriptionSectionProps {
  description?: string;
}

export const EventDescriptionSection: React.FC<
  EventDescriptionSectionProps
> = ({ description }) => {
  if (!description) return null;

  const items = [
    {
      id: 'description',
      title: 'Descrição',
      content: (
        <View style={styles.content}>
          <Text variant="bodyPrimary" style={styles.text}>
            {description}
          </Text>
        </View>
      ),
    },
  ];

  return (
    <Accordion
      items={items}
      variant="default"
      mode="single"
      defaultExpandedIds={['description']}
    />
  );
};
