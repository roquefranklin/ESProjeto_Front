import { inject, Injectable } from '@angular/core';
import { Coordenadas } from '../../feature/form-cadastro-parada/form-cadastro-parada.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { interval, map, of, timeInterval } from 'rxjs';

export interface PontoDeParada{
  nome: string,
  coordenada: Coordenadas
}
@Injectable({
  providedIn: 'root'
})

export class FormCadastroParadaService {

  http: HttpClient = inject(HttpClient)
  public criarNovoPontoDeParada(ponto: PontoDeParada){
    return interval(1000).pipe(map(()=>({
      status: true
    })))
    // return this.http
    //   .post(`${environment.BASE_URL}/stop-point/register`, ponto)
  }
}
