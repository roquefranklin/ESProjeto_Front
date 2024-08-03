import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { jwtDecode, JwtHeader } from 'jwt-decode';
import { environment } from '../../../environments/environment';
import { Token } from '../../shared/models/token';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  public SignUp(username: string, nickname: string, email: string, password: string, confirmPassword: string): Observable<Token> {
    return this.http
      .post<Token>(`${environment.BASE_URL}/User/register`, {
        username,
        nickname,
        email,
        password,
        confirmPassword,
      })
      .pipe();
  }
}
