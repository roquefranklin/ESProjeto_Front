import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { catchError, map, Observable, of } from 'rxjs';
import { SignInService } from '../../core/services/sign-in.service';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-user-information',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './user-information.component.html',
  styleUrl: './user-information.component.scss',
})
export class UserInformationComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private userService: UserService = inject(UserService);
  private tokenService: SignInService = inject(SignInService);
  private router: Router = inject(Router);

  public userInfo$?: Observable<FormGroup>;

  @Input('error-message') error: string | null = null;
  @Output('login') submitEM = new EventEmitter();

  ngOnInit(): void {
    let tokenEmail = this.tokenService.getTokenEmail();
    console.log('Email from token', tokenEmail);

    this.userInfo$ = this.userService.getUserInfo(tokenEmail).pipe(
      map((user) => {
        console.log('Email from token observer', tokenEmail);
        console.log('User', user);
        let form = this.formBuilder.group({
          username: [user?.nome ?? '', Validators.required],
          nickname: [user?.nickName ?? '', Validators.required],
          email: [user?.email ?? '', Validators.required],
          phone: [user?.phoneNumber ?? '', Validators.nullValidator],
          currentPassword: ['', Validators.required],
          newPassword: ['', Validators.required],
        });

        return form;
      }),
      catchError((err) => {
        console.error(err);
        return of(
          this.formBuilder.group({
            username: ['', Validators.required],
            nickname: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.nullValidator],
            currentPassword: ['', Validators.required],
            newPassword: ['', Validators.required],
          })
        );
      })
    );
  }

  submit(form: FormGroup) {
    console.log(form.getRawValue());

    if (form.valid) {
      this.submitEM.emit(form.value);
    }
  }

  logout() {
    if (this.tokenService.isAuthenticated()) {
      this.tokenService.logout();
    }

    this.router.navigate(['/']);
  }
}
