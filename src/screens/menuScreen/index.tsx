import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { OptimizedImage } from '@/components/ui/optimizedImage';
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
        <OptimizedImage
          source={{ uri: userAvatar }}
          style={styles.avatarContainer}
          contentFit="cover"
          priority="high"
          showLoading
          loadingSize="sm"
        />
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
      <Card
        key={item.id}
        onPress={() => handleItemPress(item)}
        disabled={item.disabled}
        variant="default"
        style={
          item.disabled
            ? [styles.menuItem, styles.menuItemDisabled]
            : styles.menuItem
        }
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
            style={item.id === 'logout' ? styles.logoutText : undefined}
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
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container} testID="menu-screen" edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.userInfo}>
            {renderAvatar()}
            <View style={styles.userTextContainer}>
              <Text variant="titlePrimary">{userName}</Text>
              <Text variant="bodySecondary">{userEmail}</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuContent}>
          {menuItems.map(item => renderMenuItem(item))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
