import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponseOptions,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ApiResponseDto } from './../dto/api-response.dto';
import { BadRequestDto } from './../dto/bad-request-response.dto';

interface DefaultResponsesInput {
  summary: string;
  description?: string;
  ok?: ApiResponseOptions;
  created?: ApiResponseOptions;
  badRequest?: { description?: string };
  notFound?: { description?: string };
}

type ApiRouteOutput = <TFunction extends () => void, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol | undefined,
  descriptor?: TypedPropertyDescriptor<Y> | undefined,
) => void;

export const ApiRoute = ({
  summary,
  description,
  ok,
  created,
  badRequest,
  notFound,
}: DefaultResponsesInput): ApiRouteOutput => {
  const decorators = [
    ApiOperation({
      summary,
      description,
    }),
    ApiUnauthorizedResponse({
      description: 'Missing, invalid or expired token',
      type: ApiResponseDto,
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal server error',
      type: ApiResponseDto,
    }),
  ];

  if (ok) {
    decorators.push(ApiOkResponse(ok));
  }
  if (created) {
    decorators.push(ApiCreatedResponse(created));
  }

  if (badRequest) {
    decorators.push(
      ApiBadRequestResponse({
        description: 'Bad request',
        type: BadRequestDto,
        ...badRequest,
      }),
    );
  }

  if (notFound) {
    decorators.push(
      ApiNotFoundResponse({
        description: "The requested resource wasn't found",
        type: ApiResponseDto,
        ...notFound,
      }),
    );
  }

  return applyDecorators(...decorators);
};
