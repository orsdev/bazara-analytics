import { isDev } from '../is-dev';

describe('is-dev', () => {
  const originalEnv = process.env.NODE_ENV;

  afterEach(() => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: originalEnv,
      writable: true,
      configurable: true
    });
  });

  describe('isDev', () => {
    it('returns true when NODE_ENV is development', () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'development',
        writable: true,
        configurable: true
      });
      expect(isDev()).toBe(true);
    });

    it('returns false when NODE_ENV is production', () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'production',
        writable: true,
        configurable: true
      });
      expect(isDev()).toBe(false);
    });

    it('returns false when NODE_ENV is test', () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'test',
        writable: true,
        configurable: true
      });
      expect(isDev()).toBe(false);
    });

    it('returns false when NODE_ENV is not set', () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: undefined,
        writable: true,
        configurable: true
      });
      expect(isDev()).toBe(false);
    });

    it('returns false for any other NODE_ENV value', () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'staging',
        writable: true,
        configurable: true
      });
      expect(isDev()).toBe(false);
    });
  });
});
