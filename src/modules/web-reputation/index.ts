import { type BaseRequestOptions, HttpClient } from '../../client';

/**
 * The Web Reputation API is a service that allows you to check the reputation of a domain or email address.
 * This can help you protect your users from phishing, spam, malware, and other malicious activities.
 *
 * This client allows you to interact with the Web Reputation API.
 *
 * @see https://docs.gigadrive.network/products/web-reputation
 */
export class WebReputationAPIClient extends HttpClient {
  /**
   * @param baseURL The base URL of the API. Defaults to `https://api.gigadrive.network`.
   */
  constructor(baseURL: string = 'https://api.gigadrive.network') {
    super(baseURL);
  }

  /**
   * Retrieves the reputation of a domain.
   *
   * Required API Key permission: `web-reputation:domain:get`
   *
   * @param domain The domain to check
   * @param options The request options
   * @returns The reputation of the domain.
   * @see https://docs.gigadrive.network/products/web-reputation#get-domain-status
   */
  async getDomainReputation(domain: string, options: BaseRequestOptions = {}): Promise<DomainReputation> {
    const data = await this.request<DomainReputation[]>(`/web-reputation/domain`, 'GET', {
      query: {
        domain,
      },
      ...options,
    });

    return data[0];
  }

  /**
   * Retrieves the reputations of multiple domains.
   *
   * Required API Key permission: `web-reputation:domain:get`
   *
   * @param domain The domains to check
   * @param options The request options
   * @returns The reputations of the domains.
   * @see https://docs.gigadrive.network/products/web-reputation#get-domain-status
   */
  async getDomainReputations(domain: string[], options: BaseRequestOptions = {}): Promise<DomainReputation[]> {
    return await this.request<DomainReputation[]>(`/web-reputation/domain`, 'GET', {
      query: {
        domain,
      },
      ...options,
    });
  }

  /**
   * Retrieves the reputation of an email addresses.
   *
   * Required API Key permission: `web-reputation:email:get`
   *
   * @param email The email address to check
   * @param options The request options
   * @returns The reputation of the email address.
   * @see https://docs.gigadrive.network/products/web-reputation#get-email-domain-status
   */
  async getEmailReputation(email: string, options: BaseRequestOptions = {}): Promise<EmailReputation> {
    const data = await this.request<EmailReputation[]>(`/web-reputation/email`, 'GET', {
      query: {
        email,
      },
      ...options,
    });

    return data[0];
  }

  /**
   * Retrieves the reputations of multiple email addresses.
   *
   * Required API Key permission: `web-reputation:email:get`
   *
   * @param email The email addresses to check
   * @param options The request options
   * @returns The reputations of the email addresses.
   * @see https://docs.gigadrive.network/products/web-reputation#get-email-domain-status
   */
  async getEmailReputations(email: string[], options: BaseRequestOptions = {}): Promise<EmailReputation[]> {
    return await this.request<EmailReputation[]>(`/web-reputation/email`, 'GET', {
      query: {
        email,
      },
      ...options,
    });
  }
}

/**
 * Represents a domain reputation.
 */
export interface DomainReputation {
  /**
   * The domain name.
   */
  domain: string;

  /**
   * The domain status. Can be one of the following:
   *
   * - `good`: This is the default status for domaisn that are not in the database.
   * - `adult_content`: This status is assigned to domains that are known to host adult content that is not safe for work or for children.
   * - `phishing`: This status is assigned to domains that are known to host phishing sites. Phishing sites are sites that are designed to trick users into providing sensitive information such as passwords, credit card numbers, and social security numbers.
   * - `spam`: This status is assigned to domains that are known to host spam sites. Spam sites are sites that are designed to send spam emails. These sites are often used to send spam emails to users who have not opted in to receive emails from the site. This status is also assigned to domains that are used for sending spam emails to a large number of people.
   * - `disposable_email`: This status is assigned to domains that are known to host disposable email sites. Disposable email sites are sites that are designed to provide temporary email addresses that are used to sign up for services that require an email address.
   * - `relay_email`: This status is assigned to domains that are known to host relay email sites. Relay email sites are different from domains in the disposable_email category.
   * - `piracy`: This status is assigned to domains that are known to host piracy sites. Piracy sites are sites that are designed to host pirated content such as movies, music, and software.
   * - `malware`: This status is assigned to domains that are known to host malware sites. Malware sites are sites that are designed to host malware such as viruses, trojans, and spyware.
   *
   * @see https://docs.gigadrive.network/products/web-reputation#domain-statuses
   */
  status: 'good' | 'adult_content' | 'phishing' | 'spam' | 'disposable_email' | 'relay_email' | 'piracy' | 'malware';

  /**
   * Whether or not it is recommended to withhold content from this domain.
   */
  withholdingRecommended: boolean;

  /**
   * Whether or not an MX record is available for this domain. This is used to determine whether or not the domain is a valid email domain.
   */
  isMxRecordAvailable: boolean;
}

/**
 * Represents an email domain reputation.
 */
export interface EmailReputation {
  /**
   * The email address.
   */
  email: string;

  /**
   * Whether or not this email address is a role email address. Role email addresses are email addresses that are used for automated emails such as no-reply@, noreply@, and support@ or used for redirects such as info@, hello@, and contact@.
   */
  role: boolean;

  /**
   * The domain reputation.
   */
  domain: DomainReputation;

  /**
   * Specific validations for this email address.
   */
  validations: {
    /**
     * Whether or not the email address is valid.
     */
    valid: boolean;

    /**
     * The validators that were used to determine the validity of the email address.
     */
    validators: {
      /**
       * Whether or not the email address is valid according to the regex validator. This validator checks the email address against the common formats of email addresses.
       */
      regex: {
        valid: boolean;
      };

      /**
       * Whether or not the email address is valid according to the typo validator. This validator checks for typos in the email address.
       */
      typo: {
        valid: boolean;
      };

      /**
       * Whether or not the email address is valid according to the MX record validator. This validator checks if the domain of the email address has an MX record.
       */
      mx: {
        valid: boolean;
      };
    };
  };
}

export default new WebReputationAPIClient();
