import { DropdownItem } from '@/components/ui/dropdown/typesDropdown';

export interface HeaderProps {
  menuItems?: DropdownItem[];
  onLogout?: () => void;
  onBack?: () => void;
  testID?: string;
}

export interface UseHeaderProps {
  onLogout?: () => void;
}

export interface UseHeaderReturn {
  getDefaultMenuItems: () => DropdownItem[];
  handleNotificationsPress: () => void;
}
