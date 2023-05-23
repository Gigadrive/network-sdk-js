import MockAdapter from 'axios-mock-adapter';
import WhoisAPI from './whois';

describe('Whois API', () => {
  const whois: WhoisAPI = new WhoisAPI('API_KEY');
  const mock = new MockAdapter(whois.axios);

  it('should be able to get domain information', async () => {
    mock.onGet('/whois/domain', { params: { domain: 'gigadrivegroup.com' } }).reply(200, {
      domain: {
        name: 'gigadrive.network',
        id: '97291d85ce3e4010b12489421505c3ca-DONUTS',
        status: ['clientTransferProhibited https://icann.org/epp#clientTransferProhibited'],
        created: '2021-04-07T16:16:04.36Z',
        updated: '2023-03-14T09:35:36.74Z',
        expires: '2024-04-07T16:16:04.36Z',
      },
      registrar: {
        name: 'NAMECHEAP INC',
        url: 'http://www.namecheap.com',
        whoisServer: 'whois.namecheap.com',
        email: 'abuse@namecheap.com',
        phone: '+1.9854014545',
        ianaId: '1068',
      },
      registrant: {
        name: 'Redacted for Privacy',
        organization: 'Privacy service provided by Withheld for Privacy ehf',
        street: 'Kalkofnsvegur 2',
        city: 'Reykjavik',
        state: 'Capital Region',
        postalCode: '101',
        country: 'IS',
        phone: '+354.4212434',
        phoneExt: '',
        fax: '',
        faxExt: '',
        email: '793d9c22627e4ff2a8e1f9f953c12459.protect@withheldforprivacy.com',
      },
      admin: {
        name: 'Redacted for Privacy',
        organization: 'Privacy service provided by Withheld for Privacy ehf',
        street: 'Kalkofnsvegur 2',
        city: 'Reykjavik',
        state: 'Capital Region',
        postalCode: '101',
        country: 'IS',
        phone: '+354.4212434',
        phoneExt: '',
        fax: '',
        faxExt: '',
        email: '793d9c22627e4ff2a8e1f9f953c12459.protect@withheldforprivacy.com',
      },
      tech: {
        name: 'Redacted for Privacy',
        organization: 'Privacy service provided by Withheld for Privacy ehf',
        street: 'Kalkofnsvegur 2',
        city: 'Reykjavik',
        state: 'Capital Region',
        postalCode: '101',
        country: 'IS',
        phone: '+354.4212434',
        phoneExt: '',
        fax: '',
        faxExt: '',
        email: '793d9c22627e4ff2a8e1f9f953c12459.protect@withheldforprivacy.com',
      },
      billing: {
        name: null,
        organization: null,
        street: null,
        city: null,
        state: null,
        postalCode: null,
        country: null,
        phone: null,
        phoneExt: null,
        fax: null,
        faxExt: null,
        email: null,
      },
      nameservers: ['rafe.ns.cloudflare.com', 'rocky.ns.cloudflare.com'],
      dnssec: 'unsigned',
    });

    const domainInformation = await whois.getDomainInformation('gigadrivegroup.com');

    expect(domainInformation.domain.name).toBe('gigadrive.network');
    expect(domainInformation.domain.id).toBe('97291d85ce3e4010b12489421505c3ca-DONUTS');
    expect(domainInformation.domain.status).toStrictEqual([
      'clientTransferProhibited https://icann.org/epp#clientTransferProhibited',
    ]);
    expect(domainInformation.domain.created).toBe('2021-04-07T16:16:04.36Z');
    expect(domainInformation.domain.updated).toBe('2023-03-14T09:35:36.74Z');
    expect(domainInformation.domain.expires).toBe('2024-04-07T16:16:04.36Z');

    expect(domainInformation.registrar.name).toBe('NAMECHEAP INC');
    expect(domainInformation.registrar.url).toBe('http://www.namecheap.com');
    expect(domainInformation.registrar.whoisServer).toBe('whois.namecheap.com');
    expect(domainInformation.registrar.email).toBe('abuse@namecheap.com');
    expect(domainInformation.registrar.phone).toBe('+1.9854014545');
    expect(domainInformation.registrar.ianaId).toBe('1068');

    expect(domainInformation.registrant.name).toBe('Redacted for Privacy');
    expect(domainInformation.registrant.organization).toBe('Privacy service provided by Withheld for Privacy ehf');
    expect(domainInformation.registrant.street).toBe('Kalkofnsvegur 2');
    expect(domainInformation.registrant.city).toBe('Reykjavik');
    expect(domainInformation.registrant.state).toBe('Capital Region');
    expect(domainInformation.registrant.postalCode).toBe('101');
    expect(domainInformation.registrant.country).toBe('IS');
    expect(domainInformation.registrant.phone).toBe('+354.4212434');
    expect(domainInformation.registrant.phoneExt).toBe('');
    expect(domainInformation.registrant.fax).toBe('');
    expect(domainInformation.registrant.faxExt).toBe('');
    expect(domainInformation.registrant.email).toBe('793d9c22627e4ff2a8e1f9f953c12459.protect@withheldforprivacy.com');

    expect(domainInformation.admin.name).toBe('Redacted for Privacy');
    expect(domainInformation.admin.organization).toBe('Privacy service provided by Withheld for Privacy ehf');
    expect(domainInformation.admin.street).toBe('Kalkofnsvegur 2');
    expect(domainInformation.admin.city).toBe('Reykjavik');
    expect(domainInformation.admin.state).toBe('Capital Region');
    expect(domainInformation.admin.postalCode).toBe('101');
    expect(domainInformation.admin.country).toBe('IS');
    expect(domainInformation.admin.phone).toBe('+354.4212434');
    expect(domainInformation.admin.phoneExt).toBe('');
    expect(domainInformation.admin.fax).toBe('');
    expect(domainInformation.admin.faxExt).toBe('');
    expect(domainInformation.admin.email).toBe('793d9c22627e4ff2a8e1f9f953c12459.protect@withheldforprivacy.com');

    expect(domainInformation.tech.name).toBe('Redacted for Privacy');
    expect(domainInformation.tech.organization).toBe('Privacy service provided by Withheld for Privacy ehf');
    expect(domainInformation.tech.street).toBe('Kalkofnsvegur 2');
    expect(domainInformation.tech.city).toBe('Reykjavik');
    expect(domainInformation.tech.state).toBe('Capital Region');
    expect(domainInformation.tech.postalCode).toBe('101');
    expect(domainInformation.tech.country).toBe('IS');
    expect(domainInformation.tech.phone).toBe('+354.4212434');
    expect(domainInformation.tech.phoneExt).toBe('');
    expect(domainInformation.tech.fax).toBe('');
    expect(domainInformation.tech.faxExt).toBe('');
    expect(domainInformation.tech.email).toBe('793d9c22627e4ff2a8e1f9f953c12459.protect@withheldforprivacy.com');

    expect(domainInformation.billing.name).toBeNull();
    expect(domainInformation.billing.organization).toBeNull();
    expect(domainInformation.billing.street).toBeNull();
    expect(domainInformation.billing.city).toBeNull();
    expect(domainInformation.billing.state).toBeNull();
    expect(domainInformation.billing.postalCode).toBeNull();
    expect(domainInformation.billing.country).toBeNull();
    expect(domainInformation.billing.phone).toBeNull();
    expect(domainInformation.billing.phoneExt).toBeNull();
    expect(domainInformation.billing.fax).toBeNull();
    expect(domainInformation.billing.faxExt).toBeNull();
    expect(domainInformation.billing.email).toBeNull();

    expect(domainInformation.nameservers).toStrictEqual(['rafe.ns.cloudflare.com', 'rocky.ns.cloudflare.com']);
    expect(domainInformation.dnssec).toBe('unsigned');
  });
});
