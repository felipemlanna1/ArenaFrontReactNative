import React from 'react';
import { View, StatusBar } from 'react-native';
import { OptimizedImage } from '@/components/ui/optimizedImage';
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
          <OptimizedImage
            source={backgroundImage}
            style={styles.backgroundImage}
            contentFit="cover"
            contentPosition="center"
            priority="high"
            showLoading={false}
          />
          <View style={styles.overlay} />
          <View style={styles.content}>{children}</View>
        </View>
      </>
    );
  }
);
