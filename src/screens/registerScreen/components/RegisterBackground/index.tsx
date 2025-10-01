import React from 'react';
import { View, Image, StatusBar } from 'react-native';
import { styles } from './stylesRegisterBackground';
import { RegisterBackgroundProps } from './typesRegisterBackground';
import { useRegisterBackground } from './useRegisterBackground';

export const RegisterBackground: React.FC<RegisterBackgroundProps> = React.memo(
  ({ children }) => {
    const { statusBarColor, backgroundImage } = useRegisterBackground();

    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor={statusBarColor} />
        <View style={styles.background} testID="register-background">
          <Image
            source={backgroundImage}
            style={styles.backgroundImage}
            resizeMode="contain"
          />
          {children}
        </View>
      </>
    );
  }
);
