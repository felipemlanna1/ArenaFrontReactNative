import React from 'react';
import { ImageBackground, StatusBar } from 'react-native';
import { styles } from './stylesRegisterBackground';
import { RegisterBackgroundProps } from './typesRegisterBackground';
import { useRegisterBackground } from './useRegisterBackground';

export const RegisterBackground: React.FC<RegisterBackgroundProps> = React.memo(
  ({ children }) => {
    const { statusBarColor, backgroundImage } = useRegisterBackground();

    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor={statusBarColor} />
        <ImageBackground
          source={backgroundImage}
          style={styles.background}
          resizeMode="cover"
          imageStyle={styles.backgroundImage}
          testID="register-background"
        >
          {children}
        </ImageBackground>
      </>
    );
  }
);
