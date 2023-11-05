import { mockFetch, mockFetchError } from '../../tests/mock';
import fastcache from './document';

describe('FastCache Document Client', () => {
  interface ValueType {
    foo: string;
    bar: number;
  }

  const value = {
    foo: 'foo',
    bar: 123,
  };

  it('should be able to get a FastCache item', async () => {
    mockFetch({
      key: 'key',
      value: JSON.stringify(value),
      expiration: 1234567890,
      byteSize: 6,
    });

    const item: ValueType | null = await fastcache.get<ValueType>('key');

    expect(item).not.toBeNull();

    expect(item).toStrictEqual(value);
  });

  it('should return null if the item does not exist', async () => {
    mockFetchError('Not found');

    const item = await fastcache.get('key');

    expect(item).toBeNull();
  });

  it('should be able to set a FastCache item', async () => {
    mockFetch({
      key: 'key',
      value: 'value',
      expiration: 1234567890,
      byteSize: 6,
    });

    await fastcache.set('key', value, { expiration: 1234567890 });

    // expect no error
    expect(true).toBe(true);
  });

  it('should be able to delete a FastCache item', async () => {
    mockFetch();

    await fastcache.delete('key');
  });
});
