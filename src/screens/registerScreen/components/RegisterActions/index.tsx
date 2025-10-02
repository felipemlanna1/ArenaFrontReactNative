import React from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { styles } from './stylesRegisterActions';
import { RegisterActionsProps } from './typesRegisterActions';

export const RegisterActions: React.FC<RegisterActionsProps> = ({
  isFormValid,
  isLoading,
  onSubmit,
}) => {
  const handlePress = React.useCallback(() => {
    onSubmit();
  }, [onSubmit]);

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
};
