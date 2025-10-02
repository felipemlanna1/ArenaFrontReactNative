import { ReactNode } from 'react';

export type DropdownVariant = 'default' | 'menu' | 'profile';
export type DropdownPosition = 'top' | 'bottom';

export interface DropdownItem {
  id: string;
  label: string;
  onPress: () => void;
  icon?: React.ComponentType<{ size: number; color: string }>;
  disabled?: boolean;
  destructive?: boolean;
}

export interface DropdownProps {
  variant?: DropdownVariant;
  trigger: ReactNode;
  items: DropdownItem[];
  position?: DropdownPosition;
  testID?: string;
  disabled?: boolean;
}

export interface UseDropdownProps {
  items: DropdownItem[];
  onItemPress?: (item: DropdownItem) => void;
}

export interface UseDropdownReturn {
  isOpen: boolean;
  toggleDropdown: () => void;
  closeDropdown: () => void;
  handleItemPress: (item: DropdownItem) => void;
}
