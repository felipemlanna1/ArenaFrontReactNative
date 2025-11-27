export type MenuItemType = 'navigation' | 'action' | 'divider';

export interface MenuItem {
  id: string;
  type: MenuItemType;
  label?: string;
  badge?: number;
  onPress?: () => void;
  testID?: string;
  disabled?: boolean;
}

export interface UseMenuScreenReturn {
  menuItems: MenuItem[];
  handleItemPress: (item: MenuItem) => void;
  userName: string;
  userEmail: string;
  userAvatar: string | null;
}
