import React from 'react';
import { AndroidScreenWrapper } from './index';

export const withAndroidScreenWrapper = <P extends object>(
  Component: React.ComponentType<P>,
  options: {
    enableScroll?: boolean;
  } = {}
) => {
  const { enableScroll = true } = options;

  return (props: P) => {
    return (
      <AndroidScreenWrapper enableScroll={enableScroll}>
        <Component {...props} />
      </AndroidScreenWrapper>
    );
  };
};
