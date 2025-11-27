import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

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

export const GroupsTabBar: React.FC<GroupsTabBarProps> = ({
  activeTab,
  onTabChange,
  myGroupsCount,
  recommendationsCount,
}) => {
  const tabs: TabItem[] = [
    { key: 'myGroups', label: 'Minhas Equipes', count: myGroupsCount },
    {
      key: 'recommendations',
      label: 'Recomendações',
      count: recommendationsCount,
    },
  ];

  return (
    <View style={styles.container} testID="groups-tab-bar">
      <View style={styles.tabsRow}>
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.key;
          const isLast = index === tabs.length - 1;

          return (
            <React.Fragment key={tab.key}>
              <TouchableOpacity
                style={[styles.tabButton, isActive && styles.tabButtonActive]}
                onPress={() => onTabChange(tab.key)}
                testID={`groups-tab-${tab.key}`}
              >
                <Text variant={isActive ? 'bodyPrimary' : 'bodySecondary'}>
                  {tab.label}
                </Text>
                <Text variant="captionSecondary">{tab.count}</Text>
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
  divider: {
    width: ArenaBorders.width.thin,
    alignSelf: 'stretch',
    backgroundColor: ArenaColors.neutral.darkSubtleBorder,
  },
});
