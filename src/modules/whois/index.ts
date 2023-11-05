import { type BaseRequestOptions, HttpClient } from '../../client';

/**
 * The Whois API is used to get information about a domain, such as the owner, the registrar, the nameservers, and more.
 *
 * This client allows you to interact with the Whois API.
 *
 * @see https://docs.gigadrive.network/products/whois-api
 */
export class WhoisAPIClient extends HttpClient {
  /**
   * @param baseURL The base URL of the API. Defaults to `https://api.gigadrive.network`.
   */
  constructor(baseURL: string = 'https://api.gigadrive.network') {
    super(baseURL);
  }

  /**
   * Retrieve structured information about a domain from its WHOIS record.
   *
   * Required API Key permissions: `whois:domain:get`
   *
   * @param domain The domain to get information about.
   * @param options The request options.
   * @returns The domain information.
   */
  async getDomainInformation(domain: string, options: BaseRequestOptions = {}): Promise<DomainInformation> {
    return await this.request('/whois/domain', 'GET', { query: { domain }, ...options });
  }

  /**
   * Retrieve raw information about a domain from its WHOIS record.
   *
   * Required API Key permissions: `whois:domain:get`
   *
   * @param domain The domain to get information about.
   * @param options The request options.
   * @returns The raw domain information.
   */
  async getRawDomainInformation(domain: string, options: BaseRequestOptions = {}): Promise<string> {
    return await this.request('/whois/domain', 'GET', { query: { domain, raw: true }, ...options });
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

export default new WhoisAPIClient();
