import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ComponentsShowcaseScreen } from '../index';

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
    navigate: mockNavigate,
  }),
}));

describe('ComponentsShowcaseScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar corretamente', () => {
    const { getByText } = render(<ComponentsShowcaseScreen />);

    expect(getByText('Arena')).toBeTruthy();
    expect(getByText('Design System')).toBeTruthy();
    expect(getByText('Showcase de Componentes')).toBeTruthy();
  });

  it('deve exibir botão de voltar', () => {
    const { getByText } = render(<ComponentsShowcaseScreen />);

    expect(getByText('← Voltar')).toBeTruthy();
  });

  it('deve voltar quando botão voltar é pressionado', () => {
    const { getByText } = render(<ComponentsShowcaseScreen />);

    const backButton = getByText('← Voltar');
    fireEvent.press(backButton);

    expect(mockGoBack).toHaveBeenCalled();
  });

  it('deve exibir seção de Text Components', () => {
    const { getByText } = render(<ComponentsShowcaseScreen />);

    expect(getByText('Text Components')).toBeTruthy();
  });

  it('deve exibir todas as variantes de texto', () => {
    const { getByText } = render(<ComponentsShowcaseScreen />);

    expect(getByText('Display Variants')).toBeTruthy();
    expect(getByText('Heading Variants')).toBeTruthy();
    expect(getByText('Title Variants')).toBeTruthy();
    expect(getByText('Body Variants')).toBeTruthy();
    expect(getByText('Caption Variants')).toBeTruthy();
    expect(getByText('Label Variants')).toBeTruthy();
  });

  it('deve exibir exemplos interativos', () => {
    const { getByText } = render(<ComponentsShowcaseScreen />);

    expect(getByText('Interactive Text')).toBeTruthy();
    expect(getByText('Truncated Text')).toBeTruthy();
  });

  it('deve exibir seções futuras', () => {
    const { getByText } = render(<ComponentsShowcaseScreen />);

    expect(getByText('Button Components')).toBeTruthy();
    expect(getByText('Input Components')).toBeTruthy();
  });
});
