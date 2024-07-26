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
import { RouterModule } from '@angular/router';

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
  ],
  templateUrl: './user-information.component.html',
  styleUrl: './user-information.component.scss',
})
export class UserInformationComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);

  @Input('error-message') error: string | null = null;
  @Output('login') submitEM = new EventEmitter();

  public form: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    nickname: ['', Validators.required],
    email: ['', Validators.required],
    newPassword: ['', Validators.required],
    currentPassword: ['', Validators.required],
  });

  ngOnInit(): void {}

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }
}
