import React from 'react';
import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/text';
import { ArenaColors } from '@/constants';
import { AccordionItemProps } from './typesAccordion';
import { useAccordionItem } from './useAccordionItem';
import { styles } from './stylesAccordion';

export const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  isExpanded,
  onToggle,
  variant,
  disabled = false,
  testID,
}) => {
  const { handlePress, chevronRotation } = useAccordionItem({
    isExpanded,
    disabled: disabled || item.disabled,
    onToggle,
  });

  const variantStyles = {
    default: styles.itemDefault,
    outlined: styles.itemOutlined,
    filled: styles.itemFilled,
    minimal: styles.itemMinimal,
  };

  const isInteractionDisabled = disabled || item.disabled;

  return (
    <View style={variantStyles[variant]} testID={testID}>
      <Pressable
        onPress={handlePress}
        disabled={isInteractionDisabled}
        style={({ pressed }) => [
          styles.header,
          pressed && !isInteractionDisabled && styles.headerPressed,
          isInteractionDisabled && styles.headerDisabled,
        ]}
        testID={`${testID}-header`}
        accessibilityRole="button"
        accessibilityLabel={item.title}
        accessibilityState={{
          expanded: isExpanded,
          disabled: isInteractionDisabled,
        }}
        accessibilityHint={
          isExpanded ? 'Duplo toque para recolher' : 'Duplo toque para expandir'
        }
      >
        <View style={styles.headerContent}>
          {item.icon && (
            <View style={styles.iconContainer}>
              <item.icon size={20} color={ArenaColors.brand.primary} />
            </View>
          )}
          <View style={styles.titleContainer}>
            <Text variant="bodyPrimary" style={styles.title}>
              {item.title}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.chevronContainer,
            { transform: [{ rotate: chevronRotation }] },
          ]}
        >
          <Ionicons
            name="chevron-down"
            size={20}
            color={ArenaColors.text.inverse}
          />
        </View>
      </Pressable>
      {isExpanded && (
        <View style={styles.content} testID={`${testID}-content`}>
          {typeof item.content === 'string' ? (
            <Text variant="bodySecondary" style={styles.contentText}>
              {item.content}
            </Text>
          ) : (
            item.content
          )}
        </View>
      )}
    </View>
  );
};
