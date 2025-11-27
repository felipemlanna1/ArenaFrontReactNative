import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export type ExploreTab = 'events' | 'groups' | 'friends';

interface TabItem {
  key: ExploreTab;
  label: string;
  count: number;
}

interface ExploreTabBarProps {
  activeTab: ExploreTab;
  onTabChange: (tab: ExploreTab) => void;
  eventsCount: number;
  groupsCount: number;
  friendsCount: number;
}

export const ExploreTabBar: React.FC<ExploreTabBarProps> = ({
  activeTab,
  onTabChange,
  eventsCount,
  groupsCount,
  friendsCount,
}) => {
  const tabs: TabItem[] = [
    { key: 'events', label: 'Eventos', count: eventsCount },
    { key: 'groups', label: 'Equipes', count: groupsCount },
    { key: 'friends', label: 'Atletas', count: friendsCount },
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
    borderBottomWidth: ArenaBorders.width.thin,
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
    marginTop: ArenaSpacing.xxs,
  },
  divider: {
    width: ArenaBorders.width.thin,
    alignSelf: 'stretch',
    backgroundColor: ArenaColors.neutral.darkSubtleBorder,
  },
});
