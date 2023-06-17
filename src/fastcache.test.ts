import FastCache from './fastcache';
import MockAdapter from 'axios-mock-adapter';

describe('FastCache', () => {
  const fastcache: FastCache = new FastCache('API_KEY');
  const mock = new MockAdapter(fastcache.axios);

  it('should be able to get a FastCache item', async () => {
    mock.onGet('/fastcache?key=key').reply(200, {
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
    mock.onGet('/fastcache?key=key').reply(404);

    const item = await fastcache.get('key');

    expect(item).toBeNull();
  });

  it('should be able to set a FastCache item', async () => {
    mock.onPost('/fastcache').reply(200, {
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
    mock.onDelete('/fastcache?key=key').reply(204);

    await fastcache.delete('key');
  });
});
