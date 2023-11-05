import { mockFetch } from '../../tests/mock';
import vat from './index';

describe('VAT API', () => {
  it('should retrieve information about a VAT ID', async () => {
    mockFetch([
      {
        id: 'LU26375245',
        valid: true,
        countryCode: 'LU',
        vatNumber: '26375245',
        requestDate: '2023-05-23+02:00',
        name: 'AMAZON EUROPE CORE S.A R.L.',
        address: '38, AVENUE JOHN F. KENNEDY, L-1855  LUXEMBOURG',
        currentRate: {
          super_reduced: 3,
          reduced1: 6,
          reduced2: 12,
          standard: 15,
          parking: 12,
        },
      },
    ]);

    const data = await vat.getIdInformation('LU26375245');

    expect(data.id).toBe('LU26375245');
    expect(data.valid).toBe(true);
    expect(data.countryCode).toBe('LU');
    expect(data.vatNumber).toBe('26375245');
    expect(data.requestDate).toBe('2023-05-23+02:00');
    expect(data.name).toBe('AMAZON EUROPE CORE S.A R.L.');
    expect(data.address).toBe('38, AVENUE JOHN F. KENNEDY, L-1855  LUXEMBOURG');
    expect(data.currentRate.super_reduced).toBe(3);
    expect(data.currentRate.reduced1).toBe(6);
    expect(data.currentRate.reduced2).toBe(12);
    expect(data.currentRate.standard).toBe(15);
    expect(data.currentRate.parking).toBe(12);
  });

  it('should retrieve information about multiple VAT IDs', async () => {
    mockFetch([
      {
        id: 'IE6388047V',
        valid: true,
        countryCode: 'IE',
        vatNumber: '6388047V',
        requestDate: '2023-05-23+02:00',
        name: 'GOOGLE IRELAND LIMITED',
        address: '3RD FLOOR, GORDON HOUSE, BARROW STREET, DUBLIN 4',
        currentRate: {
          super_reduced: 4.8,
          reduced1: 9,
          reduced2: 13.5,
          standard: 23,
          parking: 13.5,
        },
      },
      {
        id: 'DE297753810',
        valid: true,
        countryCode: 'DE',
        vatNumber: '297753810',
        requestDate: '2023-05-23+02:00',
        name: '---',
        address: '---',
        currentRate: {
          reduced: 7,
          standard: 19,
        },
      },
    ]);

    const data = await vat.getIdInformations(['IE6388047V', 'DE297753810']);

    expect(data[0].id).toBe('IE6388047V');
    expect(data[0].valid).toBe(true);
    expect(data[0].countryCode).toBe('IE');
    expect(data[0].vatNumber).toBe('6388047V');
    expect(data[0].requestDate).toBe('2023-05-23+02:00');
    expect(data[0].name).toBe('GOOGLE IRELAND LIMITED');
    expect(data[0].address).toBe('3RD FLOOR, GORDON HOUSE, BARROW STREET, DUBLIN 4');
    expect(data[0].currentRate.super_reduced).toBe(4.8);
    expect(data[0].currentRate.reduced1).toBe(9);
    expect(data[0].currentRate.reduced2).toBe(13.5);
    expect(data[0].currentRate.standard).toBe(23);
    expect(data[0].currentRate.parking).toBe(13.5);

    expect(data[1].id).toBe('DE297753810');
    expect(data[1].valid).toBe(true);
    expect(data[1].countryCode).toBe('DE');
    expect(data[1].vatNumber).toBe('297753810');
    expect(data[1].requestDate).toBe('2023-05-23+02:00');
    expect(data[1].name).toBe('---');
    expect(data[1].address).toBe('---');
    expect(data[1].currentRate.reduced).toBe(7);
    expect(data[1].currentRate.standard).toBe(19);
  });

  it('should get the VAT rates', async () => {
    mockFetch({
      DE: [
        {
          effective_from: '0000-01-01',
          rates: {
            reduced: 7,
            standard: 19,
          },
          exceptions: [
            {
              name: 'Büsingen am Hochrhein',
              postcode: '78266',
              standard: 0,
            },
            {
              name: 'Heligoland',
              postcode: '27498',
              standard: 0,
            },
          ],
        },
        {
          effective_from: '2020-07-01',
          rates: {
            reduced: 5,
            standard: 16,
          },
          exceptions: [
            {
              name: 'Büsingen am Hochrhein',
              postcode: '78266',
              standard: 0,
            },
            {
              name: 'Heligoland',
              postcode: '27498',
              standard: 0,
            },
          ],
        },
        {
          effective_from: '2021-01-01',
          rates: {
            reduced: 7,
            standard: 19,
          },
          exceptions: [
            {
              name: 'Büsingen am Hochrhein',
              postcode: '78266',
              standard: 0,
            },
            {
              name: 'Heligoland',
              postcode: '27498',
              standard: 0,
            },
          ],
        },
      ],
    });

    const result = await vat.getRates();

    const ratesGermany = result.DE;

    expect(ratesGermany[0].effective_from).toBe('0000-01-01');
    expect(ratesGermany[0].rates.reduced).toBe(7);
    expect(ratesGermany[0].rates.standard).toBe(19);
    expect(ratesGermany[0].exceptions[0].name).toBe('Büsingen am Hochrhein');
    expect(ratesGermany[0].exceptions[0].postcode).toBe('78266');
    expect(ratesGermany[0].exceptions[0].standard).toBe(0);
    expect(ratesGermany[0].exceptions[1].name).toBe('Heligoland');
    expect(ratesGermany[0].exceptions[1].postcode).toBe('27498');
    expect(ratesGermany[0].exceptions[1].standard).toBe(0);

    expect(ratesGermany[1].effective_from).toBe('2020-07-01');
    expect(ratesGermany[1].rates.reduced).toBe(5);
    expect(ratesGermany[1].rates.standard).toBe(16);
    expect(ratesGermany[1].exceptions[0].name).toBe('Büsingen am Hochrhein');
    expect(ratesGermany[1].exceptions[0].postcode).toBe('78266');
    expect(ratesGermany[1].exceptions[0].standard).toBe(0);
    expect(ratesGermany[1].exceptions[1].name).toBe('Heligoland');
    expect(ratesGermany[1].exceptions[1].postcode).toBe('27498');
    expect(ratesGermany[1].exceptions[1].standard).toBe(0);

    expect(ratesGermany[2].effective_from).toBe('2021-01-01');
    expect(ratesGermany[2].rates.reduced).toBe(7);
    expect(ratesGermany[2].rates.standard).toBe(19);
    expect(ratesGermany[2].exceptions[0].name).toBe('Büsingen am Hochrhein');
    expect(ratesGermany[2].exceptions[0].postcode).toBe('78266');
    expect(ratesGermany[2].exceptions[0].standard).toBe(0);
    expect(ratesGermany[2].exceptions[1].name).toBe('Heligoland');
    expect(ratesGermany[2].exceptions[1].postcode).toBe('27498');
    expect(ratesGermany[2].exceptions[1].standard).toBe(0);
  });

  it('should get the VAT rates of a specific country', async () => {
    mockFetch([
      {
        effective_from: '0000-01-01',
        rates: {
          reduced: 7,
          standard: 19,
        },
        exceptions: [
          {
            name: 'Büsingen am Hochrhein',
            postcode: '78266',
            standard: 0,
          },
          {
            name: 'Heligoland',
            postcode: '27498',
            standard: 0,
          },
        ],
      },
      {
        effective_from: '2020-07-01',
        rates: {
          reduced: 5,
          standard: 16,
        },
        exceptions: [
          {
            name: 'Büsingen am Hochrhein',
            postcode: '78266',
            standard: 0,
          },
          {
            name: 'Heligoland',
            postcode: '27498',
            standard: 0,
          },
        ],
      },
      {
        effective_from: '2021-01-01',
        rates: {
          reduced: 7,
          standard: 19,
        },
        exceptions: [
          {
            name: 'Büsingen am Hochrhein',
            postcode: '78266',
            standard: 0,
          },
          {
            name: 'Heligoland',
            postcode: '27498',
            standard: 0,
          },
        ],
      },
    ]);

    const ratesGermany = await vat.getRatesForCountry('DE');

    expect(ratesGermany[0].effective_from).toBe('0000-01-01');
    expect(ratesGermany[0].rates.reduced).toBe(7);
    expect(ratesGermany[0].rates.standard).toBe(19);
    expect(ratesGermany[0].exceptions[0].name).toBe('Büsingen am Hochrhein');
    expect(ratesGermany[0].exceptions[0].postcode).toBe('78266');
    expect(ratesGermany[0].exceptions[0].standard).toBe(0);
    expect(ratesGermany[0].exceptions[1].name).toBe('Heligoland');
    expect(ratesGermany[0].exceptions[1].postcode).toBe('27498');
    expect(ratesGermany[0].exceptions[1].standard).toBe(0);

    expect(ratesGermany[1].effective_from).toBe('2020-07-01');
    expect(ratesGermany[1].rates.reduced).toBe(5);
    expect(ratesGermany[1].rates.standard).toBe(16);
    expect(ratesGermany[1].exceptions[0].name).toBe('Büsingen am Hochrhein');
    expect(ratesGermany[1].exceptions[0].postcode).toBe('78266');
    expect(ratesGermany[1].exceptions[0].standard).toBe(0);
    expect(ratesGermany[1].exceptions[1].name).toBe('Heligoland');
    expect(ratesGermany[1].exceptions[1].postcode).toBe('27498');
    expect(ratesGermany[1].exceptions[1].standard).toBe(0);

    expect(ratesGermany[2].effective_from).toBe('2021-01-01');
    expect(ratesGermany[2].rates.reduced).toBe(7);
    expect(ratesGermany[2].rates.standard).toBe(19);
    expect(ratesGermany[2].exceptions[0].name).toBe('Büsingen am Hochrhein');
    expect(ratesGermany[2].exceptions[0].postcode).toBe('78266');
    expect(ratesGermany[2].exceptions[0].standard).toBe(0);
    expect(ratesGermany[2].exceptions[1].name).toBe('Heligoland');
    expect(ratesGermany[2].exceptions[1].postcode).toBe('27498');
    expect(ratesGermany[2].exceptions[1].standard).toBe(0);
  });

  it('should get the current VAT rate for a specific country', async () => {
    mockFetch([
      {
        effective_from: '0000-01-01',
        rates: {
          reduced: 7,
          standard: 19,
        },
        exceptions: [
          {
            name: 'Büsingen am Hochrhein',
            postcode: '78266',
            standard: 0,
          },
          {
            name: 'Heligoland',
            postcode: '27498',
            standard: 0,
          },
        ],
      },
      {
        effective_from: '2020-07-01',
        rates: {
          reduced: 5,
          standard: 16,
        },
        exceptions: [
          {
            name: 'Büsingen am Hochrhein',
            postcode: '78266',
            standard: 0,
          },
          {
            name: 'Heligoland',
            postcode: '27498',
            standard: 0,
          },
        ],
      },
      {
        effective_from: '2021-01-01',
        rates: {
          reduced: 7,
          standard: 19,
        },
        exceptions: [
          {
            name: 'Büsingen am Hochrhein',
            postcode: '78266',
            standard: 0,
          },
          {
            name: 'Heligoland',
            postcode: '27498',
            standard: 0,
          },
        ],
      },
    ]);

    const rate = await vat.getCurrentRateForCountry('DE');

    expect(rate.effective_from).toBe('2021-01-01');
    expect(rate.rates.reduced).toBe(7);
    expect(rate.rates.standard).toBe(19);
    expect(rate.exceptions[0].name).toBe('Büsingen am Hochrhein');
    expect(rate.exceptions[0].postcode).toBe('78266');
    expect(rate.exceptions[0].standard).toBe(0);
    expect(rate.exceptions[1].name).toBe('Heligoland');
    expect(rate.exceptions[1].postcode).toBe('27498');
    expect(rate.exceptions[1].standard).toBe(0);
  });
});
