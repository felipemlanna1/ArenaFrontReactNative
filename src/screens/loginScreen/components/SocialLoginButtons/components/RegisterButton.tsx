import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaTypography, ArenaColors } from '@/constants';

interface RegisterButtonProps {
  isLoading: boolean;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: ArenaSpacing.lg,
  },
  text: {
    fontSize: ArenaTypography.size.sm,
    color: ArenaColors.neutral.medium,
    marginRight: ArenaSpacing.xs,
  },
});

export const RegisterButton: React.FC<RegisterButtonProps> = React.memo(
  ({ isLoading, onPress }) => {
    return (
      <View style={styles.container}>
        <Text variant="bodySecondary" style={styles.text}>
          Não tem uma conta?
        </Text>
        <Button
          onPress={onPress}
          variant="ghost"
          size="sm"
          disabled={isLoading}
          testID="register-button"
        >
          Cadastre-se
        </Button>
      </View>
    );
  }
);
