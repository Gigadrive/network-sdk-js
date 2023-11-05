import fastCache, { type FastCacheSetRequestOptions, type FastCacheClient } from '.';
import { type BaseRequestOptions } from '../../client';

/**
 * FastCache is a key-value store that is optimized for speed and low latency by being hosted at the edge.
 *
 * This client allows you to interact with the FastCache API.
 * The difference between this client and the default {@link FastCacheClient} is that this client automatically serializes and deserializes values as objects using JSON.
 *
 * @see https://docs.gigadrive.network/products/fastcache
 */
export class FastCacheDocumentClient {
  private readonly fastCacheClient: FastCacheClient;

  /**
   * @param baseURL The base URL of the API. Defaults to `https://api.gigadrive.network`.
   */
  constructor(fastCacheClient: FastCacheClient = fastCache) {
    this.fastCacheClient = fastCacheClient;
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
  async get<T>(key: string, options: BaseRequestOptions = {}): Promise<T | null> {
    const item = await this.fastCacheClient.get(key, options);
    if (item === null) return null;

    return JSON.parse(item.value) as T;
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
  async set<T>(key: string, value: T, options: FastCacheSetRequestOptions = {}): Promise<void> {
    await this.fastCacheClient.set(key, JSON.stringify(value), options);
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
    await this.fastCacheClient.delete(key, options);
  }
}

export default new FastCacheDocumentClient();
