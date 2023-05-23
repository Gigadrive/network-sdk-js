import axios, { type AxiosInstance } from 'axios';

/**
 * The Whois API is used to get information about a domain, such as the owner, the registrar, the nameservers, and more.
 *
 * This client allows you to interact with the Whois API.
 *
 * @see https://docs.gigadrive.network/products/whois-api
 */
export default class WhoisAPI {
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
    });
  }

  /**
   * Retrieve structured information about a domain from its WHOIS record.
   *
   * Required API Key permissions: `whois:domain:get`
   *
   * @param domain The domain to get information about.
   * @returns The domain information.
   */
  async getDomainInformation(domain: string): Promise<DomainInformation> {
    const response = await this.axios.get('/whois/domain', { params: { domain } });

    return response.data;
  }

  /**
   * Retrieve raw information about a domain from its WHOIS record.
   *
   * Required API Key permissions: `whois:domain:get`
   *
   * @param domain The domain to get information about.
   * @returns The raw domain information.
   */
  async getRawDomainInformation(domain: string): Promise<string> {
    const response = await this.axios.get('/whois/domain', { params: { domain, raw: true } });

    return response.data;
  }
}

export interface DomainInformation {
  domain: {
    name: string;
    id?: string;
    status?: string[] | null;
    created: string | null;
    updated: string | null;
    expires: string | null;
  };
  registrar: {
    name: string;
    url: string;
    whoisServer: string;
    email: string;
    phone: string;
    ianaId: number;
  };
  registrant: DomainWhoisAddress;
  admin: DomainWhoisAddress;
  tech: DomainWhoisAddress;
  billing: DomainWhoisAddress;
  nameservers: string[] | null;
  dnssec: string | null;
}

export interface DomainWhoisAddress {
  name: string | null;
  organization: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  phone: string | null;
  phoneExt: string | null;
  fax: string | null;
  faxExt: string | null;
  email: string | null;
}
