import React from 'react';
import { ImageBackground, StatusBar } from 'react-native';
import { styles } from './stylesLoginBackground';
import { LoginBackgroundProps } from './typesLoginBackground';
import { useLoginBackground } from './useLoginBackground';

export const LoginBackground: React.FC<LoginBackgroundProps> = React.memo(
  ({ children }) => {
    const { statusBarColor, backgroundImage } = useLoginBackground();

    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor={statusBarColor} />
        <ImageBackground
          source={backgroundImage}
          style={styles.background}
          resizeMode="cover"
          imageStyle={styles.backgroundImage}
          testID="login-background"
        >
          {children}
        </ImageBackground>
      </>
    );
  }
);
