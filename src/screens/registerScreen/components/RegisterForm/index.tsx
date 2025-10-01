import React from 'react';
import { View } from 'react-native';
import { Input } from '@/components/ui/input';
import { styles } from './stylesRegisterForm';
import { RegisterFormProps } from './typesRegisterForm';

export const RegisterForm: React.FC<RegisterFormProps> = React.memo(
  ({
    formData,
    errors,
    isLoading,
    onFirstNameChange,
    onLastNameChange,
    onUsernameChange,
    onEmailChange,
    onPasswordChange,
    onConfirmPasswordChange,
  }) => {
    return (
      <View style={styles.container}>
        <Input
          value={formData.firstName}
          onChangeText={onFirstNameChange}
          placeholder="Nome"
          label="Nome"
          variant="default"
          size="md"
          disabled={isLoading}
          error={errors.firstName}
          required
          autoCapitalize="words"
          testID="register-first-name-input"
        />

        <Input
          value={formData.lastName}
          onChangeText={onLastNameChange}
          placeholder="Sobrenome"
          label="Sobrenome"
          variant="default"
          size="md"
          disabled={isLoading}
          error={errors.lastName}
          required
          autoCapitalize="words"
          testID="register-last-name-input"
        />

        <Input
          type="username"
          value={formData.username}
          onChangeText={onUsernameChange}
          placeholder="username"
          label="Username"
          variant="default"
          size="md"
          disabled={isLoading}
          error={errors.username}
          required
          testID="register-username-input"
        />

        <Input
          type="email"
          value={formData.email}
          onChangeText={onEmailChange}
          placeholder="seu@email.com"
          label="Email"
          variant="default"
          size="md"
          disabled={isLoading}
          error={errors.email}
          required
          testID="register-email-input"
        />

        <Input
          type="password"
          value={formData.password}
          onChangeText={onPasswordChange}
          placeholder="Mínimo 8 caracteres"
          label="Senha"
          variant="default"
          size="md"
          disabled={isLoading}
          error={errors.password}
          required
          testID="register-password-input"
        />

        <Input
          type="password"
          value={formData.confirmPassword}
          onChangeText={onConfirmPasswordChange}
          placeholder="Digite a senha novamente"
          label="Confirmar senha"
          variant="default"
          size="md"
          disabled={isLoading}
          error={errors.confirmPassword}
          required
          testID="register-confirm-password-input"
        />
      </View>
    );
  }
);
