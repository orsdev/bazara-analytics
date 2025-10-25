import { buildQueryParams } from '../build-query-params';

describe('build-query-params', () => {
  describe('buildQueryParams', () => {
    it('builds query string from simple object', () => {
      const params = { name: 'John', age: '30' };
      const result = buildQueryParams(params);
      expect(result).toBe('name=John&age=30');
    });

    it('returns empty string for empty object', () => {
      const result = buildQueryParams({});
      expect(result).toBe('');
    });

    it('returns empty string when no params provided', () => {
      const result = buildQueryParams();
      expect(result).toBe('');
    });

    it('filters out null values', () => {
      const params = { name: 'John', age: null };
      const result = buildQueryParams(params);
      expect(result).toBe('name=John');
      expect(result).not.toContain('age');
    });

    it('filters out undefined values', () => {
      const params = { name: 'John', age: undefined };
      const result = buildQueryParams(params);
      expect(result).toBe('name=John');
      expect(result).not.toContain('age');
    });

    it('filters out empty string values', () => {
      const params = { name: 'John', age: '' };
      const result = buildQueryParams(params);
      expect(result).toBe('name=John');
      expect(result).not.toContain('age');
    });

    it('encodes special characters', () => {
      const params = { query: 'hello world', email: 'test@example.com' };
      const result = buildQueryParams(params);
      expect(result).toContain('hello+world');
      expect(result).toContain('test%40example.com');
    });

    it('handles multiple parameters', () => {
      const params = {
        search: 'test',
        page: '1',
        limit: '10',
        sort: 'desc'
      };
      const result = buildQueryParams(params);
      expect(result).toContain('search=test');
      expect(result).toContain('page=1');
      expect(result).toContain('limit=10');
      expect(result).toContain('sort=desc');
    });

    it('handles numeric string values', () => {
      const params = { id: '123', count: '456' };
      const result = buildQueryParams(params);
      expect(result).toBe('id=123&count=456');
    });

    it('handles boolean-like string values', () => {
      const params = { active: 'true', deleted: 'false' };
      const result = buildQueryParams(params);
      expect(result).toBe('active=true&deleted=false');
    });

    it('handles mixed valid and invalid values', () => {
      const params = {
        name: 'John',
        age: null,
        city: 'NYC',
        country: undefined,
        zip: ''
      };
      const result = buildQueryParams(params);
      expect(result).toBe('name=John&city=NYC');
    });

    it('handles single parameter', () => {
      const params = { token: 'abc123' };
      const result = buildQueryParams(params);
      expect(result).toBe('token=abc123');
    });

    it('handles parameters with special URL characters', () => {
      const params = { url: 'https://example.com?test=1' };
      const result = buildQueryParams(params);
      expect(result).toContain('url=');
      expect(decodeURIComponent(result)).toContain(
        'https://example.com?test=1'
      );
    });

    it('handles parameters with spaces', () => {
      const params = { message: 'Hello World' };
      const result = buildQueryParams(params);
      expect(result).toContain('message=Hello');
    });

    it('handles parameters with ampersands', () => {
      const params = { text: 'A&B' };
      const result = buildQueryParams(params);
      expect(result).toContain('text=A%26B');
    });

    it('handles zero as valid value', () => {
      const params = { count: '0' };
      const result = buildQueryParams(params);
      expect(result).toBe('count=0');
    });
  });
});
