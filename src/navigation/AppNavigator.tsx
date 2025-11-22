import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ArenaColors } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { withAndroidScreenWrapper } from '../components/wrappers/AndroidScreenWrapper/withAndroidScreenWrapper';
import { WelcomeScreen } from '../screens/welcomeScreen';
import { LoginScreen } from '../screens/loginScreen';
import { RegisterScreen } from '../screens/registerScreen';
import { ComponentsShowcaseScreen } from '../screens/componentsShowcaseScreen';
import { OnboardingSportsScreen } from '../screens/onboardingSportsScreen';
import { FilterScreen } from '../screens/filterScreen';
import { CreateEventScreen } from '../screens/createEventScreen';
import { EventDetailsScreen } from '../screens/eventDetailsScreen';
import { GroupDetailsScreen } from '../screens/groupDetailsScreen';
import { ProfileScreen } from '../screens/profileScreen';
import { EditProfileScreen } from '../screens/editProfileScreen';
import { NotificationsScreen } from '../screens/notificationsScreen';
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

export const AppNavigator: React.FC = () => {
  const { user, isLoading } = useAuth();

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
    <NavigationContainer theme={CustomDarkTheme} linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Welcome" component={WrappedWelcomeScreen} />
            <Stack.Screen name="Login" component={WrappedLoginScreen} />
            <Stack.Screen name="Register" component={WrappedRegisterScreen} />
            <Stack.Screen
              name="ComponentsShowcase"
              component={WrappedComponentsShowcaseScreen}
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
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
