import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ApiRoute } from './api-route.decorator';

jest.mock('@nestjs/common', () => {
  const originalModule = jest.requireActual('@nestjs/common');
  return {
    ...originalModule,
    applyDecorators: jest.fn(),
  };
});
jest.mock('@nestjs/swagger', () => {
  const originalModule = jest.requireActual('@nestjs/swagger');
  return {
    ...originalModule,
    ApiBadRequestResponse: jest.fn(),
    ApiCreatedResponse: jest.fn(),
    ApiInternalServerErrorResponse: jest.fn(),
    ApiNotFoundResponse: jest.fn(),
    ApiOkResponse: jest.fn(),
    ApiOperation: jest.fn(),
    ApiUnauthorizedResponse: jest.fn(),
  };
});

describe('ApiRoute decorator', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have the default decorators (route details, 401, 500)', () => {
    ApiRoute({
      summary: 'yolo',
    });

    expect(ApiOperation).toHaveBeenCalledTimes(1);
    expect(ApiUnauthorizedResponse).toHaveBeenCalledTimes(1);
    expect(ApiInternalServerErrorResponse).toHaveBeenCalledTimes(1);

    expect(applyDecorators).toHaveBeenCalledTimes(1);
  });

  it('should have a created decorator', () => {
    ApiRoute({
      summary: 'yolo',
      created: {},
    });

    expect(ApiCreatedResponse).toHaveBeenCalledTimes(1);

    expect(applyDecorators).toHaveBeenCalledTimes(1);
  });

  it('should have an ok decorator', () => {
    ApiRoute({
      summary: 'yolo',
      ok: {},
    });

    expect(ApiOkResponse).toHaveBeenCalledTimes(1);

    expect(applyDecorators).toHaveBeenCalledTimes(1);
  });

  it('should have a bad request decorator', () => {
    ApiRoute({
      summary: 'yolo',
      badRequest: {},
    });

    expect(ApiBadRequestResponse).toHaveBeenCalledTimes(1);

    expect(applyDecorators).toHaveBeenCalledTimes(1);
  });

  it('should have a not found decorator', () => {
    ApiRoute({
      summary: 'yolo',
      notFound: {},
    });

    expect(ApiNotFoundResponse).toHaveBeenCalledTimes(1);

    expect(applyDecorators).toHaveBeenCalledTimes(1);
  });
});
