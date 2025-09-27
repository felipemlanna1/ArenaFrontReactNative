// Arena Text Component - Componente base de texto com sistema completo de variantes
import React, { useMemo } from 'react';
import { Text as RNText, Pressable } from 'react-native';
import { useText } from './useText';
import { styles } from './stylesText';
import { TextProps } from './typesText';

export const Text: React.FC<TextProps> = ({
  children,
  variant,
  numberOfLines,
  ellipsizeMode = 'tail',
  adjustsFontSizeToFit = false,
  minimumFontScale = 0.5,
  onPress,
  onLongPress,
  selectable = false,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'text',
  style,
  testID,
  ...restProps
}) => {
  // Hook para computar estilos e processar props
  const {
    computedStyle,
    processedProps,
    isInteractive,
    hasEllipsis,
    isHeading,
  } = useText({
    variant,
    style,
    onPress,
    onLongPress,
    numberOfLines,
    ellipsizeMode,
    adjustsFontSizeToFit,
    minimumFontScale,
    selectable,
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
    testID,
  });

  // Estilos condicionais baseados no estado
  const conditionalStyles = useMemo(() => {
    const styleArray = [styles.baseText];

    // Adicionar estilos baseados no estado
    if (isInteractive) {
      // styleArray.push(styles.interactive);
    }

    if (isHeading) {
      // styleArray.push(styles.headingFont);
    }

    // Comentado - family vem do preset agora
    // if (family === 'mono') {
    //   styleArray.push(styles.monoFont);
    // }

    if (selectable) {
      // styleArray.push(styles.selectable);
    }

    return styleArray;
  }, [isInteractive, isHeading, selectable]);

  // Props de acessibilidade computadas
  const accessibilityProps = useMemo(() => ({
    accessible: true,
    accessibilityLabel: accessibilityLabel || (typeof children === 'string' ? children : undefined),
    accessibilityHint,
    accessibilityRole: isInteractive ? 'button' : accessibilityRole,
    importantForAccessibility: 'yes' as const,
  }), [accessibilityLabel, accessibilityHint, accessibilityRole, isInteractive, children]);

  // Props do componente Text
  const textProps = useMemo(() => ({
    ...restProps,
    ...processedProps,
    ...accessibilityProps,
    testID,
    style: [conditionalStyles, computedStyle],
    // Props específicas do Text que podem afetar rendering
    allowFontScaling: true, // Permite que o usuário ajuste o tamanho da fonte
    maxFontSizeMultiplier: 1.3, // Limita o crescimento máximo da fonte
  }), [restProps, processedProps, accessibilityProps, testID, conditionalStyles, computedStyle]);

  // Renderização condicional baseada na interatividade
  if (isInteractive) {
    return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={({ pressed }) => [
          pressed && styles.interactivePressed,
        ]}
        accessibilityRole="button"
        testID={testID ? `${testID}-pressable` : undefined}
      >
        {({ pressed }) => (
          <RNText
            {...textProps}
            style={[
              textProps.style,
              pressed && styles.interactivePressed,
            ]}
          >
            {children}
          </RNText>
        )}
      </Pressable>
    );
  }

  // Renderização padrão para texto não-interativo
  return (
    <RNText {...textProps}>
      {children}
    </RNText>
  );
};

// Export do componente principal e tipos
export type { TextProps } from './typesText';
export { useText } from './useText';