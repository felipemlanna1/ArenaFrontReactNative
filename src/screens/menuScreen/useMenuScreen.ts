import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/contexts/AuthContext';
import { UseMenuScreenReturn, MenuItem } from './typesMenuScreen';

export const useMenuScreen = (): UseMenuScreenReturn => {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();

  const userName = useMemo(() => {
    if (!user) return '';
    return `${user.firstName} ${user.lastName}`;
  }, [user]);

  const userEmail = useMemo(() => {
    return user?.email || '';
  }, [user]);

  const userAvatar = useMemo(() => {
    return user?.profilePicture || user?.avatar || null;
  }, [user]);

  const menuItems: MenuItem[] = useMemo(
    () => [
      {
        id: 'friends',
        type: 'navigation',
        label: 'Amigos',
        badge: user?.totalFriends || 0,
        testID: 'menu-friends',
      },
      {
        id: 'groups',
        type: 'navigation',
        label: 'Grupos',
        badge: user?.totalGroups || 0,
        testID: 'menu-groups',
      },
      {
        id: 'notifications',
        type: 'navigation',
        label: 'Notificações',
        badge: user?.totalInvites || 0,
        testID: 'menu-notifications',
      },
      {
        id: 'divider-1',
        type: 'divider',
      },
      {
        id: 'settings',
        type: 'navigation',
        label: 'Configurações',
        testID: 'menu-settings',
      },
      {
        id: 'help',
        type: 'navigation',
        label: 'Ajuda & Suporte',
        testID: 'menu-help',
      },
      {
        id: 'terms',
        type: 'navigation',
        label: 'Termos & Privacidade',
        testID: 'menu-terms',
      },
      {
        id: 'divider-2',
        type: 'divider',
      },
      {
        id: 'logout',
        type: 'action',
        label: 'Sair',
        testID: 'menu-logout',
      },
    ],
    [user]
  );

  const handleItemPress = useCallback(
    (item: MenuItem) => {
      if (item.disabled) return;

      switch (item.id) {
        case 'friends':
          navigation.navigate('Friends' as never);
          break;
        case 'groups':
          navigation.navigate('GroupsList' as never);
          break;
        case 'notifications':
          navigation.navigate('Notifications' as never);
          break;
        case 'settings':
          navigation.navigate('Settings' as never);
          break;
        case 'help':
          navigation.navigate('Help' as never);
          break;
        case 'terms':
          navigation.navigate('Terms' as never);
          break;
        case 'logout':
          signOut();
          break;
        default:
          break;
      }
    },
    [navigation, signOut]
  );

  return {
    menuItems,
    handleItemPress,
    userName,
    userEmail,
    userAvatar,
  };
};
