import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { SignInService } from '../../core/services/sign-in.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {

  constructor(private toastr: ToastrService) {}

  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private signInService: SignInService = inject(SignInService);

  @Input('error-message') error: string | null = null;

  public form: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {}

  submit() {
    if (!this.form.valid) {
      return;
    }

    const signIn: { email: string; password: string } =
      this.form.getRawValue() as { email: string; password: string };

    this.signInService.SignIn(signIn.email, signIn.password).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err)
        this.toastr.error('Login ou senha incorreta!', 'Erro!!!');
      },
    });
  }
}
