import React from 'react';
import { render } from '@testing-library/react-native';
import { AppIcon } from './index';

describe('AppIcon', () => {
  it('should render correctly with default props', () => {
    const { getByTestId } = render(<AppIcon testID="app-icon" />);
    expect(getByTestId('app-icon')).toBeTruthy();
  });

  it('should render with different sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;

    sizes.forEach(size => {
      const { getByTestId } = render(
        <AppIcon size={size} testID={`app-icon-${size}`} />
      );
      expect(getByTestId(`app-icon-${size}`)).toBeTruthy();
    });
  });

  it('should apply custom styles', () => {
    const customStyle = { opacity: 0.5 };
    const { getByTestId } = render(
      <AppIcon style={customStyle} testID="app-icon" />
    );

    const iconComponent = getByTestId('app-icon');
    expect(iconComponent.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(customStyle)])
    );
  });

  it('should handle array of styles', () => {
    const styles = [{ opacity: 0.5 }, { margin: 10 }];
    const { getByTestId } = render(
      <AppIcon style={styles} testID="app-icon" />
    );

    const iconComponent = getByTestId('app-icon');
    expect(iconComponent.props.style).toEqual(expect.arrayContaining(styles));
  });

  it('should have orange background by default', () => {
    const { getByTestId } = render(<AppIcon testID="app-icon" />);
    const iconComponent = getByTestId('app-icon');

    // Verificar se tem background color laranja
    expect(iconComponent.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: '#FF5301',
        }),
      ])
    );
  });
});
