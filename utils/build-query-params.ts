/**
 * Builds query parameters from an object.
 *
 * @param {Object} params - An object with key-value pairs to build query parameters from.
 * @returns {string} A URL encoded query string.
 */
export const buildQueryParams = (
  params: Record<string, string | null | undefined> = {}
): string => {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value != null && value !== '') {
      searchParams.append(key, String(value));
    }
  }

  return searchParams.toString();
};
