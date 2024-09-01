import { Component, EventEmitter, inject, Inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, 
        MatDialogTitle,
        MatDialogRef, 
        MatDialogActions, 
        MatDialogContent } from '@angular/material/dialog';
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
import { Router } from '@angular/router';
import { FormCadastroParadaService } from '../../core/services/form-cadastro-parada.service';

export interface Coordenadas {
  latitude: number,
  longitude: number
}

@Component({
  selector: 'app-form-cadastro-parada',
  templateUrl: './form-cadastro-parada.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    CommonModule,
  ],
  styleUrl: './form-cadastro-parada.component.scss',
})

export class FormCadastroParadaComponent implements OnInit {

  title: string;
  message: string;
  isError: boolean;
  isSuccess: boolean;
  coordenadas: Coordenadas;
  pointName: string;

  stopPointService: FormCadastroParadaService = inject(FormCadastroParadaService)

  @Input('error-message') error: string | null = null;
  @Output('login') submitEM = new EventEmitter();
  
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private formCadastroParadaService: FormCadastroParadaService = inject(FormCadastroParadaService);

  public form: FormGroup = this.formBuilder.group({
    latitude: ['', Validators.required],
    longitude: ['', Validators.required],
    pointName: ['', Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<FormCadastroParadaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.message = data.message;
    this.isError = data.isError;
    this.isSuccess = data.isSuccess;
    this.coordenadas = {
      latitude: data.coodenadas.latitude,
      longitude: data.coodenadas.longitude
    }
    this.pointName = data.pointName;
  }
  ngOnInit(): void {
    this.form.get('latitude')?.setValue(this.coordenadas.latitude)
    this.form.get('longitude')?.setValue(this.coordenadas.longitude)
  }
  submit(){
    this.stopPointService.criarNovoPontoDeParada({
      nome: 'teste',
      coordenada: (this.form.getRawValue() as Coordenadas)
    }).subscribe((response)=>{
      console.log(response)
    })
  }
  close(): void {
    this.dialogRef.close();
  }
}