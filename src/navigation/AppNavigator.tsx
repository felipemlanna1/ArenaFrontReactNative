import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ArenaColors } from '../constants';
import { WelcomeScreen } from '../screens/welcome-screen';
import { ComponentsShowcaseScreen } from '../screens/components-showcase-screen';
import { RootStackParamList } from './typesNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
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

  return (
    <NavigationContainer theme={CustomDarkTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen
          name="ComponentsShowcase"
          component={ComponentsShowcaseScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
