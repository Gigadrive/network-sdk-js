export function mockFetch(result: unknown = undefined, ok: boolean = true, statusCode?: number, statusText?: string) {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    json: () => result,
    text: () => JSON.stringify(result),
    status: statusCode,
    statusText,
    headers: new Headers({ 'Content-Type': 'application/json' }),
  });
}

export function mockFetchError(message: string) {
  mockFetch(
    {
      errors: [
        {
          message,
        },
      ],
    },
    false
  );
}
