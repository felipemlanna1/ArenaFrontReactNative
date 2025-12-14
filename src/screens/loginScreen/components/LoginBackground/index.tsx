import React from 'react';
import { View, StatusBar } from 'react-native';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { styles } from './stylesLoginBackground';
import { LoginBackgroundProps } from './typesLoginBackground';
import { useLoginBackground } from './useLoginBackground';

export const LoginBackground: React.FC<LoginBackgroundProps> = React.memo(
  ({ children }) => {
    const { statusBarColor, backgroundImage } = useLoginBackground();

    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor={statusBarColor} />
        <View style={styles.background} testID="login-background">
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
