import { useState, useCallback } from 'react';
import { UseFilterBarProps, UseFilterBarReturn } from './typesFilterBar';

export const useFilterBar = ({
  onSearchChange,
}: UseFilterBarProps): UseFilterBarReturn => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchClear = useCallback(() => {
    onSearchChange('');
  }, [onSearchChange]);

  const handleSearchFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleSearchBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return {
    handleSearchClear,
    handleSearchFocus,
    handleSearchBlur,
    isFocused,
  };
};
