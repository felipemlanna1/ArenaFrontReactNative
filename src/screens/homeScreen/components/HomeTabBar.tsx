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
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.key;
          const isLast = index === tabs.length - 1;

          return (
            <React.Fragment key={tab.key}>
              <TouchableOpacity
                style={[styles.tabButton, isActive && styles.tabButtonActive]}
                onPress={() => onTabChange(tab.key)}
                testID={`home-tab-${tab.key}`}
              >
                <Text variant={isActive ? 'bodyPrimary' : 'bodySecondary'}>
                  {tab.label}
                </Text>
                <Text variant="captionSecondary" style={styles.countText}>
                  {tab.count}
                </Text>
              </TouchableOpacity>
              {!isLast && <View style={styles.divider} />}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.dark,
    paddingVertical: ArenaSpacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: ArenaColors.neutral.darkest,
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  tabButton: {
    flex: 1,
    paddingVertical: ArenaSpacing.xs,
    paddingHorizontal: ArenaSpacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: ArenaColors.brand.primary,
  },
  countText: {
    marginTop: 2,
  },
  divider: {
    width: ArenaBorders.width.thin,
    alignSelf: 'stretch',
    backgroundColor: ArenaColors.neutral.darkSubtleBorder,
  },
});
