describe('environment', () => {
  it('has baseUrl property', () => {
    const { environment } = require('../environment');
    expect(environment).toHaveProperty('baseUrl');
  });

  it('baseUrl is a string', () => {
    const { environment } = require('../environment');
    expect(typeof environment.baseUrl).toBe('string');
  });

  it('has correct default baseUrl structure', () => {
    const { environment } = require('../environment');
    expect(environment.baseUrl).toContain('http');
  });
});
