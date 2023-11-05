import { mockFetch } from '../../tests/mock';
import webReputation, { type EmailReputation, type DomainReputation } from './index';

describe('Web Reputation API', () => {
  it('should be able to get a domain reputation', async () => {
    mockFetch([
      {
        domain: 'example.com',
        status: 'good',
        withholdingRecommended: false,
        isMxRecordAvailable: true,
      },
    ]);

    const reputation: DomainReputation = await webReputation.getDomainReputation('example.com');

    expect(reputation.domain).toBe('example.com');
    expect(reputation.status).toBe('good');
    expect(reputation.withholdingRecommended).toBe(false);
    expect(reputation.isMxRecordAvailable).toBe(true);
  });

  it('should be able to get multiple domain reputations', async () => {
    mockFetch([
      {
        domain: 'example.com',
        status: 'good',
        withholdingRecommended: false,
        isMxRecordAvailable: true,
      },
      {
        domain: 'example.org',
        status: 'good',
        withholdingRecommended: false,
        isMxRecordAvailable: true,
      },
    ]);

    const reputations: DomainReputation[] = await webReputation.getDomainReputations(['example.com', 'example.org']);

    expect(reputations.length).toBe(2);

    expect(reputations[0].domain).toBe('example.com');
    expect(reputations[0].status).toBe('good');
    expect(reputations[0].withholdingRecommended).toBe(false);
    expect(reputations[0].isMxRecordAvailable).toBe(true);

    expect(reputations[1].domain).toBe('example.org');
    expect(reputations[1].status).toBe('good');
    expect(reputations[1].withholdingRecommended).toBe(false);
    expect(reputations[1].isMxRecordAvailable).toBe(true);
  });

  it('should be able to get an email reputation', async () => {
    mockFetch([
      {
        email: 'test@example.com',
        role: false,
        domain: {
          domain: 'example.com',
          status: 'good',
          withholdingRecommended: false,
          isMxRecordAvailable: true,
        },
        validations: {
          valid: true,
          validators: {
            regex: {
              valid: true,
            },
            typo: {
              valid: true,
            },
            mx: {
              valid: true,
            },
          },
        },
      },
    ]);

    const reputation: EmailReputation = await webReputation.getEmailReputation('test@example.com');

    expect(reputation.email).toBe('test@example.com');
    expect(reputation.role).toBe(false);

    expect(reputation.domain.domain).toBe('example.com');
    expect(reputation.domain.status).toBe('good');
    expect(reputation.domain.withholdingRecommended).toBe(false);
    expect(reputation.domain.isMxRecordAvailable).toBe(true);

    expect(reputation.validations.valid).toBe(true);
    expect(reputation.validations.validators.regex.valid).toBe(true);
    expect(reputation.validations.validators.typo.valid).toBe(true);
    expect(reputation.validations.validators.mx.valid).toBe(true);
  });

  it('should be able to get multiple email reputations', async () => {
    mockFetch([
      {
        email: 'test@example.com',
        role: false,
        domain: {
          domain: 'example.com',
          status: 'good',
          withholdingRecommended: false,
          isMxRecordAvailable: true,
        },
        validations: {
          valid: true,
          validators: {
            regex: {
              valid: true,
            },
            typo: {
              valid: true,
            },
            mx: {
              valid: true,
            },
          },
        },
      },
      {
        email: 'test2@example.org',
        role: false,
        domain: {
          domain: 'example.org',
          status: 'adult_content',
          withholdingRecommended: true,
          isMxRecordAvailable: true,
        },
        validations: {
          valid: true,
          validators: {
            regex: {
              valid: true,
            },
            typo: {
              valid: true,
            },
            mx: {
              valid: true,
            },
          },
        },
      },
    ]);

    const reputations: EmailReputation[] = await webReputation.getEmailReputations([
      'test@example.com',
      'test2@example.org',
    ]);

    expect(reputations.length).toBe(2);

    expect(reputations[0].email).toBe('test@example.com');
    expect(reputations[0].role).toBe(false);

    expect(reputations[0].domain.domain).toBe('example.com');
    expect(reputations[0].domain.status).toBe('good');
    expect(reputations[0].domain.withholdingRecommended).toBe(false);
    expect(reputations[0].domain.isMxRecordAvailable).toBe(true);

    expect(reputations[0].validations.valid).toBe(true);
    expect(reputations[0].validations.validators.regex.valid).toBe(true);
    expect(reputations[0].validations.validators.typo.valid).toBe(true);
    expect(reputations[0].validations.validators.mx.valid).toBe(true);

    expect(reputations[1].email).toBe('test2@example.org');
    expect(reputations[1].role).toBe(false);

    expect(reputations[1].domain.domain).toBe('example.org');
    expect(reputations[1].domain.status).toBe('adult_content');
    expect(reputations[1].domain.withholdingRecommended).toBe(true);
    expect(reputations[1].domain.isMxRecordAvailable).toBe(true);

    expect(reputations[1].validations.valid).toBe(true);
    expect(reputations[1].validations.validators.regex.valid).toBe(true);
    expect(reputations[1].validations.validators.typo.valid).toBe(true);
    expect(reputations[1].validations.validators.mx.valid).toBe(true);
  });
});
