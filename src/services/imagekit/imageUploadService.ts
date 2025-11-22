import * as ImagePicker from 'expo-image-picker';
import { httpService } from '../http';
import type {
  ImageKitAuthParams,
  ImageKitUploadResult,
  ImageKitUploadOptions,
  ImageKitTransformations,
} from './typesImageKit';

class ImageUploadService {
  private apiUrl: string;
  private imagekitEndpoint: string;

  constructor() {
    this.apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
    this.imagekitEndpoint =
      process.env.EXPO_PUBLIC_IMAGEKIT_URL_ENDPOINT ||
      'https://ik.imagekit.io/sportpulse';
  }

  private async getAuthParams(): Promise<ImageKitAuthParams> {
    try {
      const response =
        await httpService.getDirect<ImageKitAuthParams>('/imagekit/auth');
      return response;
    } catch {
      throw new Error('Falha ao obter autenticação para upload');
    }
  }

  async pickImage(
    options: {
      allowsEditing?: boolean;
      aspect?: [number, number];
      quality?: number;
      mediaTypes?:
        | 'images'
        | 'videos'
        | 'livePhotos'
        | ('images' | 'videos' | 'livePhotos')[];
    } = {}
  ): Promise<ImagePicker.ImagePickerAsset | null> {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      throw new Error('Permissão para acessar galeria foi negada');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: options.mediaTypes || 'images',
      allowsEditing: options.allowsEditing ?? true,
      aspect: options.aspect || [1, 1],
      quality: options.quality || 0.8,
    });

    if (result.canceled) {
      return null;
    }

    return result.assets[0];
  }

  async uploadImage(
    imageAsset: ImagePicker.ImagePickerAsset,
    options: ImageKitUploadOptions = {}
  ): Promise<ImageKitUploadResult> {
    try {
      const authParams = await this.getAuthParams();

      const fileName =
        options.fileName ||
        `image_${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
      const folder = options.folder || '/arena';

      const formData = new FormData();

      const uriParts = imageAsset.uri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      // @ts-expect-error - React Native FormData accepts this format
      formData.append('file', {
        uri: imageAsset.uri,
        name: fileName,
        type: `image/${fileType}`,
      });

      formData.append('fileName', fileName);
      formData.append('folder', folder);
      formData.append('publicKey', authParams.publicKey);
      formData.append('signature', authParams.signature);
      formData.append('expire', authParams.expire.toString());
      formData.append('token', authParams.token);

      if (options.tags && options.tags.length > 0) {
        formData.append('tags', options.tags.join(','));
      }

      const uploadUrl = 'https://upload.imagekit.io/api/v1/files/upload';

      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();

        let errorData: { message?: string } = {};
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = {};
        }

        throw new Error(
          errorData.message ||
            errorText ||
            `Upload falhou: ${response.statusText}`
        );
      }

      const data = await response.json();

      return {
        fileId: data.fileId,
        url: data.url,
        thumbnailUrl: data.thumbnailUrl,
        filePath: data.filePath,
        name: data.name,
        width: data.width,
        height: data.height,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Upload falhou: ${error.message}`);
      }
      throw error;
    }
  }

  getOptimizedUrl(
    filePath: string,
    transformations: ImageKitTransformations = {}
  ): string {
    const params: string[] = [];

    if (transformations.width) params.push(`w-${transformations.width}`);
    if (transformations.height) params.push(`h-${transformations.height}`);
    if (transformations.quality) params.push(`q-${transformations.quality}`);
    if (transformations.format) params.push(`f-${transformations.format}`);

    const transformString = params.length > 0 ? `tr:${params.join(',')}` : '';

    return `${this.imagekitEndpoint}/${transformString}${filePath}`;
  }
}

export const imageUploadService = new ImageUploadService();
