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
    onFullNameChange,
    onFullNameBlur,
    onUsernameChange,
    onUsernameBlur,
    onEmailChange,
    onEmailBlur,
    onPasswordChange,
    onPasswordBlur,
    onConfirmPasswordChange,
    onConfirmPasswordBlur,
  }) => {
    return (
      <View style={styles.container}>
        <Input
          value={formData.fullName}
          onChangeText={onFullNameChange}
          onBlur={onFullNameBlur}
          placeholder="Digite seu nome completo"
          label="Nome completo"
          size="lg"
          disabled={isLoading}
          error={errors.fullName}
          required
          fullWidth
          disableAnimations
          autoCapitalize="words"
          style={styles.customInput}
          testID="register-fullname-input"
        />

        <Input
          type="username"
          value={formData.username}
          onChangeText={onUsernameChange}
          onBlur={onUsernameBlur}
          placeholder="username"
          label="Username"
          size="lg"
          disabled={isLoading}
          error={errors.username}
          required
          fullWidth
          disableAnimations
          autoCapitalize="none"
          style={styles.customInput}
          testID="register-username-input"
        />

        <Input
          type="email"
          value={formData.email}
          onChangeText={onEmailChange}
          onBlur={onEmailBlur}
          placeholder="seu@email.com"
          label="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          size="lg"
          disabled={isLoading}
          error={errors.email}
          required
          fullWidth
          disableAnimations
          style={styles.customInput}
          testID="register-email-input"
        />

        <Input
          type="password"
          value={formData.password}
          onChangeText={onPasswordChange}
          onBlur={onPasswordBlur}
          placeholder="Mínimo 8 caracteres"
          label="Senha"
          size="lg"
          disabled={isLoading}
          error={errors.password}
          required
          fullWidth
          disableAnimations
          style={styles.customInput}
          testID="register-password-input"
        />

        <Input
          type="password"
          value={formData.confirmPassword}
          onChangeText={onConfirmPasswordChange}
          onBlur={onConfirmPasswordBlur}
          placeholder="Digite a senha novamente"
          label="Confirmar senha"
          size="lg"
          disabled={isLoading}
          error={errors.confirmPassword}
          required
          fullWidth
          disableAnimations
          style={styles.customInput}
          testID="register-confirm-password-input"
        />
      </View>
    );
  }
);
