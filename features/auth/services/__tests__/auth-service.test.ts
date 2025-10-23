import { authService } from '../auth-service';
import { LoginPayload } from '../../types';

describe('authService', () => {
  describe('keys', () => {
    it('has correct profile key', () => {
      expect(authService.keys.profile).toEqual(['profile']);
    });
  });

  describe('login', () => {
    it('returns correct axios config for login', () => {
      const loginData: LoginPayload = {
        email: 'test@example.com',
        password: 'password123'
      };

      const result = authService.login(loginData);

      expect(result).toEqual({
        url: '/auth/login',
        method: 'POST',
        data: loginData
      });
    });

    it('passes through all login data', () => {
      const loginData: LoginPayload = {
        email: 'user@test.com',
        password: 'mypassword'
      };

      const result = authService.login(loginData);

      expect(result.data).toBe(loginData);
      expect(result.data.email).toBe('user@test.com');
      expect(result.data.password).toBe('mypassword');
    });
  });

  describe('logout', () => {
    it('returns correct axios config for logout', () => {
      const result = authService.logout();

      expect(result).toEqual({
        url: '/auth/logout',
        method: 'POST'
      });
    });

    it('does not include data in logout request', () => {
      const result = authService.logout();

      expect(result.data).toBeUndefined();
    });
  });

  describe('service structure', () => {
    it('has all required methods', () => {
      expect(typeof authService.login).toBe('function');
      expect(typeof authService.logout).toBe('function');
      expect(authService.keys).toBeDefined();
    });

    it('login method accepts LoginPayload parameter', () => {
      const loginData: LoginPayload = {
        email: 'test@example.com',
        password: 'password'
      };

      expect(() => authService.login(loginData)).not.toThrow();
    });

    it('logout method requires no parameters', () => {
      expect(() => authService.logout()).not.toThrow();
    });
  });
});
