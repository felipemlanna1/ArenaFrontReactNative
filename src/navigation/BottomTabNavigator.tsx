import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  ArenaColors,
  ArenaBorders,
  ArenaSpacing,
  ArenaTypography,
} from '@/constants';
import { HomeScreen } from '@/screens/homeScreen';
import { ExploreScreen } from '@/screens/exploreScreen';
import { MyEventsScreen } from '@/screens/myEventsScreen';
import { NotificationsScreen } from '@/screens/notificationsScreen';
import { ProfileScreen } from '@/screens/profileScreen';
import {
  TabParamList,
  HomeStackParamList,
  ExploreStackParamList,
  MyEventsStackParamList,
  NotificationsStackParamList,
  ProfileStackParamList,
} from './typesNavigation';

const Tab = createBottomTabNavigator<TabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();
const MyEventsStack = createNativeStackNavigator<MyEventsStackParamList>();
const NotificationsStack =
  createNativeStackNavigator<NotificationsStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const HomeStackScreen: React.FC = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

const ExploreStackScreen: React.FC = () => {
  return (
    <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
      <ExploreStack.Screen name="Explore" component={ExploreScreen} />
    </ExploreStack.Navigator>
  );
};

const MyEventsStackScreen: React.FC = () => {
  return (
    <MyEventsStack.Navigator screenOptions={{ headerShown: false }}>
      <MyEventsStack.Screen name="MyEvents" component={MyEventsScreen} />
    </MyEventsStack.Navigator>
  );
};

const NotificationsStackScreen: React.FC = () => {
  return (
    <NotificationsStack.Navigator screenOptions={{ headerShown: false }}>
      <NotificationsStack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
    </NotificationsStack.Navigator>
  );
};

const ProfileStackScreen: React.FC = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};

export const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: ArenaColors.brand.primary,
        tabBarInactiveTintColor: ArenaColors.neutral.medium,
        tabBarStyle: {
          backgroundColor: ArenaColors.neutral.darkest,
          borderTopColor: ArenaColors.neutral.dark,
          borderTopWidth: ArenaBorders.width.thin,
          height: ArenaSpacing['7xl'],
          paddingBottom: ArenaSpacing.lg,
          paddingTop: ArenaSpacing.sm,
        },
        tabBarLabelStyle: {
          fontSize: ArenaTypography.size.xs,
          fontWeight: ArenaTypography.weight.medium,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ExploreTab"
        component={ExploreStackScreen}
        options={{
          tabBarLabel: 'Explorar',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'search' : 'search-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
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
        }}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsStackScreen}
        options={{
          tabBarLabel: 'Notificações',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'notifications' : 'notifications-outline'}
              size={24}
              color={color}
            />
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
        }}
      />
    </Tab.Navigator>
  );
};
