import { ServerResponse } from 'http';

export const validationError = (res: ServerResponse, error: string, statusCode: number): void => {
  res.statusCode = statusCode;
  res.end(
    JSON.stringify({
      status: 'fail',
      error
    })
  );
};

export const error = (res: ServerResponse, statusCode: number, message: string, errors?: any): void => {
  res.statusCode = statusCode;
  res.end(
    JSON.stringify({
      success: false,
      message,
      errors
    })
  );
};

export const success = (res: ServerResponse, statusCode: number, message?: string, data?: string): void => {
  res.statusCode = statusCode;
  res.end(
    JSON.stringify({
      success: true,
      message,
      data
    })
  );
};
