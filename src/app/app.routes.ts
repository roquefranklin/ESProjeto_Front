import { Routes } from '@angular/router';
import { SignInComponent } from './feature/sign-in/sign-in.component';
import { HomeComponent } from './feature/home/home.component';
import { SignUpComponent } from './feature/sign-up/sign-up.component';
import { UserInformationComponent } from './feature/user-information/user-information.component';
import { AuthenticationGuard } from './core/guards/authenticate.guard';
import { TemplateComponent } from './core/template/template.component';
import { RedirectLoggedToHomeGuard } from './core/guards/redirec-logged-to-home.guard';

export const routes: Routes = [
  {
    path: 'sign-in',
    canActivate: [RedirectLoggedToHomeGuard],
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    canActivate: [RedirectLoggedToHomeGuard],
    component: SignUpComponent,
  },
  {
    path: '',
    component: TemplateComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'user-information',
        component: UserInformationComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'sign-in',
  },
];
