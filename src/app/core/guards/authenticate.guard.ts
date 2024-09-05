import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SignInService } from '../services/sign-in.service';

export const AuthenticationGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  // console.log('teste', inject(SignInService).isAuthenticated());

  const isLogged = inject(SignInService).isAuthenticated();

  if (isLogged) return true;
  else return inject(Router).navigate(['/sign-in']);
};
