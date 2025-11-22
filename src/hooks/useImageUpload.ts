import { useState, useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { imageUploadService } from '@/services/imagekit/imageUploadService';
import type { ImageKitUploadOptions } from '@/services/imagekit/typesImageKit';

interface UseImageUploadOptions {
  allowsEditing?: boolean;
  aspect?: [number, number];
  quality?: number;
}

interface UseImageUploadReturn {
  selectedImage: ImagePicker.ImagePickerAsset | null;
  uploadedUrl: string | null;
  isUploading: boolean;
  uploadProgress: number;
  error: string | null;
  pickImage: () => Promise<ImagePicker.ImagePickerAsset | null>;
  uploadImage: (
    uploadOptions?: ImageKitUploadOptions & {
      image?: ImagePicker.ImagePickerAsset;
    }
  ) => Promise<string | null>;
  clearImage: () => void;
  reset: () => void;
}

export const useImageUpload = (
  options: UseImageUploadOptions = {}
): UseImageUploadReturn => {
  const [selectedImage, setSelectedImage] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const pickImage =
    useCallback(async (): Promise<ImagePicker.ImagePickerAsset | null> => {
      try {
        setError(null);
        const image = await imageUploadService.pickImage({
          allowsEditing: options.allowsEditing ?? true,
          aspect: options.aspect || [1, 1],
          quality: options.quality || 0.8,
        });

        if (image) {
          setSelectedImage(image);
          setUploadedUrl(null);
        }

        return image;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Falha ao selecionar imagem'
        );
        return null;
      }
    }, [options.allowsEditing, options.aspect, options.quality]);

  const uploadImage = useCallback(
    async (
      uploadOptions?: ImageKitUploadOptions & {
        image?: ImagePicker.ImagePickerAsset;
      }
    ): Promise<string | null> => {
      const imageToUpload = uploadOptions?.image || selectedImage;

      if (!imageToUpload) {
        setError('Nenhuma imagem selecionada');
        return null;
      }

      try {
        setIsUploading(true);
        setError(null);
        setUploadProgress(0);

        const result = await imageUploadService.uploadImage(imageToUpload, {
          ...uploadOptions,
          onProgress: progress => {
            setUploadProgress(progress);
            uploadOptions?.onProgress?.(progress);
          },
        });

        setUploadedUrl(result.url);
        setUploadProgress(100);
        return result.url;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload falhou');
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [selectedImage]
  );

  const clearImage = useCallback(() => {
    setSelectedImage(null);
    setUploadedUrl(null);
    setUploadProgress(0);
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setSelectedImage(null);
    setUploadedUrl(null);
    setUploadProgress(0);
    setError(null);
    setIsUploading(false);
  }, []);

  return {
    selectedImage,
    uploadedUrl,
    isUploading,
    uploadProgress,
    error,
    pickImage,
    uploadImage,
    clearImage,
    reset,
  };
};
