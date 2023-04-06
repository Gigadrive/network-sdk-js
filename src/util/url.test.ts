import { buildQueryParamString } from './url';

describe('URL Utilities', () => {
  it('should be able to build a URL with a single query parameter', () => {
    const queryParamString = buildQueryParamString({ key: 'value' });

    expect(queryParamString).toBe('key=value');
  });

  it('should be able to build a URL with multiple query parameters', () => {
    const queryParamString = buildQueryParamString({ key: 'value', key2: 'value2' });

    expect(queryParamString).toBe('key=value&key2=value2');
  });

  it('should be able to build a URL with an array query parameter', () => {
    const queryParamString = buildQueryParamString({ key: ['value', 'value2'] });

    expect(queryParamString).toBe('key=value&key=value2');
  });
});
