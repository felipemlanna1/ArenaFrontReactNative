import React from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { styles } from './stylesRegisterActions';
import { RegisterActionsProps } from './typesRegisterActions';

export const RegisterActions: React.FC<RegisterActionsProps> = React.memo(
  ({ isFormValid, isLoading, onSubmit }) => {
    console.log('[RegisterActions] Render:', {
      isFormValid,
      isLoading,
      buttonDisabled: !isFormValid || isLoading,
    });

    const handlePress = () => {
      console.log('[RegisterActions] Button clicked!');
      onSubmit();
    };

    return (
      <View style={styles.container}>
        <Button
          variant="primary"
          size="lg"
          onPress={handlePress}
          disabled={!isFormValid || isLoading}
          loading={isLoading}
          fullWidth
          testID="register-submit-button"
        >
          Criar conta
        </Button>
      </View>
    );
  }
);
