import axios, { type AxiosInstance } from 'axios';

/**
 * FastCache is a key-value store that is optimized for speed and low latency by being hosted at the edge.
 * This client allows you to interact with the FastCache API.
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
   * @returns The FastCache item
   */
  async get(key: string): Promise<FastCacheItem> {
    const { data } = await this.axios.get(`/fastcache?key=${key}`);

    return data;
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
