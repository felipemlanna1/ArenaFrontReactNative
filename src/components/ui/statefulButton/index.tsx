import React, { useRef, useState } from 'react';
import { Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { Button } from '../button';
import { StatefulButtonProps, ButtonState } from './typesStatefulButton';
import { styles } from './stylesStatefulButton';

export type { StatefulButtonProps, ButtonState } from './typesStatefulButton';

export const StatefulButton: React.FC<StatefulButtonProps> = ({
  onPress,
  children,
  idleText,
  loadingText = 'Confirmando...',
  successText = 'Confirmado!',
  errorText,
  successDuration = 1500,
  errorDuration = 2000,
  onSuccess,
  onError,
  variant = 'primary',
  size = 'lg',
  leftIcon: IdleIcon,
  testID = 'stateful-button',
  ...buttonProps
}) => {
  const [buttonState, setButtonState] = useState<ButtonState>('idle');
  const [displayText, setDisplayText] = useState<string>(
    idleText || (typeof children === 'string' ? children : 'Ação')
  );
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;

  const triggerShakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const triggerBounceAnimation = () => {
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSuccess = () => {
    setButtonState('success');
    setDisplayText(successText);
    triggerBounceAnimation();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onSuccess?.();

    setTimeout(() => {
      setButtonState('idle');
      setDisplayText(
        idleText || (typeof children === 'string' ? children : 'Ação')
      );
    }, successDuration);
  };

  const handleError = (error?: Error) => {
    setButtonState('error');
    setDisplayText(errorText || 'Erro');
    triggerShakeAnimation();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    onError?.(error);

    setTimeout(() => {
      setButtonState('idle');
      setDisplayText(
        idleText || (typeof children === 'string' ? children : 'Ação')
      );
    }, errorDuration);
  };

  const handlePress = async () => {
    if (buttonState !== 'idle') return;

    setButtonState('loading');
    setDisplayText(loadingText);

    try {
      await onPress();
      handleSuccess();
    } catch (error) {
      handleError(error as Error);
    }
  };

  const getButtonVariant = () => {
    switch (buttonState) {
      case 'success':
        return 'success';
      case 'error':
        return 'destructive';
      default:
        return variant;
    }
  };

  const getLeftIcon = () => {
    switch (buttonState) {
      case 'success':
        return ({ size, color }: { size: number; color: string }) => (
          <Animated.View
            // eslint-disable-next-line arena/arena-best-practices
            style={{
              transform: [{ scale: bounceAnim }],
            }}
          >
            <Ionicons name="checkmark-circle" size={size} color={color} />
          </Animated.View>
        );
      case 'error':
        return ({ size, color }: { size: number; color: string }) => (
          <Ionicons name="close-circle" size={size} color={color} />
        );
      case 'loading':
        return undefined;
      default:
        return IdleIcon;
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX: shakeAnim }],
        },
      ]}
    >
      <Button
        variant={getButtonVariant()}
        size={size}
        loading={buttonState === 'loading'}
        loadingText={loadingText}
        onPress={handlePress}
        leftIcon={getLeftIcon()}
        testID={testID}
        disabled={buttonState !== 'idle'}
        {...buttonProps}
      >
        {displayText}
      </Button>
    </Animated.View>
  );
};
