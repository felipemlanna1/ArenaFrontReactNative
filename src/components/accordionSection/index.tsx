import React, { useState } from 'react';

import { View, Pressable, LayoutAnimation, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ArenaColors } from '@/constants';
import { AccordionSectionProps } from './typesAccordionSection';
import { styles } from './stylesAccordionSection';

export const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  count,
  children,
  defaultExpanded = false,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
  testID,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    if (Platform.OS !== 'web') {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          300,
          LayoutAnimation.Types.easeInEaseOut,
          LayoutAnimation.Properties.opacity
        )
      );
    }
    setIsExpanded(prev => !prev);
  };

  const chevronRotation = isExpanded ? '180deg' : '0deg';
  const displayTitle = count !== undefined ? `${title} (${count})` : title;

  return (
    <View style={styles.container} testID={testID}>
      <Pressable
        onPress={handleToggle}
        style={({ pressed }) => [
          styles.header,
          pressed && styles.headerPressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel={displayTitle}
        accessibilityState={{ expanded: isExpanded }}
        accessibilityHint={
          isExpanded ? 'Duplo toque para recolher' : 'Duplo toque para expandir'
        }
      >
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Text variant="bodyPrimary" style={styles.title}>
              {displayTitle}
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
            color={
              isExpanded
                ? ArenaColors.brand.primary
                : ArenaColors.neutral.medium
            }
          />
        </View>
      </Pressable>

      {isExpanded && (
        <View style={styles.content}>
          {children}
          {hasMore && onLoadMore && (
            <View style={styles.loadMoreContainer}>
              <Button
                variant="secondary"
                onPress={onLoadMore}
                disabled={isLoadingMore}
                size="md"
              >
                {isLoadingMore ? 'Carregando...' : 'Ver mais'}
              </Button>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export type { AccordionSectionProps } from './typesAccordionSection';
