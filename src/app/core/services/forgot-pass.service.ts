import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Token } from '../../shared/models/token';

interface ForgotPassResponse {
  message: string
}
@Injectable({
  providedIn: 'root'
})
export class ForgotPassService {

  private http: HttpClient = inject(HttpClient);

  constructor() { }

  public ForgotPass(email: string): Observable<ForgotPassResponse> {
    return this.http
      .post<ForgotPassResponse>(`${environment.BASE_URL}/User/forgot-password`, {
        email,
      })
      .pipe(
        tap((response) => {
          console.log("response", response)
        }),
        catchError(err => {
          throw Error(err);
        })
      );
  }

}
