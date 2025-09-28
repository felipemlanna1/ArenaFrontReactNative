import { renderHook } from '@testing-library/react-native';
import { useText, getVariantPreset, isHeadingVariant, getAvailableVariants, getAvailableColors } from '../useText';
import { ArenaColors, ArenaTypography } from '@/constants';

jest.mock('@/constants', () => ({
  ArenaColors: {
    brand: { primary: '#FF5301' },
    neutral: {
      light: '#FFFFFF',
      medium: '#B8B8B8',
      darkest: '#1B1D29',
    },
  },
  ArenaTypography: {
    size: {
      xs: 11,
      sm: 13,
      md: 15,
      lg: 17,
      xl: 19,
      '2xl': 22,
      '3xl': 26,
      '4xl': 32,
      '5xl': 40,
      '6xl': 48,
      '7xl': 64,
    },
    weight: {
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    family: {
      heading: 'BebasNeue-Regular',
      body: 'Helvetica',
      ui: 'Helvetica',
      mono: 'Menlo-Regular',
    },
    lineHeight: {
      tight: 1.2,
      comfortable: 1.4,
      relaxed: 1.6,
      loose: 1.8,
    },
  },
}));

describe('useText Hook', () => {
  describe('Funcionalidade Básica', () => {
    it('deve retornar estrutura correta', () => {
      const { result } = renderHook(() => useText({}));

      expect(result.current).toHaveProperty('computedStyle');
      expect(result.current).toHaveProperty('processedProps');
      expect(result.current).toHaveProperty('isInteractive');
      expect(result.current).toHaveProperty('hasEllipsis');
      expect(result.current).toHaveProperty('isHeading');
    });

    it('deve aplicar valores padrão quando não há props', () => {
      const { result } = renderHook(() => useText({}));

      expect(result.current.computedStyle).toEqual(
        expect.objectContaining({
          fontSize: ArenaTypography.size.md,
          fontWeight: ArenaTypography.weight.regular,
          fontFamily: ArenaTypography.family.body,
          color: ArenaColors.neutral.light,
          textAlign: 'left',
          textTransform: 'none',
        })
      );
    });

    it('deve calcular line-height baseado no font-size', () => {
      const { result } = renderHook(() => useText({ size: 'xl' }));

      const expectedLineHeight = ArenaTypography.size.xl * ArenaTypography.lineHeight.comfortable;
      expect(result.current.computedStyle.lineHeight).toBe(expectedLineHeight);
    });
  });

  describe('Presets de Variantes', () => {
    it('deve aplicar preset display corretamente', () => {
      const { result } = renderHook(() => useText({ variant: 'display' }));

      expect(result.current.computedStyle).toEqual(
        expect.objectContaining({
          fontSize: ArenaTypography.size['6xl'],
          fontWeight: ArenaTypography.weight.bold,
          fontFamily: ArenaTypography.family.heading,
          letterSpacing: -0.5,
        })
      );
    });

    it('deve aplicar preset heading corretamente', () => {
      const { result } = renderHook(() => useText({ variant: 'heading' }));

      expect(result.current.computedStyle).toEqual(
        expect.objectContaining({
          fontSize: ArenaTypography.size['4xl'],
          fontWeight: ArenaTypography.weight.semibold,
          fontFamily: ArenaTypography.family.heading,
          letterSpacing: -0.25,
        })
      );
    });

    it('deve aplicar preset title corretamente', () => {
      const { result } = renderHook(() => useText({ variant: 'title' }));

      expect(result.current.computedStyle).toEqual(
        expect.objectContaining({
          fontSize: ArenaTypography.size['2xl'],
          fontWeight: ArenaTypography.weight.semibold,
          fontFamily: ArenaTypography.family.body,
          letterSpacing: 0,
        })
      );
    });

    it('deve aplicar preset subtitle corretamente', () => {
      const { result } = renderHook(() => useText({ variant: 'subtitle' }));

      expect(result.current.computedStyle).toEqual(
        expect.objectContaining({
          fontSize: ArenaTypography.size.xl,
          fontWeight: ArenaTypography.weight.medium,
          color: ArenaColors.neutral.medium,
        })
      );
    });

    it('deve aplicar preset body corretamente', () => {
      const { result } = renderHook(() => useText({ variant: 'body' }));

      expect(result.current.computedStyle).toEqual(
        expect.objectContaining({
          fontSize: ArenaTypography.size.md,
          fontWeight: ArenaTypography.weight.regular,
          fontFamily: ArenaTypography.family.body,
        })
      );
    });

    it('deve aplicar preset caption corretamente', () => {
      const { result } = renderHook(() => useText({ variant: 'caption' }));

      expect(result.current.computedStyle).toEqual(
        expect.objectContaining({
          fontSize: ArenaTypography.size.sm,
          fontWeight: ArenaTypography.weight.regular,
          letterSpacing: 0.25,
        })
      );
    });

    it('deve aplicar preset label corretamente', () => {
      const { result } = renderHook(() => useText({ variant: 'label' }));

      expect(result.current.computedStyle).toEqual(
        expect.objectContaining({
          fontSize: ArenaTypography.size.xs,
          fontWeight: ArenaTypography.weight.medium,
          fontFamily: ArenaTypography.family.ui,
          letterSpacing: 0.5,
        })
      );
    });
  });

  describe('Override de Props', () => {
    it('deve sobrescrever size do preset', () => {
      const { result } = renderHook(() => useText({
        variant: 'heading',
        size: 'xl'
      }));

      expect(result.current.computedStyle.fontSize).toBe(ArenaTypography.size.xl);
    });

    it('deve sobrescrever weight do preset', () => {
      const { result } = renderHook(() => useText({
        variant: 'body',
        weight: 'bold'
      }));

      expect(result.current.computedStyle.fontWeight).toBe(ArenaTypography.weight.bold);
    });

    it('deve sobrescrever family do preset', () => {
      const { result } = renderHook(() => useText({
        variant: 'body',
        family: 'mono'
      }));

      expect(result.current.computedStyle.fontFamily).toBe(ArenaTypography.family.mono);
    });

    it('deve sobrescrever color do preset', () => {
      const { result } = renderHook(() => useText({
        variant: 'subtitle',
        color: 'accent'
      }));

      expect(result.current.computedStyle.color).toBe(ArenaColors.brand.primary);
    });

    it('deve aplicar props sem preset quando não há variant', () => {
      const { result } = renderHook(() => useText({
        size: '3xl',
        weight: 'extrabold',
        family: 'mono',
        color: 'accent'
      }));

      expect(result.current.computedStyle).toEqual(
        expect.objectContaining({
          fontSize: ArenaTypography.size['3xl'],
          fontWeight: ArenaTypography.weight.extrabold,
          fontFamily: ArenaTypography.family.mono,
          color: ArenaColors.brand.primary,
        })
      );
    });
  });

  describe('Sistema de Cores', () => {
    it('deve mapear cor primary corretamente', () => {
      const { result } = renderHook(() => useText({ color: 'primary' }));
      expect(result.current.computedStyle.color).toBe(ArenaColors.neutral.light);
    });

    it('deve mapear cor secondary corretamente', () => {
      const { result } = renderHook(() => useText({ color: 'secondary' }));
      expect(result.current.computedStyle.color).toBe(ArenaColors.neutral.medium);
    });

    it('deve mapear cor accent corretamente', () => {
      const { result } = renderHook(() => useText({ color: 'accent' }));
      expect(result.current.computedStyle.color).toBe(ArenaColors.brand.primary);
    });

    it('deve mapear cor muted com opacity', () => {
      const { result } = renderHook(() => useText({ color: 'muted' }));
      expect(result.current.computedStyle.color).toBe(`${ArenaColors.neutral.medium}80`);
    });

    it('deve mapear cor inverse corretamente', () => {
      const { result } = renderHook(() => useText({ color: 'inverse' }));
      expect(result.current.computedStyle.color).toBe(ArenaColors.neutral.darkest);
    });

    it('deve mapear cores de estado corretamente', () => {
      const { result: success } = renderHook(() => useText({ color: 'success' }));
      const { result: error } = renderHook(() => useText({ color: 'error' }));
      const { result: warning } = renderHook(() => useText({ color: 'warning' }));

      expect(success.current.computedStyle.color).toBe('#10B981');
      expect(error.current.computedStyle.color).toBe('#EF4444');
      expect(warning.current.computedStyle.color).toBe('#F59E0B');
    });
  });

  describe('Alinhamento e Transformação', () => {
    it('deve aplicar textAlign corretamente', () => {
      const alignments = ['left', 'center', 'right', 'justify'] as const;

      alignments.forEach(align => {
        const { result } = renderHook(() => useText({ align }));
        expect(result.current.computedStyle.textAlign).toBe(align);
      });
    });

    it('deve aplicar textTransform corretamente', () => {
      const transforms = ['none', 'uppercase', 'lowercase', 'capitalize'] as const;

      transforms.forEach(transform => {
        const { result } = renderHook(() => useText({ transform }));
        expect(result.current.computedStyle.textTransform).toBe(transform);
      });
    });
  });

  describe('Estilos Customizados', () => {
    it('deve mesclar estilo customizado como objeto', () => {
      const customStyle = { marginTop: 10, opacity: 0.8 };
      const { result } = renderHook(() => useText({ style: customStyle }));

      if (Array.isArray(result.current.computedStyle)) {
        expect(result.current.computedStyle).toEqual(
          expect.arrayContaining([
            expect.objectContaining(customStyle)
          ])
        );
      } else {
        expect(result.current.computedStyle).toEqual(
          expect.objectContaining(customStyle)
        );
      }
    });

    it('deve mesclar estilos customizados como array', () => {
      const customStyles = [{ marginTop: 10 }, { marginBottom: 5 }];
      const { result } = renderHook(() => useText({ style: customStyles }));

      expect(result.current.computedStyle).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ marginTop: 10 }),
          expect.objectContaining({ marginBottom: 5 })
        ])
      );
    });

    it('deve preservar estilos computados quando há estilos customizados', () => {
      const customStyle = { marginTop: 10 };
      const { result } = renderHook(() => useText({
        variant: 'heading',
        style: customStyle
      }));

      if (Array.isArray(result.current.computedStyle)) {
        expect(result.current.computedStyle).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              fontSize: ArenaTypography.size['4xl']
            }),
            expect.objectContaining(customStyle)
          ])
        );
      }
    });
  });

  describe('Processamento de Props', () => {
    it('deve processar props de comportamento de texto', () => {
      const textProps = {
        numberOfLines: 2,
        ellipsizeMode: 'middle' as const,
        adjustsFontSizeToFit: true,
        minimumFontScale: 0.8,
        selectable: true,
      };

      const { result } = renderHook(() => useText(textProps));

      expect(result.current.processedProps).toEqual(
        expect.objectContaining(textProps)
      );
    });

    it('deve processar props de interação', () => {
      const onPress = jest.fn();
      const onLongPress = jest.fn();

      const { result } = renderHook(() => useText({
        onPress,
        onLongPress
      }));

      expect(result.current.processedProps.onPress).toBe(onPress);
      expect(result.current.processedProps.onLongPress).toBe(onLongPress);
    });

    it('deve processar props de acessibilidade', () => {
      const accessibilityProps = {
        accessibilityLabel: 'Custom label',
        accessibilityHint: 'Custom hint',
        accessibilityRole: 'header' as const,
        testID: 'custom-test-id'
      };

      const { result } = renderHook(() => useText(accessibilityProps));

      expect(result.current.processedProps).toEqual(
        expect.objectContaining(accessibilityProps)
      );
    });
  });

  describe('Estados Derivados', () => {
    it('deve identificar texto interativo corretamente', () => {
      const { result: withPress } = renderHook(() => useText({
        onPress: jest.fn()
      }));
      const { result: withLongPress } = renderHook(() => useText({
        onLongPress: jest.fn()
      }));
      const { result: nonInteractive } = renderHook(() => useText({}));

      expect(withPress.current.isInteractive).toBe(true);
      expect(withLongPress.current.isInteractive).toBe(true);
      expect(nonInteractive.current.isInteractive).toBe(false);
    });

    it('deve identificar texto com ellipsis corretamente', () => {
      const { result: withEllipsis } = renderHook(() => useText({
        numberOfLines: 2
      }));
      const { result: withoutEllipsis } = renderHook(() => useText({}));

      expect(withEllipsis.current.hasEllipsis).toBe(true);
      expect(withoutEllipsis.current.hasEllipsis).toBe(false);
    });

    it('deve identificar variantes de heading corretamente', () => {
      const headingVariants = ['display', 'heading', 'title'] as const;
      const nonHeadingVariants = ['subtitle', 'body', 'caption', 'label'] as const;

      headingVariants.forEach(variant => {
        const { result } = renderHook(() => useText({ variant }));
        expect(result.current.isHeading).toBe(true);
      });

      nonHeadingVariants.forEach(variant => {
        const { result } = renderHook(() => useText({ variant }));
        expect(result.current.isHeading).toBe(false);
      });
    });
  });

  describe('Memoização', () => {
    it('deve memoizar computedStyle corretamente', () => {
      let renderCount = 0;
      const { result, rerender } = renderHook(
        ({ variant }) => {
          renderCount++;
          return useText({ variant });
        },
        { initialProps: { variant: 'body' as const } }
      );

      const firstStyle = result.current.computedStyle;

      rerender({ variant: 'body' });
      expect(result.current.computedStyle).toBe(firstStyle);

      rerender({ variant: 'heading' });
      expect(result.current.computedStyle).not.toBe(firstStyle);
    });

    it('deve memoizar processedProps corretamente', () => {
      const onPress = jest.fn();
      const { result, rerender } = renderHook(
        ({ testID }) => useText({ onPress, testID }),
        { initialProps: { testID: 'test' } }
      );

      const firstProps = result.current.processedProps;

      rerender({ testID: 'test' });
      expect(result.current.processedProps).toBe(firstProps);

      rerender({ testID: 'different' });
      expect(result.current.processedProps).not.toBe(firstProps);
    });
  });
});

describe('Funções Utilitárias do useText', () => {
  describe('getVariantPreset', () => {
    it('deve retornar preset correto para cada variante', () => {
      const displayPreset = getVariantPreset('display');
      expect(displayPreset).toEqual({
        size: '6xl',
        weight: 'bold',
        family: 'heading',
        lineHeight: 'tight',
        letterSpacing: -0.5,
        color: 'primary',
      });

      const bodyPreset = getVariantPreset('body');
      expect(bodyPreset).toEqual({
        size: 'md',
        weight: 'regular',
        family: 'body',
        lineHeight: 'comfortable',
        letterSpacing: 0,
        color: 'primary',
      });
    });
  });

  describe('isHeadingVariant', () => {
    it('deve identificar variantes de heading corretamente', () => {
      expect(isHeadingVariant('display')).toBe(true);
      expect(isHeadingVariant('heading')).toBe(true);
      expect(isHeadingVariant('title')).toBe(true);
      expect(isHeadingVariant('subtitle')).toBe(false);
      expect(isHeadingVariant('body')).toBe(false);
      expect(isHeadingVariant('caption')).toBe(false);
      expect(isHeadingVariant('label')).toBe(false);
    });
  });

  describe('getAvailableVariants', () => {
    it('deve retornar todas as variantes disponíveis', () => {
      const variants = getAvailableVariants();
      const expectedVariants = ['display', 'heading', 'title', 'subtitle', 'body', 'caption', 'label'];

      expect(variants).toEqual(expect.arrayContaining(expectedVariants));
      expect(variants.length).toBe(expectedVariants.length);
    });
  });

  describe('getAvailableColors', () => {
    it('deve retornar todas as cores disponíveis', () => {
      const colors = getAvailableColors();
      const expectedColors = ['primary', 'secondary', 'accent', 'muted', 'inverse', 'success', 'error', 'warning'];

      expect(colors).toEqual(expect.arrayContaining(expectedColors));
      expect(colors.length).toBe(expectedColors.length);
    });
  });
});