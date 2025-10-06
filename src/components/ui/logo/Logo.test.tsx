import React from 'react';
import { render } from '@testing-library/react-native';
import { Logo } from './index';
import { ArenaSpacing } from '@/constants';
describe('Logo', () => {
  it('should render correctly with default props', () => {
    const { getByTestId } = render(<Logo testID="logo" />);
    expect(getByTestId('logo')).toBeTruthy();
  });
  it('should render with variant1 by default', () => {
    const { getByTestId } = render(<Logo testID="logo" />);
    const logoComponent = getByTestId('logo');
    expect(logoComponent).toBeTruthy();
  });
  it('should render with different sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
    sizes.forEach(size => {
      const { getByTestId } = render(
        <Logo size={size} testID={`logo-${size}`} />
      );
      expect(getByTestId(`logo-${size}`)).toBeTruthy();
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
        <Logo variant={variant} testID={`logo-${variant}`} />
      );
      expect(getByTestId(`logo-${variant}`)).toBeTruthy();
    });
  });
  it('should apply custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(<Logo style={customStyle} testID="logo" />);
    const logoComponent = getByTestId('logo');
    expect(logoComponent.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(customStyle)])
    );
  });
  it('should handle array of styles', () => {
    const styles = [{ backgroundColor: 'red' }, { padding: ArenaSpacing.sm }];
    const { getByTestId } = render(<Logo style={styles} testID="logo" />);
    const logoComponent = getByTestId('logo');
    expect(logoComponent.props.style).toEqual(expect.arrayContaining(styles));
  });
});
