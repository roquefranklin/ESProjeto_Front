import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Coordenadas } from '../../feature/form-cadastro-parada/form-cadastro-parada.component';

export interface StopPoint{
  id: string,
  latitude: number,
  longitude: number,
  name: string
}

export interface StopPointFeatured {
  stopPoints: StopPoint[];
}

@Injectable({
  providedIn: 'root',
})


export class StopPointsService {
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  getClosePoints(position: {
    latitude: number;
    longitude: number;
    radius: number;
  }) {
    let params = new HttpParams()
      .set('latitude', position.latitude)
      .set('longitude', position.longitude)
      .set('radius', position.radius);

    return this.http.get<StopPointFeatured>(`${environment.BASE_URL}/StopPoint/get-stop-points`, {
      params: params,
    });
  }
}
