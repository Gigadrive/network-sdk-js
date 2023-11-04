export class HttpClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected async request<T>(path: string, method: HttpMethod, options: BaseRequestOptions = {}): Promise<T> {
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

    return (await response.json()) as T;
  }

  protected async requestNullable<T>(
    path: string,
    method: HttpMethod,
    options: BaseRequestOptions = {}
  ): Promise<T | null> {
    try {
      return await this.request<T>(path, method, options);
    } catch (e) {
      const notFoundTexts = [
        'Not Found',
        'Not found',
        'not found',
        'not Found',
        'The requested resource was not found.',
      ] as const;

      if (notFoundTexts.some((text) => e.message === "Encountered errors: '" + text + "'")) {
        return null;
      }

      throw e;
    }
  }

  async handleError(response: Response): Promise<void> {
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
    throw new Error(errorMessage);
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

export interface BaseRequestOptions extends Omit<RequestInit, 'method'> {
  apiKey?: string;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
