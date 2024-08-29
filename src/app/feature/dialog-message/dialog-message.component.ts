import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, 
        MatDialogTitle,
        MatDialogRef, 
        MatDialogActions, 
        MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    CommonModule,
  ],
  styleUrl: './dialog-message.component.scss',
})
export class DialogMessageComponent {
  title: string;
  message: string;
  isError: boolean;
  isSuccess: boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogMessageComponent>,
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