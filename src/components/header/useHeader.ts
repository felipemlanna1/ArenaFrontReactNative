import { useCallback } from 'react';
import { UseHeaderProps, UseHeaderReturn } from './typesHeader';
import { DropdownItem } from '@/components/ui/dropdown/typesDropdown';
import { LogoutIcon } from './utils/LogoutIcon';

export const useHeader = ({ onLogout }: UseHeaderProps): UseHeaderReturn => {
  const getDefaultMenuItems = useCallback((): DropdownItem[] => {
    return [
      {
        id: 'logout',
        label: 'Sair',
        icon: LogoutIcon,
        onPress: () => {
          if (onLogout) {
            onLogout();
          }
        },
        destructive: true,
      },
    ];
  }, [onLogout]);

  return {
    getDefaultMenuItems,
  };
};
