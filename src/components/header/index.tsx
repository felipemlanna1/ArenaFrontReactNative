import React from 'react';
import { View } from 'react-native';
import { Symbol } from '@/components/ui/symbol';
import { Dropdown } from '@/components/ui/dropdown';
import { HeaderProps } from './typesHeader';
import { useHeader } from './useHeader';
import { styles } from './stylesHeader';

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
  const { getDefaultMenuItems } = useHeader({ onLogout });

  const finalMenuItems = menuItems || getDefaultMenuItems();

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Symbol variant="variant1" size="sm" testID={`${testID}-symbol`} />
        </View>

        <View style={styles.rightSection}>
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
      </View>
    </View>
  );
};
