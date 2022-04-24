import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

interface ApiResponse {
  statusCode?: number;
  message?: string;
  error?: string;
}

export interface BusinessError extends ApiResponse {
  response?: BusinessError;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: BusinessError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception?.statusCode && exception?.error && exception?.message) {
      response.status(exception.statusCode).json(exception);
    } else if (
      exception?.response?.statusCode &&
      exception?.response?.error &&
      exception?.response?.message
    ) {
      response.status(exception.response.statusCode).json(exception.response);
    } else {
      console.error(exception);

      response.status(500).json({
        statusCode: 500,
        error: exception?.error || 'Internal Server Error',
        message: exception?.message || ['An unknown error occured'],
      });
    }
  }
}
