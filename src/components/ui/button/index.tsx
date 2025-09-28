import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { SportsLoading } from '../sports-loading';
import { ButtonProps } from './typesButton';
import { useButton, useButtonAccessibility } from './useButton';
import {
  useButtonAnimations,
  useLoadingSpinnerAnimation,
} from './buttonAnimations';
import { styles } from './stylesButton';
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onPress,
  children,
  testID,
  haptic = true,
  fullWidth = false,
  loadingText,
  disableAnimations = false,
  ...touchableProps
}) => {
  const buttonLogic = useButton({
    variant,
    size,
    loading,
    disabled,
    haptic,
    fullWidth,
    onPress,
    disableAnimations,
  });
  const animations = useButtonAnimations(
    disabled,
    loading,
    haptic,
    disableAnimations
  );
  const spinnerAnimation = useLoadingSpinnerAnimation(disableAnimations);
  const accessibility = useButtonAccessibility(
    children,
    loading,
    disabled,
    variant
  );
  const { animatedContainerStyle, animatedTextStyle } = animations;
  const renderContent = () => {
    const ViewComponent = disableAnimations ? View : Animated.View;
    const TextComponent = disableAnimations ? Text : Animated.Text;
    if (loading) {
      return (
        <ViewComponent style={styles.loadingContainer}>
          <SportsLoading
            size="xs"
            animationSpeed="normal"
            testID={`${testID}-loading-spinner`}
          />
        </ViewComponent>
      );
    }
    return (
      <>
        {LeftIcon && (
          <ViewComponent style={styles.leftIcon}>
            <LeftIcon
              size={buttonLogic.iconProps.size}
              color={buttonLogic.iconProps.color}
            />
          </ViewComponent>
        )}
        <TextComponent
          style={
            disableAnimations
              ? [
                  buttonLogic.computedStyles.text,
                  LeftIcon && styles.textWithLeftIcon,
                  RightIcon && styles.textWithRightIcon,
                ]
              : [
                  animatedTextStyle,
                  LeftIcon && styles.textWithLeftIcon,
                  RightIcon && styles.textWithRightIcon,
                ]
          }
        >
          {children}
        </TextComponent>
        {RightIcon && (
          <ViewComponent style={styles.rightIcon}>
            <RightIcon
              size={buttonLogic.iconProps.size}
              color={buttonLogic.iconProps.color}
            />
          </ViewComponent>
        )}
      </>
    );
  };
  if (disableAnimations) {
    return (
      <TouchableOpacity
        onPress={buttonLogic.handlePress}
        disabled={buttonLogic.isInteractionDisabled}
        testID={testID}
        style={buttonLogic.computedStyles.container}
        {...accessibility}
        {...touchableProps}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }
  return (
    <AnimatedTouchable
      onPressIn={animations.handlePressIn}
      onPressOut={animations.handlePressOut}
      onPress={buttonLogic.handlePress}
      disabled={buttonLogic.isInteractionDisabled}
      testID={testID}
      style={[buttonLogic.computedStyles.container, animatedContainerStyle]}
      {...accessibility}
      {...touchableProps}
    >
      {renderContent()}
      <Animated.View
        style={[
          styles.focusRing,
          {
            borderColor: buttonLogic.buttonConfig.focus.shadowColor,
            borderRadius: 8,
          },
          animations.animatedFocusRingStyle,
        ]}
      />
    </AnimatedTouchable>
  );
};
