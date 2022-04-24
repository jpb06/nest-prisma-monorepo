import { mockArgumentsHost } from '@libs/tests/mocks/arguments-host.mock';

import {
  BusinessError,
  GlobalExceptionFilter,
} from './global-exception.filter';

describe('GlobalExceptionFilter class', () => {
  console.error = jest.fn();

  const { host, status, json } = mockArgumentsHost();

  const filter = new GlobalExceptionFilter();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return default labels when exception contains nothing', () => {
    filter.catch({}, host);

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({
      statusCode: 500,
      error: 'Internal Server Error',
      message: ['An unknown error occured'],
    });
  });

  it('should return exception details', () => {
    const exception: BusinessError = {
      error: 'KernelPanic',
      message: 'Oh no!',
      statusCode: 501,
    };

    filter.catch(exception, host);

    expect(console.error).toHaveBeenCalledTimes(0);
    expect(status).toHaveBeenCalledWith(501);
    expect(json).toHaveBeenCalledWith(exception);
  });
});
