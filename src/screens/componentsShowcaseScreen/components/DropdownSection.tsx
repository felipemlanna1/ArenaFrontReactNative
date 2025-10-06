import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Dropdown } from '@/components/ui/dropdown';
import { ComponentSection } from '../componentSection';
import { ShowcaseItem } from '../showcaseItem';
import { styles } from '../stylesComponentsShowcaseScreen';

interface DropdownSectionProps {
  onCopyCode: (code: string) => void;
}

const BASIC_DROPDOWN_CODE = `import { Dropdown } from '@/components/ui/dropdown';

<Dropdown
  trigger={
    <View style={styles.buttonTrigger}>
      <Text variant="bodyPrimary">Menu</Text>
    </View>
  }
  items={[
    {
      id: 'option1',
      label: 'Opção 1',
      onPress: () => console.log('Opção 1'),
    },
    {
      id: 'option2',
      label: 'Opção 2',
      onPress: () => console.log('Opção 2'),
    },
  ]}
/>`;

const MENU_DROPDOWN_CODE = `<Dropdown
  variant="menu"
  trigger={<Text variant="bodyPrimary">Menu ▼</Text>}
  items={[
    { id: 'home', label: 'Início', onPress: () => {} },
    { id: 'profile', label: 'Perfil', onPress: () => {} },
  ]}
/>`;

const PROFILE_DROPDOWN_CODE = `<Dropdown
  variant="profile"
  trigger={<Text variant="bodyPrimary">👤 Perfil</Text>}
  items={[
    { id: 'settings', label: 'Configurações', onPress: () => {} },
    { id: 'logout', label: 'Sair', onPress: () => {}, destructive: true },
  ]}
/>`;

const ICON_DROPDOWN_CODE = `const MenuIcon = () => (
  <View style={{ gap: 4 }}>
    <View style={{ width: 20, height: 2, backgroundColor: '#FFF' }} />
    <View style={{ width: 20, height: 2, backgroundColor: '#FFF' }} />
    <View style={{ width: 20, height: 2, backgroundColor: '#FFF' }} />
  </View>
);

<Dropdown
  trigger={
    <View style={{ flexDirection: 'row', gap: 8, padding: 8 }}>
      <MenuIcon />
      <Text variant="bodyPrimary">Menu</Text>
    </View>
  }
  items={menuItems}
/>`;

const DISABLED_DROPDOWN_CODE = `<Dropdown
  trigger={
    <View style={styles.buttonTrigger}>
      <Text variant="bodyPrimary">Menu Desabilitado</Text>
    </View>
  }
  items={menuItems}
  disabled
/>`;

const MenuIcon: React.FC = () => (
  <View style={styles.menuIconContainer}>
    <View style={styles.menuIconBar} />
    <View style={styles.menuIconBar} />
    <View style={styles.menuIconBar} />
  </View>
);

export const DropdownSection: React.FC<DropdownSectionProps> = ({
  onCopyCode,
}) => {
  const basicMenuItems = [
    {
      id: 'option1',
      label: 'Opção 1',
      onPress: () => {},
    },
    {
      id: 'option2',
      label: 'Opção 2',
      onPress: () => {},
    },
    {
      id: 'option3',
      label: 'Opção 3',
      onPress: () => {},
    },
  ];

  const navigationItems = [
    {
      id: 'home',
      label: 'Início',
      onPress: () => {},
    },
    {
      id: 'explore',
      label: 'Explorar',
      onPress: () => {},
    },
    {
      id: 'notifications',
      label: 'Notificações',
      onPress: () => {},
    },
  ];

  const profileItems = [
    {
      id: 'profile',
      label: 'Meu Perfil',
      onPress: () => {},
    },
    {
      id: 'settings',
      label: 'Configurações',
      onPress: () => {},
    },
    {
      id: 'logout',
      label: 'Sair',
      onPress: () => {},
      destructive: true,
    },
  ];

  return (
    <ComponentSection title="Dropdown">
      <ShowcaseItem
        label="Basic Dropdown"
        description="Default dropdown menu with button trigger"
        onCopyCode={onCopyCode}
        code={BASIC_DROPDOWN_CODE}
      >
        <View style={styles.dropdownRow}>
          <Dropdown
            trigger={
              <View style={styles.buttonTrigger}>
                <Text variant="bodyPrimary" style={styles.buttonTriggerText}>
                  Menu Básico
                </Text>
              </View>
            }
            items={basicMenuItems}
            testID="dropdown-basic"
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Menu Variant"
        description="Navigation menu dropdown"
        onCopyCode={onCopyCode}
        code={MENU_DROPDOWN_CODE}
      >
        <View style={styles.dropdownRow}>
          <Dropdown
            variant="menu"
            trigger={
              <View style={styles.menuTrigger}>
                <Text variant="bodyPrimary">Menu ▼</Text>
              </View>
            }
            items={navigationItems}
            testID="dropdown-menu"
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Profile Variant"
        description="User profile dropdown with destructive action"
        onCopyCode={onCopyCode}
        code={PROFILE_DROPDOWN_CODE}
      >
        <View style={styles.dropdownRow}>
          <Dropdown
            variant="profile"
            trigger={
              <View style={styles.profileTrigger}>
                <Text variant="bodyPrimary">👤 Perfil</Text>
              </View>
            }
            items={profileItems}
            testID="dropdown-profile"
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Icon Menu (Hamburger)"
        description="Dropdown with hamburger menu icon"
        onCopyCode={onCopyCode}
        code={ICON_DROPDOWN_CODE}
      >
        <View style={styles.dropdownRow}>
          <Dropdown
            trigger={
              <View style={styles.iconMenuTrigger}>
                <MenuIcon />
                <Text variant="bodyPrimary">Menu</Text>
              </View>
            }
            items={navigationItems}
            testID="dropdown-icon"
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Disabled State"
        description="Dropdown in disabled state"
        onCopyCode={onCopyCode}
        code={DISABLED_DROPDOWN_CODE}
      >
        <View style={styles.dropdownRow}>
          <Dropdown
            trigger={
              <View style={styles.buttonTrigger}>
                <Text variant="bodyPrimary" style={styles.buttonTriggerText}>
                  Menu Desabilitado
                </Text>
              </View>
            }
            items={basicMenuItems}
            disabled
            testID="dropdown-disabled"
          />
        </View>
      </ShowcaseItem>
    </ComponentSection>
  );
};
