import { useCallback } from 'react';
import {
  UseCheckboxGroupParams,
  UseCheckboxGroupReturn,
} from './typesCheckboxGroup';

export const useCheckboxGroup = <T = string>(
  params: UseCheckboxGroupParams<T>
): UseCheckboxGroupReturn<T> => {
  const { value, multiSelect, onChange } = params;

  const handleSelect = useCallback(
    (optionValue: T) => {
      if (multiSelect) {
        const currentValue = value as T[];
        const isCurrentlySelected = currentValue.includes(optionValue);

        const newValue = isCurrentlySelected
          ? currentValue.filter(v => v !== optionValue)
          : [...currentValue, optionValue];

        onChange(newValue);
      } else {
        onChange(optionValue);
      }
    },
    [value, multiSelect, onChange]
  );

  const isSelected = useCallback(
    (optionValue: T): boolean => {
      if (multiSelect) {
        return (value as T[]).includes(optionValue);
      }
      return value === optionValue;
    },
    [value, multiSelect]
  );

  return {
    handleSelect,
    isSelected,
  };
};
