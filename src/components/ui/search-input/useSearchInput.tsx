import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';
import {
  UseSearchInputParams,
  UseSearchInputReturn,
  SearchIconProps,
  ClearIconProps,
} from './typesSearchInput';
import { styles } from './stylesSearchInput';

export const SearchIcon: React.FC<SearchIconProps> = ({
  size,
  color,
  isSearching,
  disabled,
}) => {
  const opacity = disabled ? 0.5 : 1;
  const iconSize = size;
  const circleSize = iconSize * 0.6;
  const handleSize = iconSize * 0.3;

  if (isSearching) {
    return (
      <View
        style={[
          styles.iconContainer,
          {
            width: iconSize,
            height: iconSize,
            opacity,
          },
        ]}
      >
        <View
          style={[
            styles.searchIconLoading,
            {
              width: circleSize * 0.8,
              height: circleSize * 0.8,
              borderColor: color,
              borderRadius: (circleSize * 0.8) / 2,
            },
          ]}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.iconContainer,
        {
          width: iconSize,
          height: iconSize,
          opacity,
        },
      ]}
    >
      <View
        style={[
          styles.searchIconCircle,
          {
            width: circleSize,
            height: circleSize,
            borderColor: color,
            borderRadius: circleSize / 2,
          },
        ]}
      />

      <View
        style={[
          styles.searchIconHandle,
          {
            width: handleSize,
            backgroundColor: color,
            bottom: iconSize * 0.15,
            right: iconSize * 0.15,
            transform: [{ rotate: '45deg' }],
          },
        ]}
      />
    </View>
  );
};

export const ClearIcon: React.FC<ClearIconProps> = ({
  size,
  color,
  disabled,
}) => {
  const opacity = disabled ? 0.5 : 1;
  const iconSize = size;
  const lineLength = iconSize * 0.6;

  return (
    <View
      style={[
        styles.clearIconContainer,
        {
          width: iconSize,
          height: iconSize,
          opacity,
        },
      ]}
    >
      <View
        style={[
          styles.clearIconBackground,
          {
            width: iconSize * 0.8,
            height: iconSize * 0.8,
            backgroundColor: `${color}20`,
            borderRadius: (iconSize * 0.8) / 2,
          },
        ]}
      >
        <View
          style={[
            styles.clearIconLine,
            {
              width: lineLength,
              backgroundColor: color,
              transform: [{ rotate: '45deg' }],
            },
          ]}
        />
        <View
          style={[
            styles.clearIconLine,
            {
              width: lineLength,
              backgroundColor: color,
              transform: [{ rotate: '-45deg' }],
            },
          ]}
        />
      </View>
    </View>
  );
};

export const useSearchInput = (
  params: UseSearchInputParams
): UseSearchInputReturn => {
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
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const canSearch = value.length >= minSearchLength;
  const shouldShowClear = value.length > 0;

  const performSearch = useCallback(
    (query: string) => {
      if (query.length >= minSearchLength) {
        setIsSearching(true);
        onSearch?.(query);

        setTimeout(() => {
          setIsSearching(false);
        }, 300);
      }
    },
    [onSearch, minSearchLength]
  );

  const handleChangeText = useCallback(
    (text: string) => {
      onChangeText(text);

      if (autoSearch && onSearch) {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
          performSearch(text);
        }, debounceMs);
      }
    },
    [onChangeText, autoSearch, onSearch, debounceMs, performSearch]
  );

  const handleClear = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    onChangeText('');
    onClear?.();
    setIsSearching(false);
  }, [onChangeText, onClear]);

  const handleSearch = useCallback(() => {
    if (canSearch) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      performSearch(value);
    }
  }, [canSearch, value, performSearch]);

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
