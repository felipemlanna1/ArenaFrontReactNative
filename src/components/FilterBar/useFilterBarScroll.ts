import { useRef, useCallback } from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

export interface UseFilterBarScrollReturn {
  scrollY: Animated.Value;
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  filterBarTranslateY: Animated.AnimatedInterpolation<number>;
}

const FILTER_BAR_HEIGHT = 68;
const SCROLL_THRESHOLD = 10;

export const useFilterBarScroll = (): UseFilterBarScrollReturn => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentScrollY = event.nativeEvent.contentOffset.y;

      Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
        useNativeDriver: true,
      })(event);

      lastScrollY.current = currentScrollY;
    },
    [scrollY]
  );

  const filterBarTranslateY = scrollY.interpolate({
    inputRange: [0, SCROLL_THRESHOLD, FILTER_BAR_HEIGHT],
    outputRange: [0, 0, -FILTER_BAR_HEIGHT],
    extrapolate: 'clamp',
  });

  return {
    scrollY,
    handleScroll,
    filterBarTranslateY,
  };
};
