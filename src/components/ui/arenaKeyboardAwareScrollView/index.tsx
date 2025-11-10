import React from 'react';
import { Platform, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { ArenaKeyboardAwareScrollViewProps } from './typesArenaKeyboardAwareScrollView';
import './stylesArenaKeyboardAwareScrollView';

export const ArenaKeyboardAwareScrollView: React.FC<
  ArenaKeyboardAwareScrollViewProps
> = ({
  children,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  keyboardShouldPersistTaps = 'handled',
  bottomOffset = 60,
  testID,
  ...scrollViewProps
}) => {
  if (Platform.OS === 'ios') {
    return (
      <ScrollView
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        automaticallyAdjustKeyboardInsets={true}
        keyboardDismissMode="interactive"
        testID={testID}
        {...scrollViewProps}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      disableScrollOnKeyboardHide={false}
      bottomOffset={bottomOffset}
      testID={testID}
      {...scrollViewProps}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

export type { ArenaKeyboardAwareScrollViewProps } from './typesArenaKeyboardAwareScrollView';
