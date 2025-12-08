import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '@/contexts/AuthContext';
import { useInvites } from '@/contexts/InvitesContext';
import { useUnreadNotificationsContext } from '@/contexts/UnreadNotificationsContext';
import { usePendingFeedback } from '@/contexts/PendingFeedbackContext';
import type { RootStackParamList } from '@/navigation/typesNavigation';
import { UseMenuScreenReturn, MenuItem } from './typesMenuScreen';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useMenuScreen = (): UseMenuScreenReturn => {
  const navigation = useNavigation<NavigationProp>();
  const { user, signOut } = useAuth();
  const { counts } = useInvites();
  const { unreadCount } = useUnreadNotificationsContext();
  const { pendingCount } = usePendingFeedback();

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

  const isEmailVerified = useMemo(() => {
    return user?.isEmailVerified || false;
  }, [user]);

  const handleVerifyPress = useCallback(() => {
    navigation.navigate('VerifyEmail', { token: undefined });
  }, [navigation]);

  const menuItems: MenuItem[] = useMemo(
    () => [
      {
        id: 'friends',
        type: 'navigation',
        label: 'Atletas',
        badge: counts.friendRequests,
        testID: 'menu-friends',
      },
      {
        id: 'groups',
        type: 'navigation',
        label: 'Equipes',
        badge: counts.groupInvites,
        testID: 'menu-groups',
      },
      {
        id: 'notifications',
        type: 'navigation',
        label: 'Notificações',
        badge: unreadCount,
        testID: 'menu-notifications',
      },
      {
        id: 'pastEvents',
        type: 'navigation',
        label: 'Eventos Passados',
        badge: pendingCount,
        testID: 'menu-past-events',
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
        label: 'Termos de Uso',
        testID: 'menu-terms',
      },
      {
        id: 'privacy',
        type: 'navigation',
        label: 'Política de Privacidade',
        testID: 'menu-privacy',
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
    [counts, unreadCount, pendingCount]
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
        case 'pastEvents':
          navigation.navigate('PastEvents' as never);
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
        case 'privacy':
          navigation.navigate('Privacy' as never);
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
    isEmailVerified,
    handleVerifyPress,
  };
};
