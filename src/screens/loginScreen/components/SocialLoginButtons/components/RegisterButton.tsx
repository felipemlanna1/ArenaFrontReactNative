import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Link } from '@/components/ui/link';
import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';

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
    marginRight: ArenaSpacing.xs,
  },
});

export const RegisterButton: React.FC<RegisterButtonProps> = React.memo(
  ({ isLoading, onPress }) => {
    return (
      <View style={styles.container}>
        <Text variant="bodyPrimary" style={styles.text}>
          Não tem uma conta?
        </Text>
        <Link
          onPress={onPress}
          variant="bodyExtrabold"
          disabled={isLoading}
          testID="register-link"
        >
          Cadastre-se
        </Link>
      </View>
    );
  }
);
