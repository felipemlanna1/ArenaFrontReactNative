import { ReactNode } from 'react';
import { ImageSourcePropType } from 'react-native';

export interface FriendsBackgroundProps {
  children: ReactNode;
}

export interface UseFriendsBackgroundReturn {
  statusBarColor: string;
  backgroundImage: ImageSourcePropType;
}
