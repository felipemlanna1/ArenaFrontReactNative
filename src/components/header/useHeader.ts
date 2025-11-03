import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UseHeaderProps, UseHeaderReturn } from './typesHeader';
import { DropdownItem } from '@/components/ui/dropdown/typesDropdown';
import { LogoutIcon } from './utils/LogoutIcon';
import { RootStackParamList } from '@/navigation/typesNavigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useHeader = ({ onLogout }: UseHeaderProps): UseHeaderReturn => {
  const navigation = useNavigation<NavigationProp>();

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
    navigation.navigate('Notifications');
  }, [navigation]);

  return {
    getDefaultMenuItems,
    handleNotificationsPress,
  };
};
