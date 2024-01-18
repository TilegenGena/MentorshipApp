import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserDTO } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpService: HttpClient) {}

  getLoggedInUser(): Observable<UserDTO> {
    // for now we will get all user, and show first
    return this.httpService
      .get<UserDTO[]>(`mentorship/users`)
      .pipe(map((allUsers) => allUsers[0]));
  }

  async editUser(param: UserDTO): Promise<Observable<UserDTO>> {
    return this.httpService.put<UserDTO>(`mentorship/${param.id}`, param);
  }
}
