import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/ui/appHeader';
import { AppLayoutProps } from './typesAppLayout';
import { styles } from './stylesAppLayout';

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  showBottomNav = false,
  showHeader = true,
  headerVariant = 'main',
  headerTitle,
  headerShowLogo = true,
  headerShowBackButton = false,
  headerOnBackPress,
  headerRightActions = [],
  headerRightComponent,
  testID = 'app-layout',
}) => {
  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'bottom', 'left', 'right']}
      testID={testID}
    >
      {showHeader && (
        <AppHeader
          variant={headerVariant}
          title={headerTitle}
          showLogo={headerShowLogo}
          showBackButton={headerShowBackButton}
          onBackPress={headerOnBackPress}
          rightActions={headerRightActions}
          rightComponent={headerRightComponent}
          testID={`${testID}-header`}
        />
      )}

      <View style={styles.content}>{children}</View>

      {showBottomNav && (
        <View
          style={styles.bottomNavPlaceholder}
          testID={`${testID}-bottom-nav`}
        />
      )}
    </SafeAreaView>
  );
};
