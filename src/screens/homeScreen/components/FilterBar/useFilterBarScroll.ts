import { useRef } from 'react';
import { Animated } from 'react-native';

export interface UseFilterBarScrollReturn {
  scrollY: Animated.Value;
  handleScroll: ReturnType<typeof Animated.event>;
  filterBarTranslateY: Animated.AnimatedInterpolation<number>;
}

const FILTER_BAR_HEIGHT = 68;
const SCROLL_THRESHOLD = 10;

export const useFilterBarScroll = (): UseFilterBarScrollReturn => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
    }
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
