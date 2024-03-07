interface SuccessStatusDto {
  status: 'success';
  file: string;
  size: string;
  url: string;
  newFile: string;
}

interface FailedStatusDto {
  status: 'failed';
  file: string;
  size: string;
  message: string;
}

export type ResponseStatusDto = SuccessStatusDto | FailedStatusDto;
