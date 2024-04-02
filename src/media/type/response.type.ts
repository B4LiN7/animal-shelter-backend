export interface SuccessStatusType {
  status: 'success';
  file: string;
  size: string;
  url: string;
  newFile: string;
}

export interface FailedStatusType {
  status: 'failed';
  file: string;
  size: string;
  message: string;
}

export type MediaUploadResType = SuccessStatusType | FailedStatusType;
