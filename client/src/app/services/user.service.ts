import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserDTO, UserDTO } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpService: HttpClient) {}

  createUser(user: CreateUserDTO): Observable<CreateUserDTO> {
    return this.httpService.post<CreateUserDTO>(`users/user-create`, user);
  }

  editUser(param: UserDTO): Observable<UserDTO> {
    return this.httpService.put<UserDTO>('users', param);
  }

  getMenteesForMentor(): Observable<UserDTO[]> {
    return this.httpService.get<UserDTO[]>('users/mentees-for-mentor');
  }
}
