import { useState, useCallback } from 'react';
import {
  UseDropdownProps,
  UseDropdownReturn,
  DropdownItem,
} from './typesDropdown';

export const useDropdown = ({
  items,
  onItemPress,
}: UseDropdownProps): UseDropdownReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleItemPress = useCallback(
    (item: DropdownItem) => {
      if (item.disabled) {
        return;
      }

      item.onPress();

      if (onItemPress) {
        onItemPress(item);
      }

      closeDropdown();
    },
    [onItemPress, closeDropdown]
  );

  return {
    isOpen,
    toggleDropdown,
    closeDropdown,
    handleItemPress,
  };
};
