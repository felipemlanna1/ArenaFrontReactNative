/**
 * Page Objects Index
 *
 * Central export for all Page Objects
 */

// Base
export { BasePage } from './base/BasePage';

// Auth screens
export { WelcomeScreen } from './auth/WelcomeScreen';
export { RegisterScreen } from './auth/RegisterScreen';
export type { RegisterUserData } from './auth/RegisterScreen';
export { OnboardingSportsScreen } from './auth/OnboardingSportsScreen';

// Main screens
export { MainTabsScreen } from './main/MainTabsScreen';
export { MyEventsScreen } from './main/MyEventsScreen';
export { HomeScreen } from './main/HomeScreen';
export { ProfileScreen } from './main/ProfileScreen';
export { MenuScreen } from './main/MenuScreen';

// Event screens
export { CreateEventScreen } from './events/CreateEventScreen';
export { EventDetailsScreen } from './events/EventDetailsScreen';

// Group screens
export { CreateGroupScreen } from './groups/CreateGroupScreen';
export { GroupDetailsScreen } from './groups/GroupDetailsScreen';
