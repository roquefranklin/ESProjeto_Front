import { Component, inject } from '@angular/core';
import { SignInService } from '../services/sign-in.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public tokenService: SignInService = inject(SignInService);
  private router: Router = inject(Router);

  logout() {
    if (this.tokenService.isAuthenticated()) {
      this.tokenService.logout();
    }

    this.router.navigate(['/sign-in']);
  }
}
