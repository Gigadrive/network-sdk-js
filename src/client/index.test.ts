import { HttpClient } from '.';
import { mockFetch } from '../tests/mock';

describe('HTTP Client', () => {
  const http = new HttpClient('https://example.com');

  it('should be able to do a GET request', async () => {
    interface DataType {
      foo: string;
    }

    mockFetch({
      foo: 'bar',
    });

    // @ts-expect-error - ignore method being private
    const data = await http.request<DataType>('/test', 'GET');

    expect(data).toEqual({
      foo: 'bar',
    });
  });

  it('should be able to do a nullable GET request', () => {
    // TODO
    expect(true).toBe(true);
  });

  it('should be able to do a POST request', () => {
    // TODO
    expect(true).toBe(true);
  });

  it('should be able to do a PUT request', () => {
    // TODO
    expect(true).toBe(true);
  });

  it('should be able to do a PATCH request', () => {
    // TODO
    expect(true).toBe(true);
  });

  it('should be able to do a DELETE request', () => {
    // TODO
    expect(true).toBe(true);
  });

  it('should be able to handle a standardized error', () => {
    // TODO
    expect(true).toBe(true);
  });

  it('should be able to handle a non-standardized error', () => {
    // TODO
    expect(true).toBe(true);
  });
});
