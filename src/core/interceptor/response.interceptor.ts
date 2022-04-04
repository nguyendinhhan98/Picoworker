interface IResponse<T> {
  data: T;
  status: number;
  message: string;
}

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        if (!data) return { data: {}, status: 200, message: 'success' };
        return { data: data, status: 200, message: data?.message ?? 'success' };
      }),
    );
  }
}
