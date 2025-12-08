import React from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaEdges } from '@/constants';
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

export const AndroidScreenWrapper: React.FC<AndroidScreenWrapperProps> = ({
  children,
  safeAreaEdges = 'DEFAULT',
  ...props
}) => {
  const content =
    Platform.OS === 'android' ? (
      <AndroidScreenWrapperContent {...props}>
        {children}
      </AndroidScreenWrapperContent>
    ) : (
      children
    );

  if (safeAreaEdges === false) {
    return <>{content}</>;
  }

  const edges =
    typeof safeAreaEdges === 'string'
      ? SafeAreaEdges[safeAreaEdges]
      : SafeAreaEdges.DEFAULT;

  return (
    <SafeAreaView style={styles.safeArea} edges={edges}>
      {content}
    </SafeAreaView>
  );
};
