import { Component, inject, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SignInService } from '../services/sign-in.service';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { BottomMenuManagerService } from '../services/bottom-menu-manager.service';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, NgTemplateOutlet, AsyncPipe],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  public tokenService: SignInService = inject(SignInService);
  private menuService = inject(BottomMenuManagerService);
  @Input()
  navigationTemplate!: TemplateRef<any>;

  private router: ActivatedRoute = inject(ActivatedRoute);
  public isLogging$ = this.router.url.pipe(
    map((fragments) => fragments[0]?.path == 'sign-in'),
    tap((x) => console.log(x))
  );
  public isSignUp$ = this.router.url.pipe(
    map((fragments) => fragments[0]?.path == 'sign-up'),
    tap((x) => console.log(x))
  );

  ngOnInit(): void {
    this.menuService.currentMenu.subscribe({
      next: (value) => {
        // console.log(value);

        this.navigationTemplate = value as TemplateRef<any>;
      },
    });
  }
}
