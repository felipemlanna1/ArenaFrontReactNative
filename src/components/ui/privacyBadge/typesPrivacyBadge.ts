import { EventPrivacy } from '@/services/events/typesEvents';
import { ViewStyle, TextStyle } from 'react-native';

export interface PrivacyBadgeProps {
  privacy: EventPrivacy;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  showLabel?: boolean;
  groupName?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

export interface PrivacyConfig {
  label: string;
  iconName: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}
