import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { ArenaColors } from '@/constants';
import { useMenuScreen } from './useMenuScreen';
import { styles } from './stylesMenuScreen';
import type { MenuItem } from './typesMenuScreen';

const ICON_MAP = {
  friends: 'people',
  groups: 'people-circle',
  notifications: 'notifications',
  settings: 'settings',
  help: 'help-circle',
  terms: 'document-text',
  logout: 'log-out',
} as const;

export const MenuScreen: React.FC = () => {
  const { menuItems, handleItemPress, userName, userEmail, userAvatar } =
    useMenuScreen();

  const renderAvatar = () => {
    if (userAvatar) {
      return (
        <View style={styles.avatarContainer}>
          <Text variant="titlePrimary">{userName.charAt(0).toUpperCase()}</Text>
        </View>
      );
    }

    return (
      <View style={styles.avatarContainer}>
        <Ionicons name="person" size={32} color={ArenaColors.neutral.medium} />
      </View>
    );
  };

  const renderMenuItem = (item: MenuItem) => {
    if (item.type === 'divider') {
      return <View key={item.id} style={styles.divider} />;
    }

    const iconName =
      ICON_MAP[item.id as keyof typeof ICON_MAP] || 'ellipsis-horizontal';

    return (
      <Pressable
        key={item.id}
        onPress={() => handleItemPress(item)}
        disabled={item.disabled}
        style={({ pressed }) => [
          styles.menuItem,
          pressed && styles.menuItemPressed,
          item.disabled && styles.menuItemDisabled,
        ]}
        testID={item.testID}
      >
        <View style={styles.iconContainer}>
          <Ionicons
            name={iconName}
            size={24}
            color={
              item.id === 'logout'
                ? ArenaColors.semantic.error
                : ArenaColors.neutral.light
            }
          />
        </View>
        <View style={styles.menuItemContent}>
          <Text
            variant="bodyPrimary"
            style={{
              color:
                item.id === 'logout'
                  ? ArenaColors.semantic.error
                  : ArenaColors.neutral.light,
            }}
          >
            {item.label}
          </Text>
          {item.badge !== undefined && item.badge > 0 && (
            <View style={styles.badgeContainer}>
              <Badge variant="primary" size="sm">
                {item.badge > 99 ? '99+' : item.badge.toString()}
              </Badge>
            </View>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container} testID="menu-screen">
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.userInfo}>
            {renderAvatar()}
            <Text variant="titlePrimary">{userName}</Text>
            <Text variant="bodySecondary">{userEmail}</Text>
          </View>
        </View>

        <View style={styles.menuContent}>
          {menuItems.map(item => renderMenuItem(item))}
        </View>
      </ScrollView>
    </View>
  );
};
