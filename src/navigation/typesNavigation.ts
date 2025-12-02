import { Event } from '@/services/events/typesEvents';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  VerifyCode: { email: string };
  ResetPassword: { email: string; code: string };
  ComponentsShowcase: undefined;
  OnboardingSports: undefined;
  MainTabs: undefined;
  FilterScreen: { source: 'home' | 'groups' | 'friends' };
  CreateEvent:
    | {
        mode?: 'create' | 'edit';
        eventId?: string;
        eventData?: Event;
        preSelectedGroupId?: string;
        preSelectedSportId?: string;
      }
    | undefined;
  CreateGroup: undefined;
  EventDetails: { eventId: string };
  GroupDetails: { groupId: string };
  Profile: { userId?: string } | undefined;
  EditProfile: undefined;
  Notifications: undefined;
  Friends: undefined;
  GroupsList: undefined;
  Settings: undefined;
  Help: undefined;
  Terms: undefined;
  Privacy: undefined;
  PastEvents: undefined;
  RateParticipants: { eventId: string };
};

export type TabParamList = {
  MyEventsTab: undefined;
  ExploreTab: undefined;
  CreateEventTab: undefined;
  ProfileTab: undefined;
  MenuTab: undefined;
};

export type ExploreStackParamList = {
  Explore: undefined;
};

export type FriendsStackParamList = {
  Friends: undefined;
};

export type MyEventsStackParamList = {
  MyEvents: undefined;
};

export type GroupsStackParamList = {
  GroupsList: undefined;
  GroupDetails: { groupId: string };
  CreateGroup: undefined;
};

export type ProfileStackParamList = {
  Profile: { userId?: string } | undefined;
};

export type MenuStackParamList = {
  Menu: undefined;
};
