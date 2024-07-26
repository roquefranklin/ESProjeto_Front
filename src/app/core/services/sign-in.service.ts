import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  public SignIn(email: string, password: string): Observable<string> {
    return this.http.post<string>(`${environment.BASE_URL}/token/signin`, {
      email,
      password,
    });
  }
}
