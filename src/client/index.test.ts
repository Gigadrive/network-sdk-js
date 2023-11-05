import { URLSearchParams } from 'url';
import { HttpClient } from '.';
import { mockFetch, mockFetchError } from '../tests/mock';

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

  it('should be able to do a nullable GET request', async () => {
    interface DataType {
      foo: string;
    }

    mockFetchError('Not found');

    // @ts-expect-error - ignore method being private
    const data = await http.requestNullable<DataType>('/test', 'GET');

    expect(data).toBeNull();
  });

  it('should be able to do a POST request', async () => {
    interface DataType {
      foo: string;
    }

    mockFetch({
      foo: 'bar',
    });

    // @ts-expect-error - ignore method being private
    const data = await http.post<DataType>('/test', {
      foo: 'bar',
    });

    expect(data).toEqual({
      foo: 'bar',
    });
  });

  it('should be able to do a PUT request', async () => {
    interface DataType {
      foo: string;
    }

    mockFetch({
      foo: 'bar',
    });

    // @ts-expect-error - ignore method being private
    const data = await http.put<DataType>('/test', {
      foo: 'bar',
    });

    expect(data).toEqual({
      foo: 'bar',
    });
  });

  it('should be able to do a PATCH request', async () => {
    interface DataType {
      foo: string;
    }

    mockFetch({
      foo: 'bar',
    });

    // @ts-expect-error - ignore method being private
    const data = await http.patch<DataType>('/test', {
      foo: 'bar',
    });

    expect(data).toEqual({
      foo: 'bar',
    });
  });

  it('should be able to do a DELETE request', async () => {
    mockFetch();

    // @ts-expect-error - ignore method being private
    await http.delete('/test');

    // expect no error
    expect(true).toBe(true);
  });

  it('should be able to handle a standardized error', async () => {
    mockFetchError('Bad request');

    http
      // @ts-expect-error - ignore method being private
      .post('/test', {
        foo: 'bar',
      })
      .then(() => {
        // eslint-disable-next-line no-console
        console.warn('Standardized error test did not fail as expected.');
        expect(true).toBe(false);
      })
      .catch((e) => {
        expect(e.message).toBe("Encountered errors: 'Bad request'");
      });
  });

  it('should be able to handle a non-standardized error', async () => {
    mockFetch('Internal server error', false, 500, 'Internal server error');

    // make sure handleError will be called
    // @ts-expect-error - ignore method being private
    const spy = jest.spyOn(http, 'handleError');

    http
      // @ts-expect-error - ignore method being private
      .post('/test', {
        foo: 'bar',
      })
      .then(() => {
        // eslint-disable-next-line no-console
        console.warn('Non-standardized error test did not fail as expected.');
        expect(true).toBe(false);
      })
      .catch((e) => {
        expect(e.message).toBe("Request failed with status code 500 and response text 'Internal server error'");

        expect(spy).toHaveBeenCalledTimes(1);
      });
  });

  it('should be able to parse query parameters properly', async () => {
    // @ts-expect-error - ignore method being private
    expect(http.parseQuery({ foo: 'bar' }).toString()).toEqual('foo=bar');

    // @ts-expect-error - ignore method being private
    expect(http.parseQuery({ foo: ['bar', 'baz'] }).toString()).toEqual('foo=bar&foo=baz');

    // @ts-expect-error - ignore method being private
    expect(http.parseQuery({ foo: 'bar', baz: 'qux' }).toString()).toEqual('foo=bar&baz=qux');

    // @ts-expect-error - ignore method being private
    expect(http.parseQuery({ foo: 123 }).toString()).toEqual('foo=123');

    // @ts-expect-error - ignore method being private
    expect(http.parseQuery(new URLSearchParams('foo=bar')).toString()).toEqual('foo=bar');
  });
});
