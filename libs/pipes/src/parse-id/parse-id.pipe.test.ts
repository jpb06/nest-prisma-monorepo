import { ArgumentMetadata } from '@nestjs/common';

import { ParseIdPipe } from './parse-id.pipe';

describe('ParseIdPipe class', () => {
  const message = 'Invalid ID';
  const pipe = new ParseIdPipe(message);

  const metaData = {} as ArgumentMetadata;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw when not passed a number', async () => {
    await expect(pipe.transform('cool', metaData)).rejects.toThrow(message);
  });

  it('should throw when number is negative', async () => {
    await expect(pipe.transform('-20', metaData)).rejects.toThrow(message);
  });

  it('should return a number', async () => {
    const result = await pipe.transform('10', metaData);

    expect(result).toBe(10);
  });
});
