import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  ArenaColors,
  ArenaBorders,
  ArenaSpacing,
  ArenaTypography,
} from '@/constants';
import { withAndroidScreenWrapper } from '@/components/wrappers/AndroidScreenWrapper/withAndroidScreenWrapper';
import { HomeScreen } from '@/screens/homeScreen';
import { FriendsScreen } from '@/screens/friendsScreen';
import { MyEventsScreen } from '@/screens/myEventsScreen';
import { GroupsListScreen } from '@/screens/groupsListScreen';
import { GroupDetailsScreen } from '@/screens/groupDetailsScreen';
import { CreateGroupScreen } from '@/screens/createGroupScreen';
import { ProfileScreen } from '@/screens/profileScreen';
import {
  TabParamList,
  HomeStackParamList,
  FriendsStackParamList,
  MyEventsStackParamList,
  GroupsStackParamList,
  ProfileStackParamList,
} from './typesNavigation';

const Tab = createBottomTabNavigator<TabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const FriendsStack = createNativeStackNavigator<FriendsStackParamList>();
const MyEventsStack = createNativeStackNavigator<MyEventsStackParamList>();
const GroupsStack = createNativeStackNavigator<GroupsStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const WrappedHomeScreen = withAndroidScreenWrapper(HomeScreen, {
  enableScroll: false,
});
const WrappedFriendsScreen = withAndroidScreenWrapper(FriendsScreen);
const WrappedMyEventsScreen = withAndroidScreenWrapper(MyEventsScreen, {
  enableScroll: false,
});
const WrappedGroupsListScreen = withAndroidScreenWrapper(GroupsListScreen);
const WrappedGroupDetailsScreen = withAndroidScreenWrapper(GroupDetailsScreen);
const WrappedCreateGroupScreen = withAndroidScreenWrapper(CreateGroupScreen);
const WrappedProfileScreen = withAndroidScreenWrapper(ProfileScreen);

const HomeStackScreen: React.FC = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={WrappedHomeScreen} />
    </HomeStack.Navigator>
  );
};

const FriendsStackScreen: React.FC = () => {
  return (
    <FriendsStack.Navigator screenOptions={{ headerShown: false }}>
      <FriendsStack.Screen name="Friends" component={WrappedFriendsScreen} />
    </FriendsStack.Navigator>
  );
};

const MyEventsStackScreen: React.FC = () => {
  return (
    <MyEventsStack.Navigator screenOptions={{ headerShown: false }}>
      <MyEventsStack.Screen name="MyEvents" component={WrappedMyEventsScreen} />
    </MyEventsStack.Navigator>
  );
};

const GroupsStackScreen: React.FC = () => {
  return (
    <GroupsStack.Navigator screenOptions={{ headerShown: false }}>
      <GroupsStack.Screen
        name="GroupsList"
        component={WrappedGroupsListScreen}
      />
      <GroupsStack.Screen
        name="GroupDetails"
        component={WrappedGroupDetailsScreen}
      />
      <GroupsStack.Screen
        name="CreateGroup"
        component={WrappedCreateGroupScreen}
      />
    </GroupsStack.Navigator>
  );
};

const ProfileStackScreen: React.FC = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={WrappedProfileScreen} />
    </ProfileStack.Navigator>
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
        name="FriendsTab"
        component={FriendsStackScreen}
        options={{
          tabBarLabel: 'Amigos',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'people' : 'people-outline'}
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
        name="GroupsTab"
        component={GroupsStackScreen}
        options={{
          tabBarLabel: 'Grupos',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'account-group' : 'account-group-outline'}
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
