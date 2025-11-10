import React from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { KeyboardAwareLayoutProps } from './typesKeyboardAwareLayout';
import { useKeyboardAwareLayout } from './useKeyboardAwareLayout';
import { styles } from './stylesKeyboardAwareLayout';

export const KeyboardAwareLayout: React.FC<KeyboardAwareLayoutProps> = ({
  children,
  enableKeyboardAvoid = true,
  verticalOffset,
  scrollEnabled = true,
  contentContainerStyle,
  scrollViewProps,
  testID = 'keyboard-aware-layout',
  withScrollView = true,
  keyboardShouldPersistTaps = 'handled',
  extraScrollHeight = 20,
}) => {
  const {
    keyboardBehavior,
    keyboardOffset,
    shouldEnableAvoid,
    keyboardPadding,
  } = useKeyboardAwareLayout(
    enableKeyboardAvoid,
    verticalOffset,
    extraScrollHeight
  );

  const content = withScrollView ? (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={[
        styles.scrollContent,
        contentContainerStyle,
        {
          paddingBottom:
            ((contentContainerStyle?.paddingBottom as number) || 0) +
            keyboardPadding,
        },
      ]}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      scrollEnabled={scrollEnabled}
      showsVerticalScrollIndicator={false}
      testID={`${testID}-scroll`}
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  ) : (
    children
  );

  if (!shouldEnableAvoid) {
    return withScrollView ? (
      content
    ) : (
      <View style={styles.container}>{content}</View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={keyboardBehavior}
      keyboardVerticalOffset={keyboardOffset}
      enabled={shouldEnableAvoid}
      testID={testID}
    >
      {content}
    </KeyboardAvoidingView>
  );
};
