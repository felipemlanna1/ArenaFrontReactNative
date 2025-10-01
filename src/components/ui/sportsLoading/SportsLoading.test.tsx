import React from 'react';
import { render } from '@testing-library/react-native';
import { SportsLoading } from './index';

describe('SportsLoading', () => {
  const defaultProps = {
    testID: 'sports-loading',
  };

  const renderComponent = (props = {}) => {
    return render(<SportsLoading {...defaultProps} {...props} />);
  };

  describe('Renderização', () => {
    it('deve renderizar corretamente com props padrão', () => {
      const { getByTestId } = renderComponent();
      expect(getByTestId('sports-loading')).toBeTruthy();
    });

    it('deve renderizar 3 ícones por padrão', () => {
      const { getByTestId } = renderComponent();
      expect(getByTestId('sports-loading-icon-0')).toBeTruthy();
      expect(getByTestId('sports-loading-icon-1')).toBeTruthy();
      expect(getByTestId('sports-loading-icon-2')).toBeTruthy();
    });

    it('deve renderizar quantidade customizada de ícones', () => {
      const { getByTestId, queryByTestId } = renderComponent({ iconCount: 2 });
      expect(getByTestId('sports-loading-icon-0')).toBeTruthy();
      expect(getByTestId('sports-loading-icon-1')).toBeTruthy();
      expect(queryByTestId('sports-loading-icon-2')).toBeNull();
    });
  });

  describe('Props', () => {
    it('deve aceitar prop size', () => {
      const { getByTestId } = renderComponent({ size: 'lg' });
      expect(getByTestId('sports-loading')).toBeTruthy();
    });

    it('deve aceitar prop orientation', () => {
      const { getByTestId } = renderComponent({ orientation: 'vertical' });
      expect(getByTestId('sports-loading')).toBeTruthy();
    });

    it('deve aceitar prop animationSpeed', () => {
      const { getByTestId } = renderComponent({ animationSpeed: 'fast' });
      expect(getByTestId('sports-loading')).toBeTruthy();
    });

    it('deve aceitar style customizado', () => {
      const customStyle = { backgroundColor: 'red' };
      const { getByTestId } = renderComponent({ style: customStyle });
      expect(getByTestId('sports-loading')).toBeTruthy();
    });
  });

  describe('Tamanhos', () => {
    it('deve renderizar com tamanho pequeno', () => {
      const { getByTestId } = renderComponent({ size: 'sm' });
      expect(getByTestId('sports-loading')).toBeTruthy();
    });

    it('deve renderizar com tamanho médio', () => {
      const { getByTestId } = renderComponent({ size: 'md' });
      expect(getByTestId('sports-loading')).toBeTruthy();
    });

    it('deve renderizar com tamanho grande', () => {
      const { getByTestId } = renderComponent({ size: 'lg' });
      expect(getByTestId('sports-loading')).toBeTruthy();
    });
  });

  describe('Orientações', () => {
    it('deve renderizar horizontalmente', () => {
      const { getByTestId } = renderComponent({ orientation: 'horizontal' });
      expect(getByTestId('sports-loading')).toBeTruthy();
    });

    it('deve renderizar verticalmente', () => {
      const { getByTestId } = renderComponent({ orientation: 'vertical' });
      expect(getByTestId('sports-loading')).toBeTruthy();
    });
  });

  describe('Velocidades de animação', () => {
    it('deve aceitar velocidade lenta', () => {
      const { getByTestId } = renderComponent({ animationSpeed: 'slow' });
      expect(getByTestId('sports-loading')).toBeTruthy();
    });

    it('deve aceitar velocidade normal', () => {
      const { getByTestId } = renderComponent({ animationSpeed: 'normal' });
      expect(getByTestId('sports-loading')).toBeTruthy();
    });

    it('deve aceitar velocidade rápida', () => {
      const { getByTestId } = renderComponent({ animationSpeed: 'fast' });
      expect(getByTestId('sports-loading')).toBeTruthy();
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter testID configurado', () => {
      const { getByTestId } = renderComponent({ testID: 'custom-loading' });
      expect(getByTestId('custom-loading')).toBeTruthy();
    });

    it('deve ter testIDs individuais para cada ícone', () => {
      const { getByTestId } = renderComponent({ testID: 'custom-loading' });
      expect(getByTestId('custom-loading-icon-0')).toBeTruthy();
      expect(getByTestId('custom-loading-icon-1')).toBeTruthy();
      expect(getByTestId('custom-loading-icon-2')).toBeTruthy();
    });
  });
});
