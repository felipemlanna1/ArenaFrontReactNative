import { Group } from '@/services/groups/typesGroups';

export interface GroupDropdownProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (groupId: string) => void;
  groups: Group[];
  error?: string;
  disabled?: boolean;
  required?: boolean;
  testID?: string;
}

export interface GroupDropdownItemProps {
  group: Group;
  isSelected: boolean;
  onPress: (groupId: string) => void;
  testID?: string;
}
