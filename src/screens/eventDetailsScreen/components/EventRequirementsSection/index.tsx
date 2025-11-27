import React, { useMemo } from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { ArenaColors } from '@/constants';
import { styles } from './stylesEventRequirementsSection';
import type { EventRequirementsSectionProps } from './typesEventRequirementsSection';

export const EventRequirementsSection: React.FC<
  EventRequirementsSectionProps
> = ({ requirements, testID = 'event-requirements-section' }) => {
  const requirementsList = useMemo(() => {
    if (!requirements || requirements.trim() === '') {
      return [];
    }

    let items = requirements.split('\n').filter(item => item.trim() !== '');

    if (items.length <= 1) {
      items = requirements.split(',').filter(item => item.trim() !== '');
    }

    return items.map(item => item.trim());
  }, [requirements]);

  if (requirementsList.length === 0) {
    return null;
  }

  return (
    <View style={styles.container} testID={testID}>
      {}
      <View style={styles.header}>
        <Ionicons
          name="bag-handle-outline"
          size={20}
          color={ArenaColors.neutral.light}
        />
        <Text variant="titleSecondary">O que trazer</Text>
      </View>

      {}
      <View style={styles.listContainer}>
        {requirementsList.map((item, index) => (
          <View
            key={index}
            style={styles.requirementItem}
            accessible={true}
            accessibilityRole="text"
            accessibilityLabel={item}
          >
            {}
            <View style={styles.checkbox}>
              <Ionicons
                name="square-outline"
                size={16}
                color={ArenaColors.neutral.medium}
              />
            </View>

            {}
            <Text variant="bodyPrimary" style={styles.requirementText}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
