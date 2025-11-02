import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { ArenaColors } from '@/constants';
import { styles } from './stylesGroupRulesSection';

interface GroupRulesSectionProps {
  rules?: string[];
  testID?: string;
}

export const GroupRulesSection: React.FC<GroupRulesSectionProps> = ({
  rules = [],
  testID = 'group-rules-section',
}) => {
  if (!rules || rules.length === 0) {
    return null;
  }

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.header}>
        <Ionicons
          name="document-text"
          size={20}
          color={ArenaColors.brand.primary}
        />
        <Text variant="titlePrimary">Regras do Grupo</Text>
      </View>

      <View style={styles.rulesList}>
        {rules.map((rule, index) => (
          <View key={index} style={styles.ruleItem}>
            <View style={styles.ruleBullet}>
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={ArenaColors.semantic.success}
              />
            </View>
            <Text variant="bodySecondary" style={styles.ruleText}>
              {rule}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
