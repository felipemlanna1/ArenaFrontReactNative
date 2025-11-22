export interface ImageKitAuthParams {
  signature: string;
  expire: number;
  token: string;
  publicKey: string;
  urlEndpoint: string;
}

export interface ImageKitUploadResult {
  fileId: string;
  url: string;
  thumbnailUrl: string;
  filePath: string;
  name: string;
  width?: number;
  height?: number;
}

export interface ImageKitUploadOptions {
  folder?: string;
  fileName?: string;
  tags?: string[];
  onProgress?: (progress: number) => void;
}

export interface ImageKitTransformations {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpg' | 'png' | 'webp' | 'avif';
}
