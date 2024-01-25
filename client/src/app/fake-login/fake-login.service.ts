import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { UserDTO } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class FakeUserService {
  private userSubject = new BehaviorSubject<UserDTO | null>(null);
  public user$: Observable<UserDTO | null> = this.userSubject.asObservable();
  private currentUser: UserDTO | null = null;

  constructor(private httpService: HttpClient) {}

  fakeLogin(userId: number): Observable<UserDTO> {
    return this.httpService.get<UserDTO>(`mentorship/${userId}`).pipe(
      tap((user) => {
        this.currentUser = user;
        this.userSubject.next(user);
      }),
      catchError((error) => {
        console.error('Error fetching user:', error);
        this.currentUser = null;
        this.userSubject.next(null);
        return throwError(error);
      })
    );
  }

  getCurrentUser(): UserDTO | null {
    return this.currentUser;
  }

  isMentor(): boolean {
    return this.currentUser?.userType === 'Mentor';
  }

  logout(): void {
    this.userSubject.next(null);
  }
}
