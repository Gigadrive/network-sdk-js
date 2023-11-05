import { type BaseRequestOptions, HttpClient } from '../../client';

/**
 * Gigadrive Network's VAT API allows you to validate VAT IDs and retrieve current VAT rates for EU countries.
 *
 * This client allows you to interact with the VAT API.
 *
 * @see https://docs.gigadrive.network/products/vat-api
 */
export class VATAPIClient extends HttpClient {
  /**
   * @param baseURL The base URL of the API. Defaults to `https://api.gigadrive.network`.
   */
  constructor(baseURL: string = 'https://api.gigadrive.network') {
    super(baseURL);
  }

  /**
   * Retrieves information about a VAT ID.
   *
   * Required API Key permission: `vat:id:get`
   *
   * @param id The VAT ID to retrieve information about
   * @param options The request options
   * @returns The information about the VAT ID
   */
  async getIdInformation(id: string, options: BaseRequestOptions = {}): Promise<VATIDInformation> {
    const data = await this.request<VATIDInformation[]>(`/vat/id`, 'GET', {
      query: {
        id,
      },
      ...options,
    });

    return data[0];
  }

  /**
   * Retrieves information about multiple VAT IDs.
   *
   * Required API Key permission: `vat:id:get`
   *
   * @param id The VAT IDs to retrieve information about
   * @param options The request options
   * @returns The information about the VAT IDs
   */
  async getIdInformations(id: string[], options: BaseRequestOptions = {}): Promise<VATIDInformation[]> {
    return await this.request<VATIDInformation[]>(`/vat/id`, 'GET', {
      query: {
        id,
      },
      ...options,
    });
  }

  /**
   * Retrieves the current VAT rates for all EU countries.
   *
   * Required API Key permission: `vat:rates:get`
   *
   * @param options The request options
   * @returns The current VAT rates for all EU countries.
   */
  async getRates(options: BaseRequestOptions = {}): Promise<Record<string, VATCountryRate[]>> {
    return await this.request<Record<string, VATCountryRate[]>>('/vat/rates', 'GET', options);
  }

  /**
   * Retrieves the current VAT rates for a specific EU country.
   *
   * Required API Key permission: `vat:rates:get`
   *
   * @param country The two-letter country code of the country to retrieve the rates for.
   * @param options The request options
   * @returns The current VAT rates for the country.
   */
  async getRatesForCountry(country: string, options: BaseRequestOptions = {}): Promise<VATCountryRate[]> {
    return await this.request('/vat/rates', 'GET', {
      query: {
        country,
      },
      ...options,
    });
  }

  /**
   * Retrieves the currently effective VAT rate for a specific EU country.
   *
   * Required API Key permission: `vat:rates:get`
   *
   * @param country The two-letter country code of the country to retrieve the rate for.
   * @returns The currently effective VAT rate for the country.
   */
  async getCurrentRateForCountry(country: string): Promise<VATCountryRate> {
    const rates = await this.getRatesForCountry(country);

    return rates.reduce((prev, current) => {
      if (new Date(current.effective_from) > new Date(prev.effective_from)) {
        return current;
      }

      return prev;
    });
  }
}

/**
 * Represents information about the rate of VAT for a country.
 */
export interface VATCountryRate {
  /**
   * The date when the rate was effective from.
   */
  effective_from: string;

  /**
   * The rate of VAT for specific types of goods.
   */
  rates: Record<string, number>;

  /**
   * Some countries have VAT exceptions in certain areas. This field contains information about these exceptions.
   */
  exceptions: Array<{
    /**
     * The name of the area where the exception applies.
     */
    name: string;

    /**
     * The postal code of the area where the exception applies.
     */
    postcode: string;

    /**
     * The exception rate of VAT for specific types of goods.
     */
    [key: string]: string;
  }>;
}

/**
 * Represents information about a VAT ID.
 */
export interface VATIDInformation {
  /**
   * The full VAT ID, including the country code and the number.
   */
  id: string;

  /**
   * Whether the VAT ID is valid or not.
   */
  valid: boolean;

  /**
   * The country code of the VAT ID.
   */
  countryCode: string;

  /**
   * The number of the VAT ID.
   */
  vatNumber: string;

  /**
   * The date when the information was requested.
   */
  requestDate: string;

  /**
   * The name of the company associated with the VAT ID.
   * This data is only available for valid VAT IDs and companies in countries that support this feature. Otherwise, "---" will be returned.
   */
  name: string;

  /**
   * The address of the company associated with the VAT ID.
   * This data is only available for valid VAT IDs and companies in countries that support this feature. Otherwise, "---" will be returned.
   */
  address: string;

  /**
   * The current rates of VAT for the country of the VAT ID.
   */
  currentRate: Record<string, number>;
}

export default new VATAPIClient();
