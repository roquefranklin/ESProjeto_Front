import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
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
import { SignUpService } from '../../core/services/sign-up.service';
import { BottomMenuManagerService } from '../../core/services/bottom-menu-manager.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private signUpService: SignUpService = inject(SignUpService);

  @Input('error-message') error: string | null = null;
  @Output('login') submitEM = new EventEmitter();

  public form: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    nickname: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmationPassword: ['', Validators.required],
  });

  @ViewChild('signUp') menuOptions!: TemplateRef<any>;
  private menuButtonService = inject(BottomMenuManagerService);

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.menuButtonService.setMenuOption(this.menuOptions);
  }

  submit() {
    if (!this.form.valid) {
      return;
      // this.submitEM.emit(this.form.value);
    }
    const signUp: {
      username: string;
      nickname: string;
      email: string;
      password: string;
      confirmationPassword: string;
    } = this.form.getRawValue() as {
      username: string;
      nickname: string;
      email: string;
      password: string;
      confirmationPassword: string;
    };

    this.signUpService
      .SignUp(
        signUp.username,
        signUp.nickname,
        signUp.email,
        signUp.password,
        signUp.confirmationPassword
      )
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }
}
