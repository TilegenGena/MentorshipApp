import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpService: HttpClient) {}

  getLoggedInUser(): Observable<UserDTO> {
    // TODO: Later get actual logged in user
    return this.httpService.get<UserDTO>(`mentorship/${1}`);
  }

  editUser(param: UserDTO): Observable<UserDTO> {
    return this.httpService.put<UserDTO>(`mentorship/${param.id}`, param);
  }

  getMenteesForMentor(fakeLoggedIncurrentUser: number): Observable<UserDTO[]> {
    return this.httpService.get<UserDTO[]>(
      `mentorship/mentees-for-mentor/${fakeLoggedIncurrentUser}`
    );
  }
}
