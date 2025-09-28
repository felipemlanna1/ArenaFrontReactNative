import { useState, useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';
import {
  UseSearchInputParams,
  UseSearchInputReturn,
  SearchIconProps,
  ClearIconProps,
} from './typesSearchInput';

export const SearchIcon: React.FC<SearchIconProps> = ({
  size,
  color,
  isSearching,
  disabled
}) => {
  const opacity = disabled ? 0.5 : 1;
  const iconSize = size;
  const circleSize = iconSize * 0.6;
  const handleSize = iconSize * 0.3;

  if (isSearching) {
    return (
      <View
        style={{
          width: iconSize,
          height: iconSize,
          alignItems: 'center',
          justifyContent: 'center',
          opacity,
        }}
      >
        <View
          style={{
            width: circleSize * 0.8,
            height: circleSize * 0.8,
            borderWidth: 2,
            borderColor: color,
            borderTopColor: 'transparent',
            borderRadius: (circleSize * 0.8) / 2,
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        width: iconSize,
        height: iconSize,
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
      }}
    >
      {/* Search circle */}
      <View
        style={{
          width: circleSize,
          height: circleSize,
          borderWidth: 2,
          borderColor: color,
          borderRadius: circleSize / 2,
          position: 'relative',
        }}
      />

      {/* Search handle */}
      <View
        style={{
          position: 'absolute',
          width: handleSize,
          height: 2,
          backgroundColor: color,
          bottom: iconSize * 0.15,
          right: iconSize * 0.15,
          transform: [{ rotate: '45deg' }],
        }}
      />
    </View>
  );
};

export const ClearIcon: React.FC<ClearIconProps> = ({ size, color, disabled }) => {
  const opacity = disabled ? 0.5 : 1;
  const iconSize = size;
  const lineLength = iconSize * 0.6;

  return (
    <View
      style={{
        width: iconSize,
        height: iconSize,
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
      }}
    >
      {/* Circle background */}
      <View
        style={{
          width: iconSize * 0.8,
          height: iconSize * 0.8,
          backgroundColor: `${color}20`,
          borderRadius: (iconSize * 0.8) / 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* X lines */}
        <View
          style={{
            position: 'absolute',
            width: lineLength,
            height: 1.5,
            backgroundColor: color,
            transform: [{ rotate: '45deg' }],
          }}
        />
        <View
          style={{
            position: 'absolute',
            width: lineLength,
            height: 1.5,
            backgroundColor: color,
            transform: [{ rotate: '-45deg' }],
          }}
        />
      </View>
    </View>
  );
};

export const useSearchInput = (params: UseSearchInputParams): UseSearchInputReturn => {
  const {
    value,
    onSearch,
    onClear,
    debounceMs,
    autoSearch,
    minSearchLength,
    onChangeText,
  } = params;

  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>();

  const canSearch = value.length >= minSearchLength;
  const shouldShowClear = value.length > 0;

  const performSearch = useCallback((query: string) => {
    if (query.length >= minSearchLength) {
      setIsSearching(true);
      onSearch?.(query);

      // Simulate search completion after a short delay
      setTimeout(() => {
        setIsSearching(false);
      }, 300);
    }
  }, [onSearch, minSearchLength]);

  const handleChangeText = useCallback((text: string) => {
    onChangeText(text);

    if (autoSearch && onSearch) {
      // Clear existing debounce
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // Set new debounce
      debounceRef.current = setTimeout(() => {
        performSearch(text);
      }, debounceMs);
    }
  }, [onChangeText, autoSearch, onSearch, debounceMs, performSearch]);

  const handleClear = useCallback(() => {
    // Clear debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    onChangeText('');
    onClear?.();
    setIsSearching(false);
  }, [onChangeText, onClear]);

  const handleSearch = useCallback(() => {
    if (canSearch) {
      // Clear debounce
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      performSearch(value);
    }
  }, [canSearch, value, performSearch]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return {
    handleChangeText,
    handleClear,
    handleSearch,
    isSearching,
    canSearch,
    shouldShowClear,
  };
};