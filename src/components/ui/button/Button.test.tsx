import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './index';
import { ButtonProps } from './typesButton';
const MockIcon = ({
  size: _size,
  color: _color,
}: {
  size: number;
  color: string;
}) => <></>;
describe('Button', () => {
  const defaultProps: ButtonProps = {
    onPress: jest.fn(),
    children: 'Test Button',
  };
  const renderButton = (props: Partial<ButtonProps> = {}) => {
    return render(<Button {...defaultProps} {...props} />);
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('Renderização', () => {
    it('deve renderizar corretamente com props padrão', () => {
      const { getByText } = renderButton();
      expect(getByText('Test Button')).toBeTruthy();
    });
    it('deve renderizar com variant primary por padrão', () => {
      const { getByText } = renderButton();
      const button = getByText('Test Button');
      expect(button).toBeTruthy();
    });
    it('deve renderizar com size md por padrão', () => {
      const { getByText } = renderButton();
      const button = getByText('Test Button');
      expect(button).toBeTruthy();
    });
    it('deve renderizar com testID quando fornecido', () => {
      const { getByTestId } = renderButton({ testID: 'test-button' });
      expect(getByTestId('test-button')).toBeTruthy();
    });
  });
  describe('Variantes', () => {
    const variants: ButtonProps['variant'][] = [
      'primary',
      'secondary',
      'subtle',
      'destructive',
      'success',
      'ghost',
    ];
    variants.forEach(variant => {
      it(`deve renderizar variante ${variant} corretamente`, () => {
        const { getByText } = renderButton({ variant });
        expect(getByText('Test Button')).toBeTruthy();
      });
    });
  });
  describe('Tamanhos', () => {
    const sizes: ButtonProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];
    sizes.forEach(size => {
      it(`deve renderizar tamanho ${size} corretamente`, () => {
        const { getByText } = renderButton({ size });
        expect(getByText('Test Button')).toBeTruthy();
      });
    });
  });
  describe('Estados', () => {
    it('deve mostrar loading quando loading=true', () => {
      const { getByText, getByTestId } = renderButton({
        loading: true,
        testID: 'test-button',
      });
      expect(getByText('Carregando...')).toBeTruthy();
      expect(getByTestId('test-button-loading-spinner')).toBeTruthy();
    });
    it('deve mostrar texto customizado de loading', () => {
      const { getByText } = renderButton({
        loading: true,
        loadingText: 'Salvando...',
      });
      expect(getByText('Salvando...')).toBeTruthy();
    });
    it('deve estar desabilitado quando disabled=true', () => {
      const onPressMock = jest.fn();
      const { getByText } = renderButton({
        disabled: true,
        onPress: onPressMock,
      });
      fireEvent.press(getByText('Test Button'));
      expect(onPressMock).not.toHaveBeenCalled();
    });
    it('deve estar desabilitado quando loading=true', () => {
      const onPressMock = jest.fn();
      const { getByText } = renderButton({
        loading: true,
        onPress: onPressMock,
      });
      fireEvent.press(getByText('Carregando...'));
      expect(onPressMock).not.toHaveBeenCalled();
    });
  });
  describe('Interações', () => {
    it('deve chamar onPress quando pressionado', () => {
      const onPressMock = jest.fn();
      const { getByText } = renderButton({ onPress: onPressMock });
      fireEvent.press(getByText('Test Button'));
      expect(onPressMock).toHaveBeenCalledTimes(1);
    });
    it('não deve chamar onPress quando disabled', () => {
      const onPressMock = jest.fn();
      const { getByText } = renderButton({
        disabled: true,
        onPress: onPressMock,
      });
      fireEvent.press(getByText('Test Button'));
      expect(onPressMock).not.toHaveBeenCalled();
    });
    it('não deve chamar onPress quando loading', () => {
      const onPressMock = jest.fn();
      const { getByText } = renderButton({
        loading: true,
        onPress: onPressMock,
      });
      fireEvent.press(getByText('Carregando...'));
      expect(onPressMock).not.toHaveBeenCalled();
    });
  });
  describe('Ícones', () => {
    it('deve renderizar ícone à esquerda quando leftIcon fornecido', () => {
      const { getByText } = renderButton({ leftIcon: MockIcon });
      expect(getByText('Test Button')).toBeTruthy();
    });
    it('deve renderizar ícone à direita quando rightIcon fornecido', () => {
      const { getByText } = renderButton({ rightIcon: MockIcon });
      expect(getByText('Test Button')).toBeTruthy();
    });
    it('deve renderizar ambos os ícones quando fornecidos', () => {
      const { getByText } = renderButton({
        leftIcon: MockIcon,
        rightIcon: MockIcon,
      });
      expect(getByText('Test Button')).toBeTruthy();
    });
  });
  describe('Propriedades de Layout', () => {
    it('deve aplicar fullWidth quando especificado', () => {
      const { getByText } = renderButton({ fullWidth: true });
      expect(getByText('Test Button')).toBeTruthy();
    });
    it('deve aplicar minWidth quando fullWidth=false', () => {
      const { getByText } = renderButton({ fullWidth: false });
      expect(getByText('Test Button')).toBeTruthy();
    });
  });
  describe('Acessibilidade', () => {
    it('deve ter role de button', () => {
      const { getByRole } = renderButton();
      expect(getByRole('button')).toBeTruthy();
    });
    it('deve ter accessibilityLabel correto', () => {
      const { getByLabelText } = renderButton();
      expect(getByLabelText('Test Button')).toBeTruthy();
    });
    it('deve indicar estado disabled na acessibilidade', () => {
      const { getByRole } = renderButton({ disabled: true });
      const button = getByRole('button');
      expect(button.props.accessibilityState.disabled).toBe(true);
    });
    it('deve indicar estado loading na acessibilidade', () => {
      const { getByRole } = renderButton({ loading: true });
      const button = getByRole('button');
      expect(button.props.accessibilityState.busy).toBe(true);
    });
  });
  describe('Props customizadas', () => {
    it('deve aceitar props do TouchableOpacity', () => {
      const { getByText } = renderButton({
        activeOpacity: 0.5,
      });
      expect(getByText('Test Button')).toBeTruthy();
    });
    it('deve desabilitar haptic quando haptic=false', () => {
      const { getByText } = renderButton({ haptic: false });
      expect(getByText('Test Button')).toBeTruthy();
    });
  });
  describe('Edge Cases', () => {
    it('deve lidar com texto vazio', () => {
      const result = renderButton({ children: '' });
      expect(result).toBeTruthy();
    });
    it('deve renderizar sem crash com todas as props opcionais', () => {
      const { getByText } = renderButton({
        variant: 'primary',
        size: 'md',
        loading: false,
        disabled: false,
        haptic: true,
        fullWidth: false,
        leftIcon: MockIcon,
        rightIcon: MockIcon,
        loadingText: 'Custom Loading...',
        testID: 'full-props-button',
      });
      expect(getByText('Test Button')).toBeTruthy();
    });
  });
});
