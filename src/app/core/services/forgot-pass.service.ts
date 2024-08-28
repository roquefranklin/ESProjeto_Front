import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Token } from '../../shared/models/token';

@Injectable({
  providedIn: 'root'
})
export class ForgotPassService {

  private http: HttpClient = inject(HttpClient);

  constructor() { }

  public ForgotPass(email: string): Observable<Token> {
    return this.http
      .post<Token>(`${environment.BASE_URL}/User/forgotpass`, {
        email,
      })
      .pipe(
        tap((response) => {
          console.log(response)
        }),
        catchError(err => {
          throw Error(err);
        })
      );
  }

}
