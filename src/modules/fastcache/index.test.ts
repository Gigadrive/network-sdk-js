import { mockFetch, mockFetchError } from '../../tests/mock';
import fastcache from './index';

describe('FastCache', () => {
  it('should be able to get a FastCache item', async () => {
    mockFetch({
      key: 'key',
      value: 'value',
      expiration: 1234567890,
      byteSize: 6,
    });

    const item = await fastcache.get('key');

    expect(item).not.toBeNull();

    expect(item?.key).toBe('key');
    expect(item?.value).toBe('value');
    expect(item?.expiration).toBe(1234567890);
    expect(item?.byteSize).toBe(6);
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

    const item = await fastcache.set('key', 'value', 1234567890);

    expect(item.key).toBe('key');
    expect(item.value).toBe('value');
    expect(item.expiration).toBe(1234567890);
    expect(item.byteSize).toBe(6);
  });

  it('should be able to delete a FastCache item', async () => {
    mockFetch();

    await fastcache.delete('key');
  });
});
