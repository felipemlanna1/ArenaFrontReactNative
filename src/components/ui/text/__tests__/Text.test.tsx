import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from '../index';
import { ArenaSpacing } from '@/constants';
describe('Text Component', () => {
  describe('Renderização Básica', () => {
    it('deve renderizar corretamente com variant obrigatória', () => {
      const { getByText } = render(
        <Text variant="bodyPrimary">Test content</Text>
      );
      expect(getByText('Test content')).toBeTruthy();
    });
    it('deve aceitar testID', () => {
      const { getByTestId } = render(
        <Text variant="bodyPrimary" testID="test-text">
          Test content
        </Text>
      );
      expect(getByTestId('test-text')).toBeTruthy();
    });
  });
  describe('Semantic Variants', () => {
    it('deve renderizar display variants', () => {
      const { getByText: getPrimary } = render(
        <Text variant="displayPrimary">Display Primary</Text>
      );
      const { getByText: getAccent } = render(
        <Text variant="displayAccent">Display Accent</Text>
      );
      expect(getPrimary('Display Primary')).toBeTruthy();
      expect(getAccent('Display Accent')).toBeTruthy();
    });
    it('deve renderizar heading variants', () => {
      const { getByText: getPrimary } = render(
        <Text variant="headingPrimary">Heading Primary</Text>
      );
      const { getByText: getAccent } = render(
        <Text variant="headingAccent">Heading Accent</Text>
      );
      expect(getPrimary('Heading Primary')).toBeTruthy();
      expect(getAccent('Heading Accent')).toBeTruthy();
    });
    it('deve renderizar body variants', () => {
      const variants = [
        'bodyPrimary',
        'bodySecondary',
        'bodyMuted',
        'bodyError',
        'bodySuccess',
      ] as const;
      variants.forEach(variant => {
        const { getByText } = render(
          <Text variant={variant}>Body {variant}</Text>
        );
        expect(getByText(`Body ${variant}`)).toBeTruthy();
      });
    });
    it('deve renderizar caption variants', () => {
      const variants = [
        'captionSecondary',
        'captionMuted',
        'captionError',
      ] as const;
      variants.forEach(variant => {
        const { getByText } = render(
          <Text variant={variant}>Caption {variant}</Text>
        );
        expect(getByText(`Caption ${variant}`)).toBeTruthy();
      });
    });
    it('deve renderizar label variants', () => {
      const variants = [
        'labelPrimary',
        'labelSecondary',
        'labelError',
      ] as const;
      variants.forEach(variant => {
        const { getByText } = render(
          <Text variant={variant}>Label {variant}</Text>
        );
        expect(getByText(`Label ${variant}`)).toBeTruthy();
      });
    });
  });
  describe('Interatividade', () => {
    it('deve chamar onPress quando clicado', () => {
      const onPressMock = jest.fn();
      const { getByText } = render(
        <Text variant="bodyPrimary" onPress={onPressMock}>
          Clickable Text
        </Text>
      );
      fireEvent.press(getByText('Clickable Text'));
      expect(onPressMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('Props adicionais', () => {
    it('deve aceitar numberOfLines', () => {
      const { getByText } = render(
        <Text variant="bodyPrimary" numberOfLines={2}>
          Very long text that should be truncated after two lines
        </Text>
      );
      expect(
        getByText('Very long text that should be truncated after two lines')
      ).toBeTruthy();
    });
    it('deve aceitar style customizado', () => {
      const customStyle = { marginTop: ArenaSpacing.xl };
      const { getByText } = render(
        <Text variant="bodyPrimary" style={customStyle}>
          Styled text
        </Text>
      );
      expect(getByText('Styled text')).toBeTruthy();
    });
  });
});
