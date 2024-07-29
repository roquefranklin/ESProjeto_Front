import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../shared/models/user';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  public getUserInfo(email: string) {
    console.log(email);
    if (email === '') return of({} as User);

    return this.http.get<User>(`${environment.BASE_URL}/User/email/${email}`);
  }
}
