import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NewReview } from '../../shared/models/NewReview';

@Injectable({
  providedIn: 'root',
})
export class StopPointReviewService {
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  public createReviewToStopPoint(newReview: NewReview) {
    return this.http.post<any>(`${environment.BASE_URL}/Review`, newReview);
  }
}
