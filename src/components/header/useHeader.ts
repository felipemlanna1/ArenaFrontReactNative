import { useCallback } from 'react';
import { Alert } from 'react-native';
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
        subtle: true,
      },
    ];
  }, [onLogout]);

  const handleNotificationsPress = useCallback(() => {
    Alert.alert(
      'Notificações',
      'A funcionalidade de notificações ainda não está implementada.',
      [{ text: 'OK' }]
    );
  }, []);

  return {
    getDefaultMenuItems,
    handleNotificationsPress,
  };
};
