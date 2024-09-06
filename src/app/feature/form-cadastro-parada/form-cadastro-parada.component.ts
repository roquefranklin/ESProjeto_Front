import { Component, EventEmitter, inject, Inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogRef,
  MatDialogActions,
  MatDialogContent
} from '@angular/material/dialog';
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
  longitude: number,
  pointName?: string,
  descPoint?: string
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
  latitudePrint: string;
  longitudePrint: string;
  descPoint: any;
  latitude: any;
  longitude: any;

  stopPointService: FormCadastroParadaService = inject(FormCadastroParadaService)

  @Input('error-message') error: string | null = null;
  @Output('login') submitEM = new EventEmitter();

  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private formCadastroParadaService: FormCadastroParadaService = inject(FormCadastroParadaService);

  public form: FormGroup = this.formBuilder.group({
    pointName: ['', Validators.required],
    descPoint: ['', null],
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
    if (this.coordenadas.latitude < 0)
      this.latitudePrint = String(this.coordenadas.latitude * (-1) + " S")
    else
      this.latitudePrint = String(this.coordenadas.latitude + " N")

    if (this.coordenadas.longitude < 0)
      this.longitudePrint = String(this.coordenadas.longitude * (-1) + " W")
    else
      this.longitudePrint = String(this.coordenadas.longitude + " E")

    this.pointName = data.pointName;
    this.descPoint = ''
  }
  ngOnInit(): void {
    this.form.get('latitude')?.setValue(this.coordenadas.latitude)
    this.form.get('longitude')?.setValue(this.coordenadas.longitude)
    this.form.get('descPoint')?.setValue(this.descPoint)
  }
  submit() {
    const pointData = this.form.getRawValue() as Coordenadas
    console.log(pointData);
    this.stopPointService.criarNovoPontoDeParada({
      nome: pointData.pointName ?? '',
      coordenada: {
        longitude: this.data.coodenadas.latitude,
        latitude: this.coordenadas.longitude,
      }
    }).subscribe((response) => {
      console.log(response)
    })
  }
  close(): void {
    this.dialogRef.close();
  }
}