import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, 
        MatDialogTitle,
        MatDialogRef, 
        MatDialogActions, 
        MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-form-cadastro-parada',
  templateUrl: './form-cadastro-parada.component.html',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    CommonModule,
  ],
  styleUrl: './form-cadastro-parada.component.scss',
})
export class FormCadastroParadaComponent {
  title: string;
  message: string;
  isError: boolean;
  isSuccess: boolean;

  constructor(
    public dialogRef: MatDialogRef<FormCadastroParadaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.message = data.message;
    this.isError = data.isError;
    this.isSuccess = data.isSuccess;
  }

  close(): void {
    this.dialogRef.close();
  }
}