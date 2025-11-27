import { DropdownItem } from '@/components/ui/dropdown/typesDropdown';

export interface HeaderProps {
  testID?: string;
}

export interface UseHeaderProps {
  onLogout?: () => void;
}

export interface UseHeaderReturn {
  getDefaultMenuItems: () => DropdownItem[];
  handleNotificationsPress: () => void;
}
