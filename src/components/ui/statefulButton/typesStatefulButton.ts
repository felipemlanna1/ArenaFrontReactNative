import * as React from 'react';
import { ButtonProps } from '../button/typesButton';

export type ButtonState = 'idle' | 'loading' | 'success' | 'error';

export interface StatefulButtonProps
  extends Omit<ButtonProps, 'onPress' | 'loading' | 'children'> {
  onPress: () => Promise<void>;
  children?: React.ReactNode;
  idleText?: string;
  loadingText?: string;
  successText?: string;
  errorText?: string;
  successDuration?: number;
  errorDuration?: number;
  onSuccess?: () => void;
  onError?: (error?: Error) => void;
}
