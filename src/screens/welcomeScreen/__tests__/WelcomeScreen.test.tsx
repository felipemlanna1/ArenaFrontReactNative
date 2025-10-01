import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { WelcomeScreen } from '../index';
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: jest.fn(),
  }),
}));
describe('WelcomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('deve renderizar corretamente', () => {
    const { getByText } = render(<WelcomeScreen />);
    expect(getByText('ARENA')).toBeTruthy();
    expect(getByText('O futuro do esporte')).toBeTruthy();
    expect(getByText('Bem-vindo')).toBeTruthy();
  });
  it('deve exibir botão de começar', () => {
    const { getByText } = render(<WelcomeScreen />);
    expect(getByText('COMEÇAR')).toBeTruthy();
  });
  it('deve exibir botão de ver componentes', () => {
    const { getByText } = render(<WelcomeScreen />);
    expect(getByText('VER COMPONENTES')).toBeTruthy();
  });
  it('deve navegar para showcase ao clicar em ver componentes', () => {
    const { getByText } = render(<WelcomeScreen />);
    const showComponentsButton = getByText('VER COMPONENTES');
    fireEvent.press(showComponentsButton);
    expect(mockNavigate).toHaveBeenCalledWith('ComponentsShowcase');
  });
  it('deve exibir texto descritivo', () => {
    const { getByText } = render(<WelcomeScreen />);
    expect(getByText(/Conecte-se com atletas/)).toBeTruthy();
  });
  it('deve exibir footer com versão', () => {
    const { getByText } = render(<WelcomeScreen />);
    expect(getByText(/Arena v1.0.0/)).toBeTruthy();
  });
});
