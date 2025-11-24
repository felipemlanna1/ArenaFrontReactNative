import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '../text';
import { Badge } from '../badge';
import { ArenaColors } from '@/constants';
import { MenuDrawerProps } from './typesMenuDrawer';
import { useMenuDrawer } from './useMenuDrawer';
import { styles } from './stylesMenuDrawer';

export type { MenuDrawerProps } from './typesMenuDrawer';

const ICON_MAP = {
  friends: 'people',
  groups: 'people-circle',
  notifications: 'notifications',
  settings: 'settings',
  help: 'help-circle',
  terms: 'document-text',
  logout: 'log-out',
} as const;

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  testID = 'menu-drawer',
}) => {
  const insets = useSafeAreaInsets();
  const translateX = useSharedValue(-320);
  const opacity = useSharedValue(0);

  const { menuItems, handleItemPress, handleClose, userName, userEmail, userAvatar } =
    useMenuDrawer({ isOpen, onClose });

  React.useEffect(() => {
    if (isOpen) {
      translateX.value = withSpring(0, {
        damping: 20,
        stiffness: 90,
      });
      opacity.value = withTiming(1, { duration: 200 });
    } else {
      translateX.value = withTiming(-320, { duration: 250 });
      opacity.value = withTiming(0, { duration: 200 });
    }
  }, [isOpen, translateX, opacity]);

  const drawerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

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

  const renderMenuItem = (item: typeof menuItems[number]) => {
    if (item.type === 'divider') {
      return <View key={item.id} style={styles.divider} />;
    }

    const iconName = ICON_MAP[item.id as keyof typeof ICON_MAP] || 'ellipsis-horizontal';

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
    <Modal
      visible={isOpen}
      transparent
      animationType="none"
      onRequestClose={handleClose}
      testID={testID}
    >
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <Animated.View style={[styles.overlay, overlayAnimatedStyle]} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.drawerContainer,
            drawerAnimatedStyle,
            {
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
            },
          ]}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons
                name="close"
                size={24}
                color={ArenaColors.neutral.medium}
              />
            </TouchableOpacity>
            <View style={styles.userInfo}>
              {renderAvatar()}
              <Text variant="titlePrimary">{userName}</Text>
              <Text variant="bodySecondary">{userEmail}</Text>
            </View>
          </View>

          <View style={styles.menuContent}>
            {menuItems.map(item => renderMenuItem(item))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};
