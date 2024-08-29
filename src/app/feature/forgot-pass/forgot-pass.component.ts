import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { ForgotPassService } from '../../core/services/forgot-pass.service';
import { ToastrService } from 'ngx-toastr';

interface ForgotPassResponse {
  message: string;
  // adicione outros campos conforme necessário
}

@Component({
  selector: 'app-forgot-pass',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
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

  constructor(private toastr: ToastrService){}
  ngOnInit(): void {}

  submit() {
    if (!this.form.valid) {
      return;
    }
    
    const forgotPass: { email: string } =
      this.form.getRawValue() as { email: string };
      this.forgotPassService.ForgotPass(forgotPass.email).subscribe({
        next: (ret) => {
          this.toastr.success(ret.message, 'Sucesso!!!')
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

}
