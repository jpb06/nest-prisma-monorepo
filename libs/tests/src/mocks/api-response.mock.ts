export const mockApiResponse = (
  statusCode: number,
  error: string,
  message: string[] | string,
): unknown => ({
  error,
  message,
  statusCode,
});
