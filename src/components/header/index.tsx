import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Symbol } from '@/components/ui/symbol';
import { Dropdown } from '@/components/ui/dropdown';
import { BugReportModal } from '@/components/ui/bugReportModal';
import { ArenaColors } from '@/constants';
import { useUnreadNotifications } from '@/hooks/useUnreadNotifications';
import { HeaderProps } from './typesHeader';
import { useHeader } from './useHeader';
import { styles } from './stylesHeader';
import { BellIcon } from './utils/BellIcon';

const MenuIcon: React.FC<{ size: number; color: string }> = () => (
  <View style={styles.menuIconContainer}>
    <View style={styles.menuIconBar} />
    <View style={styles.menuIconBar} />
    <View style={styles.menuIconBar} />
  </View>
);

export const Header: React.FC<HeaderProps> = ({
  menuItems,
  onLogout,
  onBack,
  testID = 'header',
}) => {
  const { getDefaultMenuItems, handleNotificationsPress } = useHeader({
    onLogout,
  });
  const { unreadCount } = useUnreadNotifications();
  const [isBugReportModalVisible, setIsBugReportModalVisible] = useState(false);

  const finalMenuItems = menuItems || getDefaultMenuItems();

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          {onBack ? (
            <TouchableOpacity
              onPress={onBack}
              style={styles.backButton}
              testID={`${testID}-back-button`}
            >
              <Ionicons
                name="chevron-back"
                size={28}
                color={ArenaColors.text.inverse}
              />
            </TouchableOpacity>
          ) : (
            <Dropdown
              variant="menu"
              trigger={
                <View style={styles.menuButton}>
                  <MenuIcon size={20} color="" />
                </View>
              }
              items={finalMenuItems}
              testID={`${testID}-menu-dropdown`}
            />
          )}
        </View>

        <View style={styles.centerSection}>
          <Symbol variant="variant1" size="lg" testID={`${testID}-symbol`} />
        </View>

        <View style={styles.rightSection}>
          <TouchableOpacity
            onPress={() => setIsBugReportModalVisible(true)}
            style={styles.notificationButton}
            testID={`${testID}-bug-report`}
          >
            <Ionicons
              name="bug-outline"
              size={24}
              color={ArenaColors.text.inverse}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNotificationsPress}
            style={styles.notificationButton}
            testID={`${testID}-notifications`}
          >
            <BellIcon
              size={24}
              color={ArenaColors.text.inverse}
              badgeCount={unreadCount}
            />
          </TouchableOpacity>
        </View>
      </View>

      <BugReportModal
        visible={isBugReportModalVisible}
        onClose={() => setIsBugReportModalVisible(false)}
      />
    </View>
  );
};
