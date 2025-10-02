import React, { Component, ReactNode, ErrorInfo } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { logger } from '@/utils/logger';
import { styles } from './stylesErrorBoundary';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// eslint-disable-next-line arena/arena-best-practices
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logger.error('ErrorBoundary caught error', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.container}>
          <Text variant="titlePrimary" style={styles.title}>
            Algo deu errado
          </Text>
          <Text variant="bodySecondary" style={styles.message}>
            Ocorreu um erro inesperado. Por favor, tente novamente.
          </Text>
          <Button
            variant="primary"
            onPress={this.handleReset}
            testID="error-boundary-reset"
          >
            Tentar novamente
          </Button>
        </View>
      );
    }

    return this.props.children;
  }
}
