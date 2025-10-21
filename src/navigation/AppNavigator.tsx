import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ArenaColors } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { WelcomeScreen } from '../screens/welcomeScreen';
import { LoginScreen } from '../screens/loginScreen';
import { RegisterScreen } from '../screens/registerScreen';
import { ComponentsShowcaseScreen } from '../screens/componentsShowcaseScreen';
import { OnboardingSportsScreen } from '../screens/onboardingSportsScreen';
import { FilterScreen } from '../screens/filterScreen';
import { CreateEventScreen } from '../screens/createEventScreen';
import { EventDetailsScreen } from '../screens/eventDetailsScreen';
import { ProfileScreen } from '../screens/profileScreen';
import { EditProfileScreen } from '../screens/editProfileScreen';
import { BottomTabNavigator } from './BottomTabNavigator';
import { RootStackParamList } from './typesNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

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

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer theme={CustomDarkTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen
              name="ComponentsShowcase"
              component={ComponentsShowcaseScreen}
            />
          </>
        ) : !user.hasSports ? (
          <Stack.Screen
            name="OnboardingSports"
            component={OnboardingSportsScreen}
          />
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
            <Stack.Screen
              name="FilterScreen"
              component={FilterScreen}
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
              component={CreateEventScreen}
              options={{
                presentation: 'card',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="EventDetails"
              component={EventDetailsScreen}
              options={{
                presentation: 'card',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                presentation: 'card',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen}
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
