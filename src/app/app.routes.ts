import { Routes } from '@angular/router';
import { SignInComponent } from './feature/sign-in/sign-in.component';
import { HomeComponent } from './feature/home/home.component';
import { SignUpComponent } from './feature/sign-up/sign-up.component';
import { UserInformationComponent } from './feature/user-information/user-information.component';

export const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'user-information',
    component: UserInformationComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'sign-in',
  },
];
