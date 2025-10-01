import React from 'react';
import { Button } from '@/components/ui/button';
import { GoogleIcon } from '@/components/icons/GoogleIcon';

interface GoogleLoginButtonProps {
  isLoading: boolean;
  onPress: () => void;
}

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = React.memo(
  ({ isLoading, onPress }) => {
    return (
      <Button
        onPress={onPress}
        variant="secondary"
        size="sm"
        fullWidth
        disabled={isLoading}
        leftIcon={GoogleIcon}
        testID="google-login-button"
      >
        Continuar com Google
      </Button>
    );
  }
);
