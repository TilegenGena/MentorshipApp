import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { CreateUserDTO, UserDTO } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  menteesReplaySubject$ = new ReplaySubject<UserDTO[]>(1);

  getMenteesAsObservable(): Observable<UserDTO[]> {
    return this.menteesReplaySubject$.asObservable();
  }

  constructor(private httpService: HttpClient) {}

  createUser(user: CreateUserDTO): Observable<CreateUserDTO> {
    return this.httpService.post<CreateUserDTO>(`users/user-create`, user);
  }

  editUser(param: UserDTO): Observable<UserDTO> {
    return this.httpService.put<UserDTO>('users', param);
  }

  getMenteesForMentor(): Observable<UserDTO[]> {
    return this.httpService.get<UserDTO[]>('users/mentees-for-mentor').pipe(
      tap({
        next: (mentees) => this.menteesReplaySubject$.next(mentees),
        error: (err) => this.menteesReplaySubject$.error(err),
      })
    );
  }
}
