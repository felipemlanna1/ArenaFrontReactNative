import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Text } from '@/components/ui/text';
import { ArenaColors, ArenaSpacing } from '@/constants';

// Import all screens
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

/**
 * VisualAuditScreen
 *
 * Tela especial para Visual Audit que renderiza qualquer screen com dados mockados.
 *
 * Uso:
 * /visual-audit?screen=EventDetailsScreen&state=asParticipant
 * /visual-audit?screen=HomeScreen&state=empty
 *
 * Estados disponíveis por screen:
 * - EventDetailsScreen: asParticipant, asOrganizer, notParticipating, fullCapacity, cancelled
 * - GroupDetailsScreen: asMember, asAdmin, asOwner, notMember, pendingRequest, invited, fullCapacity
 * - HomeScreen: loading, empty, filled, error
 * - MyEventsScreen: loading, empty, filled, error
 * - etc.
 */

interface VisualAuditScreenParams {
  screen?: string;
  state?: string;
}

export const VisualAuditScreen: React.FC = () => {
  const route = useRoute<RouteProp<Record<string, VisualAuditScreenParams>, string>>();
  const { screen, state } = route.params || {};

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

    // Map screen names to components
    // Mock data will be injected via context or props based on state param
    const screenMap: Record<string, React.ReactNode> = {
      // Main Tabs
      ExploreScreen: <ExploreScreen navigation={{} as never} />,
      HomeScreen: <ExploreScreen navigation={{} as never} />,
      MyEventsScreen: <MyEventsScreen />,
      ProfileScreen: <ProfileScreen />,
      MenuScreen: <MenuScreen />,

      // Detail Screens
      EventDetailsScreen: <EventDetailsScreen />,
      GroupDetailsScreen: <GroupDetailsScreen />,

      // Create Screens
      CreateEventScreen: <CreateEventScreen />,
      CreateGroupScreen: <CreateGroupScreen />,

      // Secondary Screens
      NotificationsScreen: <NotificationsScreen />,
      FriendsScreen: <FriendsScreen />,
      GroupsListScreen: <GroupsListScreen />,
      SettingsScreen: <SettingsScreen />,
      EditProfileScreen: <EditProfileScreen />,
    };

    const ScreenComponent = screenMap[screen];

    if (!ScreenComponent) {
      return (
        <View style={styles.errorContainer}>
          <Text variant="bodyPrimary">
            Screen não encontrada: {screen}
          </Text>
          <Text variant="captionSecondary">
            Screens disponíveis:{' '}
            {Object.keys(screenMap).join(', ')}
          </Text>
        </View>
      );
    }

    return ScreenComponent;
  }, [screen, state]);

  return <View style={styles.container}>{renderScreen}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: ArenaSpacing.lg,
    backgroundColor: ArenaColors.neutral.darkest,
  },
});
