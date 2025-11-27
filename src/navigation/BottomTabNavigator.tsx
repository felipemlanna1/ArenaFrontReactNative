import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CenterCreateButton } from './components/CenterCreateButton';
import { NotificationBadge } from '@/components/ui/notificationBadge';
import { useInvites } from '@/contexts/InvitesContext';
import {
  ArenaColors,
  ArenaBorders,
  ArenaSpacing,
  ArenaTypography,
} from '@/constants';
import { withAndroidScreenWrapper } from '@/components/wrappers/AndroidScreenWrapper/withAndroidScreenWrapper';
import { ExploreScreen } from '@/screens/exploreScreen';
import { EventsScreen } from '@/screens/eventsScreen';
import { ProfileScreen } from '@/screens/profileScreen';
import { MenuScreen } from '@/screens/menuScreen';
import {
  TabParamList,
  ExploreStackParamList,
  MyEventsStackParamList,
  ProfileStackParamList,
  MenuStackParamList,
} from './typesNavigation';

const Tab = createBottomTabNavigator<TabParamList>();
const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();
const MyEventsStack = createNativeStackNavigator<MyEventsStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();
const MenuStack = createNativeStackNavigator<MenuStackParamList>();

const WrappedExploreScreen = withAndroidScreenWrapper(ExploreScreen, {
  enableScroll: false,
});
const WrappedEventsScreen = withAndroidScreenWrapper(EventsScreen, {
  enableScroll: false,
});
const WrappedProfileScreen = withAndroidScreenWrapper(ProfileScreen);
const WrappedMenuScreen = withAndroidScreenWrapper(MenuScreen, {
  enableScroll: false,
});

const ExploreStackScreen: React.FC = () => {
  return (
    <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
      <ExploreStack.Screen name="Explore" component={WrappedExploreScreen} />
    </ExploreStack.Navigator>
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
  const navigation = useNavigation();
  const { counts } = useInvites();

  const handleCreateEventPress = () => {
    // @ts-expect-error - Navigation type
    navigation.navigate('CreateEvent');
  };

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
          tabBarButton: props => (
            // @ts-expect-error - Type incompatibility between React Navigation and React Native
            <TouchableOpacity {...props} testID="tab-eventos" />
          ),
        }}
      />
      <Tab.Screen
        name="ExploreTab"
        component={ExploreStackScreen}
        options={{
          tabBarLabel: 'Descobrir',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'compass' : 'compass-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarButton: props => (
            // @ts-expect-error - Type incompatibility between React Navigation and React Native
            <TouchableOpacity {...props} testID="tab-explore" />
          ),
        }}
      />
      <Tab.Screen
        name="CreateEventTab"
        component={View}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => null,
          tabBarButton: () => (
            <CenterCreateButton
              onPress={handleCreateEventPress}
              testID="tab-create"
            />
          ),
        }}
        listeners={{
          tabPress: e => {
            e.preventDefault();
            handleCreateEventPress();
          },
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
          tabBarButton: props => (
            // @ts-expect-error - Type incompatibility between React Navigation and React Native
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
            <View>
              <Ionicons
                name={focused ? 'menu' : 'menu-outline'}
                size={24}
                color={color}
              />
              <NotificationBadge count={counts.total} size="sm" />
            </View>
          ),
          tabBarButton: props => (
            // @ts-expect-error - Type incompatibility between React Navigation and React Native
            <TouchableOpacity {...props} testID="tab-menu" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
