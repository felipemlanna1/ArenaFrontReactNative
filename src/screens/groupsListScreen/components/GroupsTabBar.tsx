import React, { useEffect } from 'react';
import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type GroupTab = 'myGroups' | 'recommendations';

interface TabItem {
  key: GroupTab;
  label: string;
  count: number;
}

interface GroupsTabBarProps {
  activeTab: GroupTab;
  onTabChange: (tab: GroupTab) => void;
  myGroupsCount: number;
  recommendationsCount: number;
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: ArenaColors.neutral.dark,
    paddingVertical: ArenaSpacing.sm,
  },
  scrollContent: {
    paddingHorizontal: ArenaSpacing.lg,
    gap: ArenaSpacing.sm,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.md,
    borderRadius: ArenaBorders.radius.pill,
    gap: ArenaSpacing.xs,
  },
});

interface AnimatedTabProps {
  tab: TabItem;
  isActive: boolean;
  onPress: () => void;
}

const AnimatedTab: React.FC<AnimatedTabProps> = ({
  tab,
  isActive,
  onPress,
}) => {
  const scale = useSharedValue(1);
  const backgroundColor = useSharedValue(0);

  useEffect(() => {
    backgroundColor.value = withTiming(isActive ? 1 : 0, { duration: 300 });
  }, [isActive, backgroundColor]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: withTiming(
        isActive ? ArenaColors.brand.primary : ArenaColors.neutral.darkest,
        { duration: 300 }
      ),
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  return (
    <AnimatedPressable
      style={[styles.tab, animatedStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      testID={`groups-tab-${tab.key}`}
    >
      <Text
        variant="labelPrimary"
        style={{
          color: isActive
            ? ArenaColors.neutral.light
            : ArenaColors.neutral.medium,
        }}
      >
        {tab.label}
      </Text>
      {tab.count > 0 && (
        <Badge
          variant={isActive ? 'outlined' : 'default'}
          size="sm"
          testID={`groups-tab-badge-${tab.key}`}
        >
          {String(tab.count)}
        </Badge>
      )}
    </AnimatedPressable>
  );
};

export const GroupsTabBar: React.FC<GroupsTabBarProps> = ({
  activeTab,
  onTabChange,
  myGroupsCount,
  recommendationsCount,
}) => {
  const tabs: TabItem[] = [
    { key: 'myGroups', label: 'Meus Grupos', count: myGroupsCount },
    {
      key: 'recommendations',
      label: 'Recomendações',
      count: recommendationsCount,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tabs.map(tab => (
          <AnimatedTab
            key={tab.key}
            tab={tab}
            isActive={activeTab === tab.key}
            onPress={() => onTabChange(tab.key)}
          />
        ))}
      </ScrollView>
    </View>
  );
};
