import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CodeExample } from '../index';

describe('CodeExample', () => {
  const defaultProps = {
    code: 'const example = "test";',
    onCopy: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar corretamente', () => {
    const { getByText } = render(<CodeExample {...defaultProps} />);

    expect(getByText('const example = "test";')).toBeTruthy();
    expect(getByText('tsx')).toBeTruthy();
    expect(getByText('Copiar')).toBeTruthy();
  });

  it('deve renderizar com language customizada', () => {
    const { getByText } = render(
      <CodeExample {...defaultProps} language="javascript" />
    );

    expect(getByText('javascript')).toBeTruthy();
  });

  it('deve chamar onCopy quando botão copiar é pressionado', () => {
    const mockOnCopy = jest.fn();
    const { getByText } = render(
      <CodeExample {...defaultProps} onCopy={mockOnCopy} />
    );

    const copyButton = getByText('Copiar');
    fireEvent.press(copyButton);

    expect(mockOnCopy).toHaveBeenCalledWith('const example = "test";');
  });

  it('deve renderizar sem botão copiar quando onCopy não é fornecido', () => {
    const { queryByText } = render(<CodeExample code="test code" />);

    expect(queryByText('Copiar')).toBeNull();
  });

  it('deve exibir código multi-linha corretamente', () => {
    const multiLineCode = `<Text variant="bodyPrimary">
  Hello World
</Text>`;

    const { getByText } = render(
      <CodeExample code={multiLineCode} onCopy={jest.fn()} />
    );

    expect(getByText(multiLineCode)).toBeTruthy();
  });

  it('deve renderizar sem quebrar quando code está vazio', () => {
    const { getByText } = render(<CodeExample code="" onCopy={jest.fn()} />);

    expect(getByText('tsx')).toBeTruthy();
    expect(getByText('Copiar')).toBeTruthy();
  });
});
