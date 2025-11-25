import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { ArenaColors } from '@/constants';
import { CollapsibleCalendarHeaderProps } from './typesCollapsibleCalendarHeader';
import { styles } from './stylesCollapsibleCalendarHeader';

export const CollapsibleCalendarHeader: React.FC<
  CollapsibleCalendarHeaderProps
> = ({
  selectedDate,
  eventsCount,
  isExpanded,
  onToggle,
  testID = 'collapsible-calendar-header',
}) => {
  const rotateAnim = useRef(new Animated.Value(isExpanded ? 0 : 1)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isExpanded, rotateAnim]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg'],
  });

  const capitalizeFirst = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formattedDate = capitalizeFirst(
    selectedDate.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
  );

  const eventsText = eventsCount === 1 ? '1 evento' : `${eventsCount} eventos`;

  return (
    <View style={styles.container} testID={testID}>
      <TouchableOpacity
        style={styles.pressable}
        onPress={onToggle}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={`${formattedDate}, ${eventsText}. ${isExpanded ? 'Tocar para colapsar calendário' : 'Tocar para expandir calendário'}`}
        testID={`${testID}-button`}
      >
        <View style={styles.leftContent}>
          <Text variant="titlePrimary" style={styles.dateText}>
            {formattedDate}
          </Text>
          <Text variant="bodySecondary" style={styles.countText}>
            {eventsText}
          </Text>
        </View>

        <Animated.View
          style={[
            styles.chevronContainer,
            { transform: [{ rotate: rotateInterpolate }] },
          ]}
        >
          <Ionicons
            name="chevron-up"
            size={24}
            color={ArenaColors.neutral.medium}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};
