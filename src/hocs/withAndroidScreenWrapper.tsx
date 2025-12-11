import React from 'react';
import { ViewStyle } from 'react-native';
import { AndroidScreenWrapper } from '@/components/wrappers/AndroidScreenWrapper';
import type { SafeAreaEdgeConfig } from '@/constants';

interface ScreenWrapperOptions {
  safeAreaEdges?: SafeAreaEdgeConfig | false;
  enableScroll?: boolean;
  containerStyle?: ViewStyle;
}

export const withAndroidScreenWrapper = <P extends object>(
  Component: React.ComponentType<P>,
  options?: ScreenWrapperOptions
) => {
  const WrappedComponent = (props: P) => {
    return (
      <AndroidScreenWrapper
        safeAreaEdges={options?.safeAreaEdges}
        enableScroll={options?.enableScroll}
        containerStyle={options?.containerStyle}
      >
        <Component {...props} />
      </AndroidScreenWrapper>
    );
  };

  WrappedComponent.displayName = `WithScreenWrapper(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
};
