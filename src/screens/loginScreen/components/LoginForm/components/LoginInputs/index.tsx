import React from 'react';
import { View } from 'react-native';
import { Input } from '@/components/ui/input';
import { LoginInputsProps } from './typesLoginInputs';
import { styles } from './stylesLoginInputs';

export const LoginInputs: React.FC<LoginInputsProps> = React.memo(
  ({
    email,
    password,
    errors,
    onEmailChange,
    onEmailBlur,
    onPasswordChange,
  }) => {
    return (
      <View style={styles.container}>
        <Input
          label="Email"
          placeholder="Digite seu email"
          value={email}
          onChangeText={onEmailChange}
          onBlur={onEmailBlur}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          fullWidth
          disableAnimations
          testID="email-input"
        />

        <Input
          label="Senha"
          placeholder="Digite sua senha"
          value={password}
          onChangeText={onPasswordChange}
          error={errors.password}
          secureTextEntry={true}
          fullWidth
          disableAnimations
          testID="password-input"
        />
      </View>
    );
  }
);
