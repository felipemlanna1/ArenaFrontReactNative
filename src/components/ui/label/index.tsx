import React from 'react';
import { Text } from '../text';
import { LabelProps } from './typesLabel';
import { useLabel } from './useLabel';
import './stylesLabel';

export const Label: React.FC<LabelProps> = ({
  children,
  variant = 'form',
  size,
  required = false,
  disabled = false,
  htmlFor,
  style,
  testID,
}) => {
  const { labelStyle, requiredStyle } = useLabel({
    variant,
    size,
    disabled,
  });

  return (
    <Text
      variant="labelPrimary"
      style={[labelStyle, style].filter(Boolean) as never}
      accessibilityRole="text"
      accessibilityLabel={required ? `${children}, obrigatório` : children}
      nativeID={htmlFor}
      testID={testID}
    >
      {children}
      {required && (
        <Text variant="captionSecondary" style={requiredStyle}>
          {' '}
          *
        </Text>
      )}
    </Text>
  );
};

export type { LabelProps, LabelVariant, LabelSize } from './typesLabel';
export { useLabel } from './useLabel';
