import React from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginLayoutProps } from './typesLoginLayout';
import { useLoginLayout } from './useLoginLayout';
import { styles } from './stylesLoginLayout';

export const LoginLayout: React.FC<LoginLayoutProps> = React.memo(
  ({ children, verticalAlign = 'center' }) => {
    const { keyboardBehavior, scrollViewProps } = useLoginLayout();

    const contentStyle = [
      styles.content,
      verticalAlign === 'top' && styles.contentTop,
    ];

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
            <View style={contentStyle} testID="login-layout-content">
              {children}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
);
