import React from 'react';
import { Pressable, PressableProps } from 'react-native';

// eslint-disable-next-line arena/arena-use-ui-components
export const CardPressable: React.FC<PressableProps> = props => {
  return <Pressable {...props} />;
};
