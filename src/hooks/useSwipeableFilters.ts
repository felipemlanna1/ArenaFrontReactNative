import { useCallback } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';

interface UseSwipeableFiltersParams<T> {
  filters: T[];
  activeFilter: T;
  onChange: (filter: T) => void;
  swipeThreshold?: number;
  velocityThreshold?: number;
}

const DEFAULT_SWIPE_THRESHOLD = 50;
const DEFAULT_VELOCITY_THRESHOLD = 500;

export const useSwipeableFilters = <T>({
  filters,
  activeFilter,
  onChange,
  swipeThreshold = DEFAULT_SWIPE_THRESHOLD,
  velocityThreshold = DEFAULT_VELOCITY_THRESHOLD,
}: UseSwipeableFiltersParams<T>) => {
  const translateX = useSharedValue(0);

  const handleSwipe = useCallback(
    (direction: 'left' | 'right') => {
      const currentIndex = filters.indexOf(activeFilter);
      if (currentIndex === -1) return;

      let nextIndex: number;
      if (direction === 'left') {
        nextIndex = currentIndex + 1;
        if (nextIndex >= filters.length) {
          return;
        }
      } else {
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
          return;
        }
      }

      onChange(filters[nextIndex]);
    },
    [filters, activeFilter, onChange]
  );

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-5, 5])
    .minDistance(10)
    .maxPointers(1)
    .enableTrackpadTwoFingerGesture(true)
    .onUpdate(event => {
      'worklet';
      translateX.value = event.translationX;
    })
    .onEnd(event => {
      'worklet';
      const { translationX, velocityX } = event;
      const distance = Math.abs(translationX);
      const velocity = Math.abs(velocityX);

      const shouldSwipe =
        distance > swipeThreshold || velocity > velocityThreshold;

      translateX.value = withSpring(0, {
        damping: 20,
        stiffness: 90,
      });

      if (shouldSwipe) {
        const direction = translationX > 0 ? 'right' : 'left';
        runOnJS(handleSwipe)(direction);
      }
    });

  const nativeGesture = Gesture.Native();

  const composedGesture = Gesture.Simultaneous(panGesture, nativeGesture);

  return { panGesture, composedGesture, translateX };
};
