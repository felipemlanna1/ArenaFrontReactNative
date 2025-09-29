import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from './index';

describe('Input Component', () => {
  describe('Renderização Básica', () => {
    it('deve renderizar corretamente com props mínimas', () => {
      const { getByDisplayValue } = render(
        <Input value="test" onChangeText={() => {}} />
      );
      expect(getByDisplayValue('test')).toBeTruthy();
    });

    it('deve aceitar testID', () => {
      const { getByTestId } = render(
        <Input value="" onChangeText={() => {}} testID="test-input" />
      );
      expect(getByTestId('test-input')).toBeTruthy();
    });

    it('deve renderizar com placeholder', () => {
      const { getByPlaceholderText } = render(
        <Input value="" onChangeText={() => {}} placeholder="Digite aqui" />
      );
      expect(getByPlaceholderText('Digite aqui')).toBeTruthy();
    });
  });

  describe('Variantes', () => {
    const variants = ['default', 'error', 'success', 'warning'] as const;

    variants.forEach(variant => {
      it(`deve renderizar variante ${variant} corretamente`, () => {
        const { getByDisplayValue } = render(
          <Input value="test" onChangeText={() => {}} variant={variant} />
        );
        expect(getByDisplayValue('test')).toBeTruthy();
      });
    });
  });

  describe('Tamanhos', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach(size => {
      it(`deve renderizar tamanho ${size} corretamente`, () => {
        const { getByDisplayValue } = render(
          <Input value="test" onChangeText={() => {}} size={size} />
        );
        expect(getByDisplayValue('test')).toBeTruthy();
      });
    });
  });

  describe('Estados', () => {
    it('deve renderizar estado disabled', () => {
      const { getByDisplayValue } = render(
        <Input value="test" onChangeText={() => {}} disabled={true} />
      );
      const input = getByDisplayValue('test');
      expect(input.props.editable).toBe(false);
    });

    it('deve renderizar estado readonly', () => {
      const { getByDisplayValue } = render(
        <Input value="test" onChangeText={() => {}} readonly={true} />
      );
      const input = getByDisplayValue('test');
      expect(input.props.editable).toBe(false);
    });

    it('deve mostrar loading quando loading=true', () => {
      const { getByTestId } = render(
        <Input
          value="test"
          onChangeText={() => {}}
          loading={true}
          testID="test-input"
        />
      );
      expect(getByTestId('test-input-loading')).toBeTruthy();
    });
  });

  describe('Interações', () => {
    it('deve chamar onChangeText quando texto muda', () => {
      const onChangeTextMock = jest.fn();
      const { getByDisplayValue } = render(
        <Input value="test" onChangeText={onChangeTextMock} />
      );

      fireEvent.changeText(getByDisplayValue('test'), 'novo texto');
      expect(onChangeTextMock).toHaveBeenCalledWith('novo texto');
    });

    it('deve chamar onFocus quando input recebe foco', () => {
      const onFocusMock = jest.fn();
      const { getByDisplayValue } = render(
        <Input value="" onChangeText={() => {}} onFocus={onFocusMock} />
      );

      fireEvent(getByDisplayValue(''), 'focus');
      expect(onFocusMock).toHaveBeenCalled();
    });

    it('deve chamar onBlur quando input perde foco', () => {
      const onBlurMock = jest.fn();
      const { getByDisplayValue } = render(
        <Input value="" onChangeText={() => {}} onBlur={onBlurMock} />
      );

      fireEvent(getByDisplayValue(''), 'blur');
      expect(onBlurMock).toHaveBeenCalled();
    });
  });

  describe('Label e Helper Text', () => {
    it('deve mostrar label quando fornecida', () => {
      const { getByText } = render(
        <Input value="" onChangeText={() => {}} label="Nome" />
      );
      expect(getByText('Nome')).toBeTruthy();
    });

    it('deve mostrar asterisco para campos obrigatórios', () => {
      const { getByText } = render(
        <Input value="" onChangeText={() => {}} label="Nome" required={true} />
      );
      expect(getByText('*')).toBeTruthy();
    });

    it('deve mostrar helper text quando há erro', () => {
      const { getByText } = render(
        <Input value="" onChangeText={() => {}} error="Campo obrigatório" />
      );
      expect(getByText('Campo obrigatório')).toBeTruthy();
    });
  });

  describe('Botão Clear', () => {
    it('deve mostrar botão clear quando clearable=true e há valor', () => {
      const { getByTestId } = render(
        <Input
          value="test"
          onChangeText={() => {}}
          clearable={true}
          testID="test-input"
        />
      );
      expect(getByTestId('test-input-clear')).toBeTruthy();
    });

    it('deve limpar o texto quando botão clear é pressionado', () => {
      const onChangeTextMock = jest.fn();
      const { getByTestId } = render(
        <Input
          value="test"
          onChangeText={onChangeTextMock}
          clearable={true}
          testID="test-input"
        />
      );

      fireEvent.press(getByTestId('test-input-clear'));
      expect(onChangeTextMock).toHaveBeenCalledWith('');
    });
  });
});
