import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { jwtDecode, JwtHeader } from 'jwt-decode';
import { environment } from '../../../environments/environment';
import { Token } from '../../shared/models/token';
import { NewUser } from '../../shared/models/SignUp';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  public SignUp(
    username: string,
    nickname: string,
    email: string,
    password: string,
    confirmationPassword: string
  ): Observable<Token> {
    return this.http
      .post<Token>(`${environment.BASE_URL}/User/register`, {
        Nome: username,
        NickName: nickname,
        Email: email,
        Password: password,
        ConfirmationPassword: confirmationPassword,
      } as NewUser)
      .pipe();
  }
}
