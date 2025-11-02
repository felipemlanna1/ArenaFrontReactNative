import React from 'react';
import { View } from 'react-native';
import { Header } from '@/components/header';
import { AppLayoutProps } from './typesAppLayout';
import { styles } from './stylesAppLayout';

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  onLogout,
  onBack,
  showBottomNav = false,
  testID = 'app-layout',
}) => {
  return (
    <View style={styles.container} testID={testID}>
      <Header onLogout={onLogout} onBack={onBack} testID={`${testID}-header`} />

      <View style={styles.content}>{children}</View>

      {showBottomNav && (
        <View
          style={styles.bottomNavPlaceholder}
          testID={`${testID}-bottom-nav`}
        />
      )}
    </View>
  );
};
