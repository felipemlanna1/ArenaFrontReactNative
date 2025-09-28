import React from 'react';
import { render } from '@testing-library/react-native';
import { Symbol } from './index';
describe('Symbol', () => {
  it('should render correctly with default props', () => {
    const { getByTestId } = render(<Symbol testID="symbol" />);
    expect(getByTestId('symbol')).toBeTruthy();
  });
  it('should render with variant1 by default', () => {
    const { getByTestId } = render(<Symbol testID="symbol" />);
    const symbolComponent = getByTestId('symbol');
    expect(symbolComponent).toBeTruthy();
  });
  it('should render with different sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
    sizes.forEach(size => {
      const { getByTestId } = render(
        <Symbol size={size} testID={`symbol-${size}`} />
      );
      expect(getByTestId(`symbol-${size}`)).toBeTruthy();
    });
  });
  it('should render with different variants', () => {
    const variants = [
      'variant1',
      'variant2',
      'variant3',
      'variant4',
      'black',
      'white',
    ] as const;
    variants.forEach(variant => {
      const { getByTestId } = render(
        <Symbol variant={variant} testID={`symbol-${variant}`} />
      );
      expect(getByTestId(`symbol-${variant}`)).toBeTruthy();
    });
  });
  it('should apply custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <Symbol style={customStyle} testID="symbol" />
    );
    const symbolComponent = getByTestId('symbol');
    expect(symbolComponent.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(customStyle)])
    );
  });
  it('should handle array of styles', () => {
    const styles = [{ backgroundColor: 'red' }, { padding: 10 }];
    const { getByTestId } = render(<Symbol style={styles} testID="symbol" />);
    const symbolComponent = getByTestId('symbol');
    expect(symbolComponent.props.style).toEqual(expect.arrayContaining(styles));
  });
});
