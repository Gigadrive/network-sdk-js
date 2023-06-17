import axios, { type AxiosInstance } from 'axios';

/**
 * FastCache is a key-value store that is optimized for speed and low latency by being hosted at the edge.
 *
 * This client allows you to interact with the FastCache API.
 *
 * @see https://docs.gigadrive.network/products/fastcache
 */
export default class FastCache {
  public readonly apiKey: string;
  public readonly baseURL: string;
  public readonly axios: AxiosInstance;

  /**
   * @param apiKey The API key to use for authentication.
   * @param baseURL The base URL of the API. Defaults to `https://api.gigadrive.network`.
   */
  constructor(apiKey: string, baseURL: string = 'https://api.gigadrive.network') {
    this.apiKey = apiKey;
    this.baseURL = baseURL;

    this.axios = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  /**
   * Retrieves a FastCache item by key.
   *
   * Required API Key permission: `fastcache:read`
   *
   * @param key The key of the FastCache item
   * @returns The FastCache item. Returns null if the item does not exist.
   * @see https://docs.gigadrive.network/products/fastcache#retrieve-an-item
   */
  async get(key: string): Promise<FastCacheItem | null> {
    try {
      const { data } = await this.axios.get(`/fastcache?key=${key}`);

      return data;
    } catch (e) {
      if (e.response.status === 404) {
        return null;
      }

      throw e;
    }
  }

  /**
   * Saves an item to FastCache.
   *
   * Required API Key permission: `fastcache:write`
   *
   * @param key The key of the FastCache item
   * @param value The value of the FastCache item
   * @param expiration The unix timestamp when the item should expire. Set to null to never expire.
   * @returns The FastCache item
   * @see https://docs.gigadrive.network/products/fastcache#create-an-item
   */
  async set(key: string, value: string, expiration: number | null = null): Promise<FastCacheItem> {
    const { data } = await this.axios.post('/fastcache', {
      key,
      value,
      expiration,
    });

    return data;
  }

  /**
   * Deletes a FastCache item by key.
   *
   * Required API Key permission: `fastcache:delete`
   *
   * @param key The key of the FastCache item
   * @see https://docs.gigadrive.network/products/fastcache#delete-an-item
   */
  async delete(key: string): Promise<void> {
    await this.axios.delete(`/fastcache?key=${key}`);
  }
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
