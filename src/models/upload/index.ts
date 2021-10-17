export type FileType = 'video' | 'image';

export interface Upload {
  id?: string;
  url?: string;
  type?: string;
  fileName?: string;
  mimeType?: string;
  contentType?: string;
  fileSize?: number;
  width?: number;
  height?: number;
}
