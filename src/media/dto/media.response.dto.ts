export interface SuccessStatusDto {
  status: 'success';
  file: string;
  size: string;
  url: string;
  newFile: string;
}

export interface FailedStatusDto {
  status: 'failed';
  file: string;
  size: string;
  message: string;
}

export type MediaUploadStatusResponseDto = SuccessStatusDto | FailedStatusDto;
