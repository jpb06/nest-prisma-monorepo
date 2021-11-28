import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';

export const notFoundError = (message: string): Observable<never> =>
  throwError(() => new NotFoundException(message));

export const conflictError = (message: string): Observable<never> =>
  throwError(() => new ConflictException(message));

export const internalServerError = (message: string): Observable<never> =>
  throwError(() => new InternalServerErrorException(message));
