import React from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginLayoutProps } from './typesLoginLayout';
import { useLoginLayout } from './useLoginLayout';
import { styles } from './stylesLoginLayout';

export const LoginLayout: React.FC<LoginLayoutProps> = React.memo(
  ({ children }) => {
    const { keyboardBehavior, scrollViewProps } = useLoginLayout();

    return (
      <SafeAreaView style={styles.container} testID="login-layout">
        <KeyboardAvoidingView
          behavior={keyboardBehavior}
          style={styles.keyboardView}
          testID="login-layout-keyboard-view"
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            {...scrollViewProps}
            nestedScrollEnabled={true}
            testID="login-layout-scroll-view"
          >
            <View style={styles.content} testID="login-layout-content">
              {children}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
);
