import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Text } from '@/components/ui/text';
import { styles } from './stylesVisualAuditScreen';

import { ExploreScreen } from '../exploreScreen';
import { MyEventsScreen } from '../myEventsScreen';
import { ProfileScreen } from '../profileScreen';
import { MenuScreen } from '../menuScreen';
import { EventDetailsScreen } from '../eventDetailsScreen';
import { GroupDetailsScreen } from '../groupDetailsScreen';
import { CreateEventScreen } from '../createEventScreen';
import { CreateGroupScreen } from '../createGroupScreen';
import { NotificationsScreen } from '../notificationsScreen';
import { FriendsScreen } from '../friendsScreen';
import { GroupsListScreen } from '../groupsListScreen';
import { SettingsScreen } from '../settingsScreen';
import { EditProfileScreen } from '../editProfileScreen';

interface VisualAuditScreenParams {
  screen?: string;
  state?: string;
}

export const VisualAuditScreen: React.FC = () => {
  const route =
    useRoute<RouteProp<Record<string, VisualAuditScreenParams>, string>>();
  const { screen } = route.params || {};

  const renderScreen = useMemo(() => {
    if (!screen) {
      return (
        <View style={styles.errorContainer}>
          <Text variant="bodyPrimary">
            Nenhuma screen especificada. Use ?screen=ScreenName&state=stateName
          </Text>
        </View>
      );
    }

    const mockNavigation = {
      navigate: () => {},
      goBack: () => {},
      addListener: () => () => {},
      removeListener: () => {},
      reset: () => {},
      setParams: () => {},
      dispatch: () => {},
      setOptions: () => {},
      isFocused: () => true,
      canGoBack: () => true,
      getParent: () => undefined,
      getState: () => ({ routes: [], index: 0, type: 'stack' }),
      getId: () => undefined,
      push: () => {},
      pop: () => {},
      popToTop: () => {},
      replace: () => {},
    } as never;

    const mockRoute = {
      key: 'mock-route',
      name: 'Mock',
      params: {},
    } as never;

    const screenMap: Record<string, React.ReactNode> = {
      ExploreScreen: <ExploreScreen navigation={mockNavigation} />,
      HomeScreen: <ExploreScreen navigation={mockNavigation} />,
      MyEventsScreen: <MyEventsScreen />,
      ProfileScreen: (
        <ProfileScreen navigation={mockNavigation} route={mockRoute} />
      ),
      MenuScreen: <MenuScreen />,
      EventDetailsScreen: (
        <EventDetailsScreen navigation={mockNavigation} route={mockRoute} />
      ),
      GroupDetailsScreen: (
        <GroupDetailsScreen navigation={mockNavigation} route={mockRoute} />
      ),
      CreateEventScreen: <CreateEventScreen navigation={mockNavigation} />,
      CreateGroupScreen: (
        <CreateGroupScreen navigation={mockNavigation} route={mockRoute} />
      ),
      NotificationsScreen: <NotificationsScreen />,
      FriendsScreen: <FriendsScreen navigation={mockNavigation} />,
      GroupsListScreen: <GroupsListScreen navigation={mockNavigation} />,
      SettingsScreen: (
        <SettingsScreen navigation={mockNavigation} route={mockRoute} />
      ),
      EditProfileScreen: (
        <EditProfileScreen navigation={mockNavigation} route={mockRoute} />
      ),
    };

    const ScreenComponent = screenMap[screen];

    if (!ScreenComponent) {
      return (
        <View style={styles.errorContainer}>
          <Text variant="bodyPrimary">Screen não encontrada: {screen}</Text>
          <Text variant="captionSecondary">
            Screens disponíveis: {Object.keys(screenMap).join(', ')}
          </Text>
        </View>
      );
    }

    return ScreenComponent;
  }, [screen]);

  return <View style={styles.container}>{renderScreen}</View>;
};
