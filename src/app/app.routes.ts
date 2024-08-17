import { Routes } from '@angular/router';
import { SignInComponent } from './feature/sign-in/sign-in.component';
import { HomeComponent } from './feature/home/home.component';
import { SignUpComponent } from './feature/sign-up/sign-up.component';
import { UserInformationComponent } from './feature/user-information/user-information.component';
import { AuthenticationGuard } from './core/guards/authenticate.guard';
import { TemplateComponent } from './core/template/template.component';
import { RedirectLoggedToHomeGuard } from './core/guards/redirec-logged-to-home.guard';
import { StopPointRankComponent } from './feature/stop-point-rank/stop-point-rank.component';
import { StopPointInfoComponent } from './feature/stop-point-info/stop-point-info.component';
import { StopPointRatingComponent } from './feature/stop-point-rating/stop-point-rating.component';

export const routes: Routes = [
  {
    path: 'sign-in',
    canActivate: [RedirectLoggedToHomeGuard],
    component: TemplateComponent,
    children: [
      {
        path: '',
        component: SignInComponent,
      },
    ],
  },
  {
    path: 'sign-up',
    canActivate: [RedirectLoggedToHomeGuard],
    component: TemplateComponent,
    children: [
      {
        path: '',
        component: SignUpComponent,
      },
    ],
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
      {
        path: 'stop-point-rank',
        component: StopPointRankComponent,
      },
      {
        path: 'stop-point-info',
        component: StopPointInfoComponent,
      },
      {
        path: 'stop-point-rating',
        component: StopPointRatingComponent,
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'sign-in',
  },
];
