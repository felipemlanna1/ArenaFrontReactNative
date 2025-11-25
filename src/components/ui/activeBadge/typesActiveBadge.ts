import { StyleProp, ViewStyle } from 'react-native';

export interface ActiveBadgeProps {
  isActive?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
