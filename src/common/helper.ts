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

export const error = (res: ServerResponse, error: string, statusCode: number): void => {
  res.statusCode = statusCode;
  res.end(
    JSON.stringify({
      status: 'fail',
      error
    })
  );
};

export const success = (res: ServerResponse, statusCode: number, data?: string): void => {
  res.statusCode = statusCode;
  res.end(
    JSON.stringify({
      status: 'success',
      data
    })
  );
};
