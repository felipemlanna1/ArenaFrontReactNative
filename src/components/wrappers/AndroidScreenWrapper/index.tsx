import React from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { styles } from './stylesAndroidScreenWrapper';
import type { AndroidScreenWrapperProps } from './typesAndroidScreenWrapper';

const AndroidScreenWrapperContent: React.FC<AndroidScreenWrapperProps> = ({
  children,
  enableScroll = true,
  containerStyle,
  contentContainerStyle,
  testID,
}) => {
  if (enableScroll) {
    return (
      <ScrollView
        style={[styles.container, containerStyle]}
        contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        testID={testID}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View style={[styles.container, containerStyle]} testID={testID}>
      {children}
    </View>
  );
};

export const AndroidScreenWrapper: React.FC<
  AndroidScreenWrapperProps
> = props => {
  if (Platform.OS !== 'android') {
    return <>{props.children}</>;
  }

  return <AndroidScreenWrapperContent {...props} />;
};
