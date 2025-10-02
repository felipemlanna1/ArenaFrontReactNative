import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image, ImageProps } from 'expo-image';
import { SportsLoading } from '@/components/ui/sportsLoading';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  showLoading?: boolean;
  loadingSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onLoadComplete?: () => void;
  onLoadError?: (error: Error) => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  showLoading = true,
  loadingSize = 'sm',
  onLoadComplete,
  onLoadError,
  style,
  ...imageProps
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
    onLoadComplete?.();
  };

  const handleError = (error: { error: string }) => {
    setIsLoading(false);
    onLoadError?.(new Error(error.error));
  };

  return (
    <View style={[styles.container, style]}>
      <Image
        {...imageProps}
        style={[styles.image, style]}
        onLoad={handleLoad}
        onError={handleError}
        cachePolicy="memory-disk"
        transition={200}
      />
      {isLoading && showLoading && (
        <View style={styles.loadingOverlay}>
          <SportsLoading size={loadingSize} animationSpeed="fast" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
