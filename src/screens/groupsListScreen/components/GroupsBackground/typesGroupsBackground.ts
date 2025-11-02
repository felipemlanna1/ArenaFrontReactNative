import { ReactNode } from 'react';
import { ImageSourcePropType } from 'react-native';

export interface GroupsBackgroundProps {
  children: ReactNode;
}

export interface UseGroupsBackgroundReturn {
  statusBarColor: string;
  backgroundImage: ImageSourcePropType;
}
