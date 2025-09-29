import React from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { LoginActionsProps } from './typesLoginActions';
import { useLoginActions } from './useLoginActions';
import { styles } from './stylesLoginActions';

export const LoginActions: React.FC<LoginActionsProps> = React.memo(
  ({ isFormValid, isLoading, onSubmit }) => {
    const { isButtonDisabled, buttonTitle, handleSubmit } = useLoginActions({
      isFormValid,
      isLoading,
      onSubmit,
    });

    return (
      <View style={styles.container}>
        <Button
          onPress={handleSubmit}
          variant="primary"
          size="sm"
          fullWidth
          disabled={isButtonDisabled}
          loading={isLoading}
          testID="submit-button"
        >
          {buttonTitle}
        </Button>
      </View>
    );
  }
);
