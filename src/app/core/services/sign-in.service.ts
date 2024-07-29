import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { jwtDecode, JwtHeader } from 'jwt-decode';
import { environment } from '../../../environments/environment';
import { Token } from '../../shared/models/token';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  public SignIn(email: string, password: string): Observable<Token> {
    return this.http
      .post<Token>(`${environment.BASE_URL}/Token/signin`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem(
            'access_token',
            JSON.stringify(response.accessToken.toString())
          );
          localStorage.setItem(
            'refresh_token',
            JSON.stringify(response.refreshToken.toString())
          );
        })
      );
  }

  public getRefresgToken() {
    return JSON.parse(localStorage.getItem('refresh_token') ?? '{}');
  }

  public getAccessToken() {
    return JSON.parse(localStorage.getItem('access_token') ?? '{}');
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }

  public logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  getTokenEmail() {
    let token = this.getAccessToken();

    let email = this.processEmailResult(
      (jwtDecode<JwtHeader>(token) as unknown as any).email
    );

    return email;
  }

  private processEmailResult(result: string | string[]): string {
    if (typeof result === 'string') {
      return result;
    } else if (Array.isArray(result) && result.length > 0) {
      return result[0];
    } else {
      return '';
    }
  }
}
