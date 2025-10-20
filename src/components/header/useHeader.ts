import { useCallback } from 'react';
import { UseHeaderProps, UseHeaderReturn } from './typesHeader';
import { DropdownItem } from '@/components/ui/dropdown/typesDropdown';
import { LogoutIcon } from './utils/LogoutIcon';
import { useAlert } from '@/contexts/AlertContext';

export const useHeader = ({ onLogout }: UseHeaderProps): UseHeaderReturn => {
  const { showInfo } = useAlert();

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
        subtle: true,
      },
    ];
  }, [onLogout]);

  const handleNotificationsPress = useCallback(() => {
    showInfo('A funcionalidade de notificações ainda não está implementada.');
  }, [showInfo]);

  return {
    getDefaultMenuItems,
    handleNotificationsPress,
  };
};
