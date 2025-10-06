import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Symbol } from '@/components/ui/symbol';
import { Dropdown } from '@/components/ui/dropdown';
import { ArenaColors } from '@/constants';
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
  testID = 'header',
}) => {
  const { getDefaultMenuItems, handleNotificationsPress } = useHeader({
    onLogout,
  });

  const finalMenuItems = menuItems || getDefaultMenuItems();

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
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
        </View>

        <View style={styles.centerSection}>
          <Symbol variant="variant1" size="lg" testID={`${testID}-symbol`} />
        </View>

        <View style={styles.rightSection}>
          <TouchableOpacity
            onPress={handleNotificationsPress}
            style={styles.notificationButton}
            testID={`${testID}-notifications`}
          >
            <BellIcon size={24} color={ArenaColors.text.inverse} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
