export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ComponentsShowcase: undefined;
  OnboardingSports: undefined;
  MainTabs: undefined;
  FilterScreen: undefined;
  CreateEvent: { mode?: 'create' | 'edit'; eventId?: string; eventData?: any } | undefined;
  EventDetails: { eventId: string };
};

export type TabParamList = {
  HomeTab: undefined;
  ExploreTab: undefined;
  MyEventsTab: undefined;
  NotificationsTab: undefined;
  ProfileTab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
};

export type ExploreStackParamList = {
  Explore: undefined;
};

export type MyEventsStackParamList = {
  MyEvents: undefined;
};

export type NotificationsStackParamList = {
  Notifications: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
};
