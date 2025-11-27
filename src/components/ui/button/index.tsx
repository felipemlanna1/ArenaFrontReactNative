import React from 'react';
import { TouchableOpacity, View, TextStyle } from 'react-native';
import { Text } from '../text';
import { SportsLoading } from '../sportsLoading';
import type { SportsLoadingSize } from '../sportsLoading/typesSportsLoading';
import { ButtonProps } from './typesButton';
import { useButton, useButtonAccessibility } from './useButton';
import { styles as buttonStyles } from './stylesButton';

export type { ButtonProps } from './typesButton';

const LOADING_SPINNER_SIZE: SportsLoadingSize = 'xs';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  iconOnly = false,
  onPress,
  children,
  testID,
  haptic = true,
  fullWidth = false,
  loadingText,
  disableAnimations = false,
  align = 'center',
  ...touchableProps
}) => {
  const buttonLogic = useButton({
    variant,
    size,
    loading,
    disabled,
    haptic,
    fullWidth,
    iconOnly,
    onPress,
    disableAnimations,
    align,
  });
  const accessibility = useButtonAccessibility(
    children,
    loading,
    disabled,
    variant
  );
  const renderContent = () => {
    if (loading) {
      return (
        <View style={buttonStyles.loadingContainer}>
          <SportsLoading
            size={LOADING_SPINNER_SIZE}
            animationSpeed="normal"
            testID={`${testID}-loading-spinner`}
          />
          {loadingText && (
            <Text
              variant="bodyBold"
              style={[
                buttonLogic.computedStyles.text,
                buttonStyles.loadingText,
              ]}
            >
              {loadingText}
            </Text>
          )}
        </View>
      );
    }

    if (iconOnly) {
      return <>{children}</>;
    }

    return (
      <>
        {LeftIcon && (
          <View style={buttonStyles.leftIcon}>
            <LeftIcon
              size={buttonLogic.iconProps.size}
              color={buttonLogic.iconProps.color}
            />
          </View>
        )}
        <Text
          variant="bodyBold"
          style={
            [
              buttonLogic.computedStyles.text,
              LeftIcon && buttonStyles.textWithLeftIcon,
              RightIcon && buttonStyles.textWithRightIcon,
            ].filter(Boolean) as TextStyle[]
          }
        >
          {children}
        </Text>
        {RightIcon && (
          <View style={buttonStyles.rightIcon}>
            <RightIcon
              size={buttonLogic.iconProps.size}
              color={buttonLogic.iconProps.color}
            />
          </View>
        )}
      </>
    );
  };
  return (
    <TouchableOpacity
      onPress={buttonLogic.handlePress}
      disabled={buttonLogic.isInteractionDisabled}
      testID={testID}
      style={[
        buttonLogic.computedStyles.container,
        disabled && buttonStyles.buttonDisabled,
      ]}
      activeOpacity={0.8}
      {...accessibility}
      {...touchableProps}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};
