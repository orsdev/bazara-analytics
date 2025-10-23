import { AxiosError } from 'axios';

export const errorHandler = (
  error: unknown,
  fallbackMessage = 'An error occurred'
): string => {
  if (error instanceof AxiosError) {
    if (error.response?.data?.error) {
      return error.response.data.error;
    }
  }

  if (error instanceof Error) {
    return error.message || fallbackMessage;
  }

  return fallbackMessage;
};
