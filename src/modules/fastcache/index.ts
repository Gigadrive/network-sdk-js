import { type BaseRequestOptions, HttpClient } from '../../client';

/**
 * FastCache is a key-value store that is optimized for speed and low latency by being hosted at the edge.
 *
 * This client allows you to interact with the FastCache API.
 *
 * @see https://docs.gigadrive.network/products/fastcache
 */
export class FastCacheClient extends HttpClient {
  /**
   * @param baseURL The base URL of the API. Defaults to `https://api.gigadrive.network`.
   */
  constructor(baseURL: string = 'https://api.gigadrive.network') {
    super(baseURL);
  }

  /**
   * Retrieves a FastCache item by key.
   *
   * Required API Key permission: `fastcache:read`
   *
   * @param key The key of the FastCache item
   * @param options The request options
   * @returns The FastCache item. Returns null if the item does not exist.
   * @see https://docs.gigadrive.network/products/fastcache#retrieve-an-item
   */
  async get(key: string, options: BaseRequestOptions = {}): Promise<FastCacheItem | null> {
    return await this.requestNullable(`/fastcache?key=${key}`, 'GET', options);
  }

  /**
   * Saves an item to FastCache.
   *
   * Required API Key permission: `fastcache:write`
   *
   * @param key The key of the FastCache item
   * @param value The value of the FastCache item
   * @param options The request options
   * @param options.expiration The unix timestamp when the item should expire. Set to null to never expire.
   * @returns The FastCache item
   * @see https://docs.gigadrive.network/products/fastcache#create-an-item
   */
  async set(key: string, value: string, options: FastCacheSetRequestOptions = {}): Promise<FastCacheItem> {
    return await this.post('/fastcache', { key, value, expiration: options.expiration }, options);
  }

  /**
   * Deletes a FastCache item by key.
   *
   * Required API Key permission: `fastcache:delete`
   *
   * @param key The key of the FastCache item
   * @param options The request options
   * @see https://docs.gigadrive.network/products/fastcache#delete-an-item
   */
  async delete(key: string, options: BaseRequestOptions = {}): Promise<void> {
    await super.delete(`/fastcache?key=${key}`, options);
  }
}

export default new FastCacheClient();

export interface FastCacheSetRequestOptions extends BaseRequestOptions {
  /**
   * The unix timestamp when the item should expire. Set to null to never expire.
   */
  expiration?: number;
}

/**
 * Represents an item saved to FastCache.
 */
export interface FastCacheItem {
  /**
   * The main identifier of the item.
   */
  key: string;

  /**
   * The value of the item.
   */
  value: string;

  /**
   * The unix timestamp when the item expires.
   */
  expiration: number | null;

  /**
   * The size of the item in bytes.
   */
  byteSize: number;
}
