export class HttpClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected async request<T>(path: string, method: HttpMethod, options: BaseRequestOptions = {}): Promise<T> {
    if (options.query != null) {
      const query = this.parseQuery(options.query);
      const delimiter = path.includes('?') ? '&' : '?';
      path += delimiter + query.toString();
    }

    const url = `${this.baseUrl}${path}`;
    const headers = new Headers(options.headers);

    const apiKey = options.apiKey ?? this.fetchApiKey();

    if (apiKey != null) {
      headers.append('Authorization', `Bearer ${apiKey}`);
    }

    const response = await fetch(url, { ...options, method, headers });
    if (!response.ok) {
      await this.handleError(response);
    }

    if (response.headers?.get('Content-Type')?.startsWith('application/json') === true) {
      return await response.json();
    }

    return (await response.text()) as unknown as T;
  }

  protected async requestNullable<T>(
    path: string,
    method: HttpMethod,
    options: BaseRequestOptions = {}
  ): Promise<T | null> {
    try {
      return await this.request<T>(path, method, options);
    } catch (e) {
      if (
        (e.response != null && e.response.status === 404) ||
        (e.response != null && typeof e.response.status === 'undefined' && e.response.ok === false) // response status is not available in tests
      ) {
        return null;
      }

      throw e;
    }
  }

  protected async post<T>(path: string, data: unknown, options: BaseRequestOptions = {}): Promise<T> {
    const headers = new Headers(options.headers);
    headers.append('Content-Type', 'application/json');

    options.headers = headers;

    return await this.request<T>(path, 'POST', { ...options, body: JSON.stringify(data) });
  }

  protected async put<T>(path: string, data: unknown, options: BaseRequestOptions = {}): Promise<T> {
    const headers = new Headers(options.headers);
    headers.append('Content-Type', 'application/json');

    options.headers = headers;

    return await this.request<T>(path, 'PUT', { ...options, body: JSON.stringify(data) });
  }

  protected async patch<T>(path: string, data: unknown, options: BaseRequestOptions = {}): Promise<T> {
    const headers = new Headers(options.headers);
    headers.append('Content-Type', 'application/json');

    options.headers = headers;

    return await this.request<T>(path, 'PATCH', { ...options, body: JSON.stringify(data) });
  }

  protected async delete(path: string, options: BaseRequestOptions = {}): Promise<void> {
    await this.request(path, 'DELETE', { ...options });
  }

  private async handleError(response: Response): Promise<void> {
    const responseText = await response.text();

    let errorMessage = `Request failed with status code ${response.status} and response text '${response.statusText}'`;

    // check if response text is json with valid error structure
    try {
      const responseObject = JSON.parse(responseText);
      if (
        typeof responseObject === 'object' &&
        // Object.prototype.hasOwnProperty.call(responseObject, 'errors') === true &&
        responseObject.errors != null &&
        Array.isArray(responseObject.errors) &&
        responseObject.errors.length > 0
      ) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        errorMessage = `Encountered errors: '${responseObject.errors.map((error) => error.message).join("', '")}'`;
      }
    } catch (e) {}

    // if not, throw generic error
    throw new HttpClientError(errorMessage, response);
  }

  private parseQuery(query: QueryParameters): URLSearchParams {
    if (typeof query === 'string') {
      return new URLSearchParams(query);
    }

    if (Array.isArray(query)) {
      return new URLSearchParams(query);
    }

    if (query instanceof URLSearchParams) {
      return query;
    }

    if (typeof query === 'object' && query != null) {
      const convertedParams: string[][] = [];

      for (const [key, value] of Object.entries(query)) {
        if (value == null) {
          continue;
        }

        if (Array.isArray(value)) {
          for (const item of value) {
            convertedParams.push([key, item.toString()]);
          }

          continue;
        }

        convertedParams.push([key, value.toString()]);
      }

      return new URLSearchParams(convertedParams);
    }

    return new URLSearchParams();
  }

  protected fetchApiKey(): string | null {
    // check if localStorage exists
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('gigadriveApiKey') ?? null;
    }

    // check if process.env exists
    if (typeof process !== 'undefined' && process.env != null) {
      return process.env.GIGADRIVE_API_KEY ?? null;
    }

    return null;
  }
}

export class HttpClientError extends Error {
  public readonly response: Response;

  constructor(message: string, response: Response) {
    super(message);
    this.response = response;
  }
}

export interface BaseRequestOptions extends Omit<RequestInit, 'method'> {
  apiKey?: string;
  query?: QueryParameters;
}

export type QueryParameters =
  | string
  | string[][]
  | Record<string, string | number | boolean | null | undefined | Array<string | number | boolean>>
  | URLSearchParams
  | undefined;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
