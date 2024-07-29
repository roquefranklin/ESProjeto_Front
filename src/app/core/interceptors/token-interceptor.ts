import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInService } from '../services/sign-in.service';

export const TokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  let tokenService = inject(SignInService);
  let refreshToken = tokenService.getAccessToken();

  if (refreshToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
  }
  return next(req);
};
