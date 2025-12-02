import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { ArenaColors } from '@/constants';
import { useMenuScreen } from './useMenuScreen';
import { styles } from './stylesMenuScreen';
import type { MenuItem } from './typesMenuScreen';

const ICON_MAP = {
  friends: 'people',
  groups: 'people-circle',
  notifications: 'notifications',
  pastEvents: 'calendar',
  settings: 'settings',
  help: 'help-circle',
  terms: 'document-text',
  privacy: 'shield-checkmark',
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

    const IconComponent = ({
      size,
      color,
    }: {
      size: number;
      color: string;
    }) => <Ionicons name={iconName} size={size} color={color} />;

    const hasBadge = item.badge !== undefined && item.badge > 0;
    const buttonVariant = item.id === 'logout' ? 'ghost-destructive' : 'ghost';

    return (
      <View key={item.id} style={styles.menuItemWrapper}>
        <Button
          variant={buttonVariant}
          onPress={() => handleItemPress(item)}
          disabled={item.disabled}
          leftIcon={IconComponent}
          testID={item.testID}
          fullWidth
          align="left"
        >
          {item.label}
        </Button>
        {hasBadge && item.badge !== undefined && (
          <View style={styles.badgeContainer}>
            <Badge variant="primary" size="sm">
              {item.badge > 99 ? '99+' : item.badge.toString()}
            </Badge>
          </View>
        )}
      </View>
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
