export const mockApiResponse = (
  statusCode: number,
  error: string,
  message: Array<string> | string,
): unknown => ({
  error,
  message,
  statusCode,
});
