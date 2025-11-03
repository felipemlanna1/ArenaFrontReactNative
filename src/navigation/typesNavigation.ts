import { Event } from '@/services/events/typesEvents';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ComponentsShowcase: undefined;
  OnboardingSports: undefined;
  MainTabs: undefined;
  FilterScreen: undefined;
  CreateEvent:
    | {
        mode?: 'create' | 'edit';
        eventId?: string;
        eventData?: Event;
        preSelectedGroupId?: string;
      }
    | undefined;
  EventDetails: { eventId: string };
  GroupDetails: { groupId: string };
  Profile: { userId?: string } | undefined;
  EditProfile: undefined;
  Notifications: undefined;
};

export type TabParamList = {
  HomeTab: undefined;
  FriendsTab: undefined;
  MyEventsTab: undefined;
  GroupsTab: undefined;
  ProfileTab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
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
