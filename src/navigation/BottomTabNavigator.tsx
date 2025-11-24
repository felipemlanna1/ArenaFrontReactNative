import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  ArenaColors,
  ArenaBorders,
  ArenaSpacing,
  ArenaTypography,
} from '@/constants';
import { withAndroidScreenWrapper } from '@/components/wrappers/AndroidScreenWrapper/withAndroidScreenWrapper';
import { HomeScreen } from '@/screens/homeScreen';
import { EventsScreen } from '@/screens/eventsScreen';
import { ProfileScreen } from '@/screens/profileScreen';
import { MenuScreen } from '@/screens/menuScreen';
import {
  TabParamList,
  HomeStackParamList,
  MyEventsStackParamList,
  ProfileStackParamList,
  MenuStackParamList,
} from './typesNavigation';

const Tab = createBottomTabNavigator<TabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const MyEventsStack = createNativeStackNavigator<MyEventsStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();
const MenuStack = createNativeStackNavigator<MenuStackParamList>();

const WrappedHomeScreen = withAndroidScreenWrapper(HomeScreen, {
  enableScroll: false,
});
const WrappedEventsScreen = withAndroidScreenWrapper(EventsScreen, {
  enableScroll: false,
});
const WrappedProfileScreen = withAndroidScreenWrapper(ProfileScreen);
const WrappedMenuScreen = withAndroidScreenWrapper(MenuScreen, {
  enableScroll: false,
});

const HomeStackScreen: React.FC = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={WrappedHomeScreen} />
    </HomeStack.Navigator>
  );
};

const MyEventsStackScreen: React.FC = () => {
  return (
    <MyEventsStack.Navigator screenOptions={{ headerShown: false }}>
      <MyEventsStack.Screen name="MyEvents" component={WrappedEventsScreen} />
    </MyEventsStack.Navigator>
  );
};

const ProfileStackScreen: React.FC = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={WrappedProfileScreen} />
    </ProfileStack.Navigator>
  );
};

const MenuStackScreen: React.FC = () => {
  return (
    <MenuStack.Navigator screenOptions={{ headerShown: false }}>
      <MenuStack.Screen name="Menu" component={WrappedMenuScreen} />
    </MenuStack.Navigator>
  );
};

export const BottomTabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: ArenaColors.brand.primary,
        tabBarInactiveTintColor: ArenaColors.neutral.medium,
        tabBarStyle: {
          backgroundColor: ArenaColors.neutral.darkest,
          borderTopColor: ArenaColors.neutral.dark,
          borderTopWidth: ArenaBorders.width.thin,
          height: ArenaSpacing['6xl'] + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : ArenaSpacing.lg,
          paddingTop: ArenaSpacing.sm,
        },
        tabBarLabelStyle: {
          fontSize: ArenaTypography.size.xs,
          fontWeight: ArenaTypography.weight.medium,
        },
      }}
    >
      <Tab.Screen
        name="MyEventsTab"
        component={MyEventsStackScreen}
        options={{
          tabBarLabel: 'Eventos',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'calendar' : 'calendar-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarButton: (props) => (
            // @ts-ignore - Type incompatibility between React Navigation and React Native
            <TouchableOpacity {...props} testID="tab-eventos" />
          ),
        }}
      />
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Descobrir',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'compass' : 'compass-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarButton: (props) => (
            // @ts-ignore - Type incompatibility between React Navigation and React Native
            <TouchableOpacity {...props} testID="tab-home" />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarButton: (props) => (
            // @ts-ignore - Type incompatibility between React Navigation and React Native
            <TouchableOpacity {...props} testID="tab-perfil" />
          ),
        }}
      />
      <Tab.Screen
        name="MenuTab"
        component={MenuStackScreen}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'menu' : 'menu-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarButton: (props) => (
            // @ts-ignore - Type incompatibility between React Navigation and React Native
            <TouchableOpacity {...props} testID="tab-menu" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
