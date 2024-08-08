import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../shared/models/user';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { UpdateUserInfo } from '../../shared/models/UpdateUserInfo';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  public getUserInfo(email: string) {
    if (email === '') return of({} as User);

    return this.http.get<User>(`${environment.BASE_URL}/User/email/${email}`);
  }

  public updateUserInfo(newUserInfo: UpdateUserInfo){
    return this.http.patch(`${environment.BASE_URL}/User`, newUserInfo)
  }
}
