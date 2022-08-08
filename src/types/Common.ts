export enum StatusType {
  SUCCESS = 'success',
  FAIL = 'fail',
  ERROR = 'error',
}

export interface ErrorType {
  status: StatusType;
  message: string;
}
