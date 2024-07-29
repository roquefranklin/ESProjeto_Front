import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignInService } from '../services/sign-in.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  public tokenService: SignInService = inject(SignInService);

}
