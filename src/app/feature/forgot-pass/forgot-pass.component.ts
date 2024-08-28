import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { ForgotPassService } from '../../core/services/forgot-pass.service';

@Component({
  selector: 'app-forgot-pass',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './forgot-pass.component.html',
  styleUrl: './forgot-pass.component.scss'
})
export class ForgotPassComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private forgotPassService: ForgotPassService = inject(ForgotPassService)

  @Input('error-message') error: string | null = null;

  public form: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
  });

  ngOnInit(): void {}

  submit() {
    if (!this.form.valid) {
      return;
    }
    
    const forgotPass: { email: string } =
      this.form.getRawValue() as { email: string };
    console.log(forgotPass)
    this.forgotPassService.ForgotPass(forgotPass.email).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

}
