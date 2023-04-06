/**
 * Builds a query parameter string from a given object.
 * Array values are attached as separate query parameters.
 * @param params The object to build the query parameter string from
 * @returns The query parameter string
 */
export function buildQueryParamString(
  params: Record<string, string | number | boolean | string[] | number[] | boolean[]>
): string {
  const queryParamString = Object.keys(params)
    .map((key) => {
      const value = params[key];

      if (Array.isArray(value)) {
        return value.map((v: string | number | boolean) => `${key}=${v.toString()}`).join('&');
      }

      return `${key}=${value.toString()}`;
    })
    .join('&');

  return queryParamString;
}
