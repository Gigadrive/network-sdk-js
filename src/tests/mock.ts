export function mockFetch(result: unknown = undefined, ok: boolean = true) {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    json: () => result,
    text: () => JSON.stringify(result),
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
