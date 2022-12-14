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

export const success = (res: ServerResponse, statusCode: number, message?: string, data?: any): void => {
  res.statusCode = statusCode;
  res.end(
    JSON.stringify({
      success: true,
      message,
      data
    })
  );
};

export const generateSlug = async (text: string): Promise<string> => {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

export const formatDate = async (date: Date): Promise<string> => {
  const newDate: Date = new Date(date);
  return (
    newDate.getDay() +
    '/' +
    newDate.getMonth() +
    '/' +
    newDate.getFullYear() +
    ' ' +
    newDate.getHours() +
    ':' +
    newDate.getMinutes() +
    ':' +
    newDate.getSeconds()
  );
};
