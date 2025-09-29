import React from 'react';
import { View } from 'react-native';
import { LoginInputs } from './components/LoginInputs';
import { LoginOptions } from './components/LoginOptions';
import { LoginError } from './components/LoginError';
import { styles } from './stylesLoginForm';
import { LoginFormProps } from './typesLoginForm';

export const LoginForm: React.FC<LoginFormProps> = React.memo(props => {
  return (
    <View style={styles.container}>
      <LoginInputs
        email={props.email}
        password={props.password}
        errors={props.errors}
        onEmailChange={props.onEmailChange}
        onEmailBlur={props.onEmailBlur}
        onPasswordChange={props.onPasswordChange}
      />
      <LoginOptions
        rememberMe={props.rememberMe}
        isLoading={props.isLoading}
        onRememberMeToggle={props.onRememberMeToggle}
        onForgotPassword={props.onForgotPassword}
      />
      <LoginError error={props.errors.general} />
    </View>
  );
});
