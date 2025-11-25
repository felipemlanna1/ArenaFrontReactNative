import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export type HomeTab = 'events' | 'groups' | 'friends';

interface TabItem {
  key: HomeTab;
  label: string;
  count: number;
}

interface HomeTabBarProps {
  activeTab: HomeTab;
  onTabChange: (tab: HomeTab) => void;
  eventsCount: number;
  groupsCount: number;
  friendsCount: number;
}

interface TabBadgeProps {
  count: number;
  isActive: boolean;
  testID?: string;
}

const TabBadge: React.FC<TabBadgeProps> = ({
  count,
  isActive,
  testID = 'tab-badge',
}) => {
  const displayCount = count > 99 ? '99+' : count.toString();

  return (
    <View
      style={[
        styles.badge,
        isActive ? styles.badgeActive : styles.badgeInactive,
      ]}
      testID={testID}
    >
      <Text
        variant="labelPrimary"
        style={isActive ? styles.badgeTextActive : styles.badgeTextInactive}
      >
        {displayCount}
      </Text>
    </View>
  );
};

export const HomeTabBar: React.FC<HomeTabBarProps> = ({
  activeTab,
  onTabChange,
  eventsCount,
  groupsCount,
  friendsCount,
}) => {
  const tabs: TabItem[] = [
    { key: 'events', label: 'Eventos', count: eventsCount },
    { key: 'groups', label: 'Grupos', count: groupsCount },
    { key: 'friends', label: 'Amigos', count: friendsCount },
  ];

  return (
    <View style={styles.container} testID="home-tab-bar">
      <View style={styles.tabsRow}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.key;

          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
              onPress={() => onTabChange(tab.key)}
              testID={`home-tab-${tab.key}`}
            >
              <Text
                variant="bodyPrimary"
                style={isActive ? styles.tabTextActive : styles.tabTextInactive}
              >
                {tab.label}
              </Text>
              <TabBadge
                count={tab.count}
                isActive={isActive}
                testID={`home-tab-badge-${tab.key}`}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.darkest,
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.sm,
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.lg,
    padding: ArenaSpacing.xs,
    gap: ArenaSpacing.xs,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.xs,
    borderRadius: ArenaBorders.radius.md,
    gap: ArenaSpacing.xs,
  },
  tabButtonActive: {
    backgroundColor: ArenaColors.brand.primary,
  },
  tabTextInactive: {
    color: ArenaColors.neutral.medium,
  },
  tabTextActive: {
    color: ArenaColors.neutral.light,
  },
  badge: {
    paddingVertical: ArenaSpacing.xs,
    paddingHorizontal: ArenaSpacing.sm,
    minWidth: ArenaSpacing.lg,
    borderRadius: ArenaBorders.radius.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeInactive: {
    backgroundColor: ArenaColors.neutral.darkIntermediate,
  },
  badgeActive: {
    backgroundColor: ArenaColors.neutral.lightMedium,
  },
  badgeTextInactive: {
    color: ArenaColors.neutral.medium,
  },
  badgeTextActive: {
    color: ArenaColors.neutral.light,
  },
});
