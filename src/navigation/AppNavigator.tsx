import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ArenaColors } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { feedbackApi } from '../services/feedback/feedbackApi';
import { PendingFeedbackModal } from '../components/feedback/PendingFeedbackModal';
import { withAndroidScreenWrapper } from '../components/wrappers/AndroidScreenWrapper/withAndroidScreenWrapper';
import { WelcomeScreen } from '../screens/welcomeScreen';
import { LoginScreen } from '../screens/loginScreen';
import { RegisterScreen } from '../screens/registerScreen';
import { ForgotPasswordScreen } from '../screens/forgotPasswordScreen';
import { VerifyCodeScreen } from '../screens/verifyCodeScreen';
import { ResetPasswordScreen } from '../screens/resetPasswordScreen';
import { ComponentsShowcaseScreen } from '../screens/componentsShowcaseScreen';
import { OnboardingSportsScreen } from '../screens/onboardingSportsScreen';
import { FilterScreen } from '../screens/filterScreen';
import { CreateEventScreen } from '../screens/createEventScreen';
import { CreateGroupScreen } from '../screens/createGroupScreen';
import { EventDetailsScreen } from '../screens/eventDetailsScreen';
import { GroupDetailsScreen } from '../screens/groupDetailsScreen';
import { ProfileScreen } from '../screens/profileScreen';
import { EditProfileScreen } from '../screens/editProfileScreen';
import { NotificationsScreen } from '../screens/notificationsScreen';
import { FriendsScreen } from '../screens/friendsScreen';
import { GroupsListScreen } from '../screens/groupsListScreen';
import { SettingsScreen } from '../screens/settingsScreen';
import { HelpScreen } from '../screens/helpScreen';
import { TermsScreen } from '../screens/termsScreen';
import { PrivacyPolicyScreen } from '../screens/privacyPolicyScreen';
import { PastEventsScreen } from '../screens/pastEventsScreen';
import { RateParticipantsScreen } from '../screens/rateParticipantsScreen';
import { DeleteAccountScreen } from '../screens/deleteAccountScreen';
import { BottomTabNavigator } from './BottomTabNavigator';
import { RootStackParamList } from './typesNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const WrappedWelcomeScreen = withAndroidScreenWrapper(WelcomeScreen, {
  enableScroll: false,
});
const WrappedLoginScreen = withAndroidScreenWrapper(LoginScreen, {
  enableScroll: false,
});
const WrappedRegisterScreen = withAndroidScreenWrapper(RegisterScreen, {
  enableScroll: false,
});
const WrappedForgotPasswordScreen = withAndroidScreenWrapper(
  ForgotPasswordScreen,
  { enableScroll: false }
);
const WrappedVerifyCodeScreen = withAndroidScreenWrapper(VerifyCodeScreen, {
  enableScroll: false,
});
const WrappedResetPasswordScreen = withAndroidScreenWrapper(
  ResetPasswordScreen,
  { enableScroll: false }
);
const WrappedComponentsShowcaseScreen = withAndroidScreenWrapper(
  ComponentsShowcaseScreen,
  { enableScroll: false }
);
const WrappedOnboardingSportsScreen = withAndroidScreenWrapper(
  OnboardingSportsScreen
);
const WrappedFilterScreen = withAndroidScreenWrapper(FilterScreen, {
  enableScroll: false,
});
const WrappedCreateEventScreen = withAndroidScreenWrapper(CreateEventScreen, {
  enableScroll: false,
});
const WrappedCreateGroupScreen = withAndroidScreenWrapper(CreateGroupScreen, {
  enableScroll: false,
});
const WrappedEventDetailsScreen = withAndroidScreenWrapper(EventDetailsScreen, {
  enableScroll: false,
});
const WrappedGroupDetailsScreen = withAndroidScreenWrapper(GroupDetailsScreen, {
  enableScroll: false,
});
const WrappedProfileScreen = withAndroidScreenWrapper(ProfileScreen);
const WrappedEditProfileScreen = withAndroidScreenWrapper(EditProfileScreen, {
  enableScroll: false,
});
const WrappedNotificationsScreen = withAndroidScreenWrapper(
  NotificationsScreen,
  { enableScroll: false }
);
const WrappedFriendsScreen = withAndroidScreenWrapper(FriendsScreen, {
  enableScroll: false,
});
const WrappedGroupsListScreen = withAndroidScreenWrapper(GroupsListScreen, {
  enableScroll: false,
});
const WrappedSettingsScreen = withAndroidScreenWrapper(SettingsScreen, {
  enableScroll: false,
});
const WrappedHelpScreen = withAndroidScreenWrapper(HelpScreen, {
  enableScroll: false,
});
const WrappedTermsScreen = withAndroidScreenWrapper(TermsScreen, {
  enableScroll: false,
});
const WrappedPrivacyPolicyScreen = withAndroidScreenWrapper(
  PrivacyPolicyScreen,
  { enableScroll: false }
);
const WrappedPastEventsScreen = withAndroidScreenWrapper(PastEventsScreen, {
  enableScroll: false,
});
const WrappedRateParticipantsScreen = withAndroidScreenWrapper(
  RateParticipantsScreen,
  { enableScroll: false }
);
const WrappedDeleteAccountScreen = withAndroidScreenWrapper(
  DeleteAccountScreen,
  { enableScroll: false }
);

export const AppNavigator: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigationRef = React.useRef<any>(null);

  const [pendingEventsCount, setPendingEventsCount] = useState(0);
  const [isModalDismissed, setIsModalDismissed] = useState(false);

  useEffect(() => {
    const fetchPendingEvents = async () => {
      if (!user || isLoading) return;

      try {
        const events = await feedbackApi.getPendingEvents();
        setPendingEventsCount(events.length);
      } catch {
        setPendingEventsCount(0);
      }
    };

    fetchPendingEvents();
  }, [user, isLoading]);

  const handleDismissModal = useCallback(() => {
    setIsModalDismissed(true);
  }, []);

  const handleNavigateToPastEvents = useCallback(() => {
    setIsModalDismissed(true);
    if (navigationRef.current) {
      navigationRef.current.navigate('PastEvents');
    }
  }, []);

  const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: ArenaColors.brand.primary,
      background: ArenaColors.neutral.darkest,
      card: ArenaColors.neutral.dark,
      text: ArenaColors.neutral.light,
      border: ArenaColors.neutral.medium,
      notification: ArenaColors.brand.primary,
    },
  };

  const linking = {
    prefixes: ['arena://', 'exp://'],
    config: {
      screens: {
        MainTabs: 'tabs',
        EventDetails: 'event/:eventId',
        GroupDetails: 'group/:groupId',
        Profile: 'profile/:userId',
        Notifications: 'notifications',
      },
    },
  };

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={CustomDarkTheme}
      linking={linking}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Welcome" component={WrappedWelcomeScreen} />
            <Stack.Screen name="Login" component={WrappedLoginScreen} />
            <Stack.Screen name="Register" component={WrappedRegisterScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={WrappedForgotPasswordScreen}
            />
            <Stack.Screen
              name="VerifyCode"
              component={WrappedVerifyCodeScreen}
            />
            <Stack.Screen
              name="ResetPassword"
              component={WrappedResetPasswordScreen}
            />
            <Stack.Screen
              name="ComponentsShowcase"
              component={WrappedComponentsShowcaseScreen}
            />
            <Stack.Screen
              name="Terms"
              component={WrappedTermsScreen}
              options={{
                presentation: 'card',
                headerShown: true,
                headerTitle: 'Termos de Uso',
                headerStyle: {
                  backgroundColor: ArenaColors.neutral.darkest,
                },
                headerTintColor: ArenaColors.neutral.light,
              }}
            />
            <Stack.Screen
              name="Privacy"
              component={WrappedPrivacyPolicyScreen}
              options={{
                presentation: 'card',
                headerShown: true,
                headerTitle: 'Política de Privacidade',
                headerStyle: {
                  backgroundColor: ArenaColors.neutral.darkest,
                },
                headerTintColor: ArenaColors.neutral.light,
              }}
            />
          </>
        ) : !user.hasSports ? (
          <Stack.Screen
            name="OnboardingSports"
            component={WrappedOnboardingSportsScreen}
          />
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
            <Stack.Screen
              name="FilterScreen"
              component={WrappedFilterScreen}
              options={{
                presentation: 'modal',
                headerShown: true,
                headerTitle: 'Filtros',
                headerStyle: {
                  backgroundColor: ArenaColors.neutral.darkest,
                },
                headerTintColor: ArenaColors.neutral.light,
              }}
            />
            <Stack.Screen
              name="CreateEvent"
              component={WrappedCreateEventScreen}
              options={{
                presentation: 'card',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CreateGroup"
              component={WrappedCreateGroupScreen}
              options={{
                presentation: 'card',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="EventDetails"
              component={WrappedEventDetailsScreen}
              options={{
                presentation: 'card',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="GroupDetails"
              component={WrappedGroupDetailsScreen}
              options={{
                presentation: 'card',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Profile"
              component={WrappedProfileScreen}
              options={{
                presentation: 'card',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="EditProfile"
              component={WrappedEditProfileScreen}
              options={{
                presentation: 'card',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Notifications"
              component={WrappedNotificationsScreen}
              options={{
                presentation: 'card',
                headerShown: true,
                headerTitle: 'Notificações',
                headerStyle: {
                  backgroundColor: ArenaColors.neutral.darkest,
                },
                headerTintColor: ArenaColors.neutral.light,
              }}
            />
            <Stack.Screen
              name="Friends"
              component={WrappedFriendsScreen}
              options={{
                presentation: 'card',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="GroupsList"
              component={WrappedGroupsListScreen}
              options={{
                presentation: 'card',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Settings"
              component={WrappedSettingsScreen}
              options={{
                presentation: 'card',
                headerShown: true,
                headerTitle: 'Configurações',
                headerStyle: {
                  backgroundColor: ArenaColors.neutral.darkest,
                },
                headerTintColor: ArenaColors.neutral.light,
              }}
            />
            <Stack.Screen
              name="Help"
              component={WrappedHelpScreen}
              options={{
                presentation: 'card',
                headerShown: true,
                headerTitle: 'Ajuda & Suporte',
                headerStyle: {
                  backgroundColor: ArenaColors.neutral.darkest,
                },
                headerTintColor: ArenaColors.neutral.light,
              }}
            />
            <Stack.Screen
              name="Terms"
              component={WrappedTermsScreen}
              options={{
                presentation: 'card',
                headerShown: true,
                headerTitle: 'Termos de Uso',
                headerStyle: {
                  backgroundColor: ArenaColors.neutral.darkest,
                },
                headerTintColor: ArenaColors.neutral.light,
              }}
            />
            <Stack.Screen
              name="Privacy"
              component={WrappedPrivacyPolicyScreen}
              options={{
                presentation: 'card',
                headerShown: true,
                headerTitle: 'Política de Privacidade',
                headerStyle: {
                  backgroundColor: ArenaColors.neutral.darkest,
                },
                headerTintColor: ArenaColors.neutral.light,
              }}
            />
            <Stack.Screen
              name="PastEvents"
              component={WrappedPastEventsScreen}
              options={{
                presentation: 'card',
                headerShown: true,
                headerTitle: 'Eventos Passados',
                headerStyle: {
                  backgroundColor: ArenaColors.neutral.darkest,
                },
                headerTintColor: ArenaColors.neutral.light,
              }}
            />
            <Stack.Screen
              name="RateParticipants"
              component={WrappedRateParticipantsScreen}
              options={{
                presentation: 'card',
                headerShown: true,
                headerTitle: 'Avaliar Participantes',
                headerStyle: {
                  backgroundColor: ArenaColors.neutral.darkest,
                },
                headerTintColor: ArenaColors.neutral.light,
              }}
            />
            <Stack.Screen
              name="DeleteAccount"
              component={WrappedDeleteAccountScreen}
              options={{
                presentation: 'card',
                headerShown: true,
                headerTitle: 'Excluir Conta',
                headerStyle: {
                  backgroundColor: ArenaColors.neutral.darkest,
                },
                headerTintColor: ArenaColors.neutral.light,
              }}
            />
          </>
        )}
      </Stack.Navigator>

      {user && (
        <PendingFeedbackModal
          visible={pendingEventsCount > 0 && !isModalDismissed}
          onDismiss={handleDismissModal}
          onNavigateToPastEvents={handleNavigateToPastEvents}
          pendingCount={pendingEventsCount}
          testID="pending-feedback-modal"
        />
      )}
    </NavigationContainer>
  );
};
