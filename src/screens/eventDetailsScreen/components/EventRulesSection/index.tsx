import React, { useMemo } from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { ArenaColors } from '@/constants';
import { styles } from './stylesEventRulesSection';
import type { EventRulesSectionProps } from './typesEventRulesSection';

export const EventRulesSection: React.FC<EventRulesSectionProps> = ({
  rules,
  testID = 'event-rules-section',
}) => {
  const rulesList = useMemo(() => {
    if (!rules || rules.trim() === '') {
      return [];
    }

    let items = rules.split('\n').filter(item => item.trim() !== '');

    if (items.length <= 1) {
      items = rules
        .split('.')
        .filter(item => item.trim() !== '')
        .map(item => item.trim() + (item.trim().endsWith('.') ? '' : '.'));
    }

    return items.map(item => {
      const trimmed = item.trim();

      return trimmed.endsWith('.') ? trimmed : trimmed + '.';
    });
  }, [rules]);

  if (rulesList.length === 0) {
    return null;
  }

  return (
    <View style={styles.container} testID={testID}>
      {}
      <View style={styles.header}>
        <Ionicons
          name="document-text-outline"
          size={20}
          color={ArenaColors.neutral.light}
        />
        <Text variant="titleSecondary">Regras do Evento</Text>
      </View>

      {}
      <View style={styles.listContainer}>
        {rulesList.map((item, index) => (
          <View
            key={index}
            style={styles.ruleItem}
            accessible={true}
            accessibilityRole="text"
            accessibilityLabel={item}
          >
            {}
            <View style={styles.bullet} />

            {}
            <Text variant="bodyPrimary" style={styles.ruleText}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
