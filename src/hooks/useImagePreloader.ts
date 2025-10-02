import { useState, useEffect, useCallback } from 'react';
import { Image } from 'expo-image';
import { ImageSource } from 'expo-image';

interface UseImagePreloaderReturn {
  isLoading: boolean;
  isReady: boolean;
  error: Error | null;
}

export const useImagePreloader = (
  imageSources: ImageSource[]
): UseImagePreloaderReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const preloadImages = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const prefetchPromises = imageSources.map(source =>
        Image.prefetch(source)
      );

      await Promise.all(prefetchPromises);

      setIsReady(true);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Image preload failed'));
    } finally {
      setIsLoading(false);
    }
  }, [imageSources]);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  return { isLoading, isReady, error };
};
