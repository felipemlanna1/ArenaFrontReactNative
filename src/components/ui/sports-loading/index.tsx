import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { SportsLoadingProps } from './typesSportsLoading';
import { useSportsLoading } from './useSportsLoading';
import { getSportIcon } from './sports-icons';
import './stylesSportsLoading';

export const SportsLoading: React.FC<SportsLoadingProps> = ({
  size = 'md',
  orientation = 'horizontal',
  animationSpeed = 'normal',
  iconCount = 3,
  style,
  testID,
}) => {
  const { selectedIcons, containerStyle, iconContainerStyle, iconStyle } =
    useSportsLoading({
      size,
      orientation,
      animationSpeed,
      iconCount,
    });

  return (
    <View style={[containerStyle, style]} testID={testID}>
      {selectedIcons.map((iconKey, index) => (
        <View key={`${iconKey}-${index}`} style={iconContainerStyle}>
          <Animated.Image
            source={getSportIcon(iconKey)}
            style={iconStyle(index)}
            testID={`${testID}-icon-${index}`}
          />
        </View>
      ))}
    </View>
  );
};
