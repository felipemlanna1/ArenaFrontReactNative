import React from 'react';
import { ImageBackground, StatusBar } from 'react-native';
import { styles } from './stylesFriendsBackground';
import { FriendsBackgroundProps } from './typesFriendsBackground';
import { useFriendsBackground } from './useFriendsBackground';

export const FriendsBackground: React.FC<FriendsBackgroundProps> = React.memo(
  ({ children }) => {
    const { statusBarColor, backgroundImage } = useFriendsBackground();

    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor={statusBarColor} />
        <ImageBackground
          source={backgroundImage}
          style={styles.background}
          resizeMode="cover"
          imageStyle={styles.backgroundImage}
          testID="friends-background"
        >
          {children}
        </ImageBackground>
      </>
    );
  }
);
