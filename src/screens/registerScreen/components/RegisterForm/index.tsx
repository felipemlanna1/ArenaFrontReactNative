import React from 'react';
import { View } from 'react-native';
import { Input } from '@/components/ui/input';
import { StateDropdown } from '@/components/ui/stateDropdown';
import { CityDropdown } from '@/components/ui/cityDropdown';
import { styles } from './stylesRegisterForm';
import { RegisterFormProps } from './typesRegisterForm';

export const RegisterForm: React.FC<RegisterFormProps> = React.memo(
  ({
    formData,
    errors,
    isLoading,
    onFirstNameChange,
    onFirstNameBlur,
    onLastNameChange,
    onLastNameBlur,
    onUsernameChange,
    onUsernameBlur,
    onEmailChange,
    onEmailBlur,
    onPasswordChange,
    onPasswordBlur,
    onConfirmPasswordChange,
    onConfirmPasswordBlur,
    onCityChange,
    onStateChange,
  }) => {
    return (
      <View style={styles.container}>
        <Input
          value={formData.firstName}
          onChangeText={onFirstNameChange}
          onBlur={onFirstNameBlur}
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
          onBlur={onLastNameBlur}
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
          onBlur={onUsernameBlur}
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
          onBlur={onEmailBlur}
          placeholder="seu@email.com"
          label="Email"
          variant="default"
          size="md"
          disabled={isLoading}
          error={errors.email}
          required
          testID="register-email-input"
        />

        <StateDropdown
          value={formData.state}
          onChange={onStateChange}
          label="Estado"
          error={errors.state}
          required
          disabled={isLoading}
          testID="register-state-dropdown"
        />

        {formData.state && (
          <CityDropdown
            value={formData.city}
            onChange={onCityChange}
            stateUF={formData.state}
            label="Cidade"
            error={errors.city}
            required
            disabled={isLoading}
            testID="register-city-dropdown"
          />
        )}

        <Input
          type="password"
          value={formData.password}
          onChangeText={onPasswordChange}
          onBlur={onPasswordBlur}
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
          onBlur={onConfirmPasswordBlur}
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
