import { ArgumentsHost } from '@nestjs/common';

type ArgumentsHostMock = {
  host: ArgumentsHost;
  status: jest.Mock<unknown>;
  json: jest.Mock<unknown>;
};

export const mockArgumentsHost = (): ArgumentsHostMock => {
  const status = jest.fn();
  const json = jest.fn();
  const host = {
    switchToHttp: jest.fn().mockReturnValue({
      getResponse: jest.fn().mockReturnValue({
        status: status.mockReturnThis(),
        json: json.mockReturnThis(),
      }),
    }),
  } as unknown as ArgumentsHost;

  return {
    host,
    status,
    json,
  };
};
