import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from './interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpService: HttpClient) {}

  logIn(email: string, password: string): Observable<UserDTO> {
    return this.httpService.post<UserDTO>('auth/log_in', { email, password });
  }

  logOut(): Observable<void> {
    return this.httpService.post<void>('auth/log_out', null);
  }
}
