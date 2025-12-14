import React from 'react';
import { Button } from '@/components/ui/button';
import { AppleIcon } from '@/components/icons/AppleIcon';

interface AppleLoginButtonProps {
  isLoading: boolean;
  onPress: () => void;
}

export const AppleLoginButton: React.FC<AppleLoginButtonProps> = React.memo(
  ({ isLoading, onPress }) => {
    return (
      <Button
        onPress={onPress}
        variant="outline-light"
        size="md"
        disabled={isLoading}
        leftIcon={AppleIcon}
        testID="apple-login-button"
      >
        Login apple
      </Button>
    );
  }
);
