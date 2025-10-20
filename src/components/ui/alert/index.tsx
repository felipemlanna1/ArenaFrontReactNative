import React, { useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { AlertProps } from './typesAlert';
import { useAlertComponent } from './useAlert';
import { styles } from './stylesAlert';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const DEFAULT_AUTO_DISMISS_TIME = 5000;

export const Alert: React.FC<AlertProps> = ({
  visible,
  config,
  onClose,
  index = 0,
}) => {
  const {
    iconName,
    iconColor,
    containerStyle,
    handlePrimaryPress,
    handleSecondaryPress,
  } = useAlertComponent({
    visible,
    variant: config.variant,
    dismissible: config.dismissible ?? true,
    onClose,
  });

  const translateY = useSharedValue(SCREEN_HEIGHT);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, {
        duration: 300,
      });
      opacity.value = withTiming(1, {
        duration: 300,
      });
    } else {
      translateY.value = withTiming(SCREEN_HEIGHT, { duration: 200 });
      opacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible, translateY, opacity]);

  useEffect(() => {
    if (visible && config.autoDismissTime !== undefined) {
      const timeout = setTimeout(() => {
        onClose();
      }, config.autoDismissTime || DEFAULT_AUTO_DISMISS_TIME);

      return () => clearTimeout(timeout);
    }
  }, [visible, config.autoDismissTime, onClose]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const handlePrimaryButtonPress = async () => {
    await handlePrimaryPress();
    config.primaryButton.onPress();
    onClose();
  };

  const handleSecondaryButtonPress = async () => {
    if (!config.secondaryButton) return;

    await handleSecondaryPress();
    config.secondaryButton.onPress();
    onClose();
  };

  return (
    <View style={styles.alertWrapper} pointerEvents="box-none">
      <Animated.View
        style={[styles.container, containerStyle, animatedContainerStyle]}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Ionicons
                name={iconName as keyof typeof Ionicons.glyphMap}
                size={24}
                color={iconColor}
              />
            </View>
            <View style={styles.titleContainer}>
              <Text variant="titleSecondary" style={styles.title}>
                {config.title}
              </Text>
            </View>
          </View>

          {config.message && (
            <View style={styles.messageContainer}>
              <Text variant="bodySecondary" style={styles.message}>
                {config.message}
              </Text>
            </View>
          )}

          <View
            style={[
              styles.buttonsContainer,
              config.secondaryButton
                ? styles.twoButtonsRow
                : styles.singleButtonRow,
            ]}
          >
            {config.secondaryButton && (
              <View style={styles.buttonWrapper}>
                <Button
                  variant={config.secondaryButton.variant || 'secondary'}
                  size="md"
                  onPress={handleSecondaryButtonPress}
                  testID={
                    config.secondaryButton.testID || 'alert-secondary-button'
                  }
                  fullWidth
                >
                  {config.secondaryButton.text}
                </Button>
              </View>
            )}

            <View
              style={
                config.secondaryButton
                  ? styles.buttonWrapper
                  : styles.fullWidthButton
              }
            >
              <Button
                variant={config.primaryButton.variant || 'primary'}
                size="md"
                onPress={handlePrimaryButtonPress}
                testID={config.primaryButton.testID || 'alert-primary-button'}
                fullWidth
              >
                {config.primaryButton.text}
              </Button>
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};
