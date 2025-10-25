import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { errorHandler } from '../error-handler';

describe('error-handler', () => {
  describe('errorHandler', () => {
    it('returns error message from AxiosError response data', () => {
      const axiosError = new AxiosError('Request failed');
      axiosError.response = {
        data: {
          error: 'Network error occurred'
        },
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        config: {} as InternalAxiosRequestConfig
      };

      const result = errorHandler(axiosError);
      expect(result).toBe('Network error occurred');
    });

    it('returns fallback message for AxiosError without response data', () => {
      const axiosError = {
        response: undefined,
        isAxiosError: true
      } as AxiosError;

      const result = errorHandler(axiosError);
      expect(result).toBe('An error occurred');
    });

    it('returns fallback message for AxiosError with empty response', () => {
      const axiosError = {
        response: {
          data: {}
        },
        isAxiosError: true
      } as AxiosError;

      const result = errorHandler(axiosError);
      expect(result).toBe('An error occurred');
    });

    it('returns Error message for standard Error', () => {
      const error = new Error('Something went wrong');
      const result = errorHandler(error);
      expect(result).toBe('Something went wrong');
    });

    it('returns fallback message for Error without message', () => {
      const error = new Error('');
      const result = errorHandler(error);
      expect(result).toBe('An error occurred');
    });

    it('returns custom fallback message when provided', () => {
      const error = new Error('');
      const result = errorHandler(error, 'Custom error message');
      expect(result).toBe('Custom error message');
    });

    it('returns fallback message for unknown error type', () => {
      const error = { unknown: 'error' };
      const result = errorHandler(error);
      expect(result).toBe('An error occurred');
    });

    it('returns fallback message for null error', () => {
      const result = errorHandler(null);
      expect(result).toBe('An error occurred');
    });

    it('returns fallback message for undefined error', () => {
      const result = errorHandler(undefined);
      expect(result).toBe('An error occurred');
    });

    it('returns fallback message for string error', () => {
      const result = errorHandler('string error');
      expect(result).toBe('An error occurred');
    });

    it('returns fallback message for number error', () => {
      const result = errorHandler(123);
      expect(result).toBe('An error occurred');
    });

    it('handles AxiosError with nested error structure', () => {
      const axiosError = new AxiosError('Request failed');
      axiosError.response = {
        data: {
          error: 'Validation failed'
        },
        status: 422,
        statusText: 'Unprocessable Entity',
        headers: {},
        config: {} as InternalAxiosRequestConfig
      };

      const result = errorHandler(axiosError);
      expect(result).toBe('Validation failed');
    });

    it('uses custom fallback for AxiosError without data', () => {
      const axiosError = {
        response: {},
        isAxiosError: true
      } as AxiosError;

      const result = errorHandler(axiosError, 'Network issue');
      expect(result).toBe('Network issue');
    });
  });
});
