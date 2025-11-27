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

export interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  testID?: string;
}

export interface UseMenuDrawerParams {
  isOpen: boolean;
  onClose: () => void;
}

export interface UseMenuDrawerReturn {
  menuItems: MenuItem[];
  handleItemPress: (item: MenuItem) => void;
  handleClose: () => void;
  userName: string;
  userEmail: string;
  userAvatar: string | null;
}
