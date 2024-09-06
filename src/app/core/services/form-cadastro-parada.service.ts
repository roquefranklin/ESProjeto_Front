import { inject, Injectable } from '@angular/core';
import { Coordenadas } from '../../feature/form-cadastro-parada/form-cadastro-parada.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SignInService } from '../services/sign-in.service';
import { interval, map, of, timeInterval } from 'rxjs';
import { Token } from '../../shared/models/token';

export interface PontoDeParada {
  nome: string,
  coordenada: Coordenadas
}
interface StopPointPosition {
  coords: {
    accuracy: number,
    latitude: number,
    longitude: number
  },
  timestamp: number
}

interface StopPoint {
  stopPointPosition: StopPointPosition,
  creationDate: Date,
  userCreatorEmail: String,
  name: String,
}

@Injectable({
  providedIn: 'root'
})

export class FormCadastroParadaService {
  http: HttpClient = inject(HttpClient)
  signInService: SignInService = inject(SignInService)

  public criarNovoPontoDeParada(ponto: PontoDeParada) {
    return this.http
      .post(`${environment.BASE_URL}/StopPoint/new-stop-point`, {
        stopPointPosition: {
          coords: {
            accuracy: 0,
            latitude: ponto.coordenada.latitude,
            longitude: ponto.coordenada.longitude
          },
          timestamp: new Date().getTime(),
        },
        creationDate: new Date(),
        userCreatorEmail: this.signInService.getTokenEmail(),
        name: ponto.nome
      } as StopPoint)
      .pipe();
  }
}
