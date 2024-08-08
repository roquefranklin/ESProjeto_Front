import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SignInService } from '../services/sign-in.service';

export const RedirectLoggedToHomeGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log('teste', inject(SignInService).isAuthenticated());

  const isLogged = inject(SignInService).isAuthenticated();

  if (isLogged) return inject(Router).navigate(['/home']);
  else return true;
};
