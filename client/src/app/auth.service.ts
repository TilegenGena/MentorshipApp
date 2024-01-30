import { Injectable } from '@angular/core';
import { Observable, concat, firstValueFrom } from 'rxjs';
import { UserDTO } from './interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, map, share, tap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUserSubject$ = new BehaviorSubject<
    UserDTO | null | undefined
  >(undefined);
  private currentLoggedInUser: UserDTO | null | undefined = null;

  private loggedInUser$: Observable<UserDTO | null> = (
    concat(
      this.httpService.get<UserDTO | null>('/auth/get_logged_in_user').pipe(
        tap({
          next: (v) => this.loggedInUserSubject$.next(v),
          error: (err) => this.loggedInUserSubject$.error(err),
        }),
        map(() => undefined)
      ),
      this.loggedInUserSubject$
    ).pipe(filter((v) => v !== undefined)) as Observable<UserDTO | null>
  ).pipe(share());

  constructor(private httpService: HttpClient, private router: Router) {
    this.loggedInUserSubject$.subscribe({
      next: (user) => {
        this.currentLoggedInUser = user;
      },
    });
  }

  getLoggedInUserPromise(): Promise<UserDTO | null> {
    if (this.currentLoggedInUser !== undefined) {
      return Promise.resolve(this.currentLoggedInUser);
    } else {
      return firstValueFrom(this.loggedInUser$);
    }
  }

  getLoggedInUser(): Observable<UserDTO | null> {
    return this.loggedInUser$;
  }

  getLoggedInUserObservable(): Observable<UserDTO | null> {
    return this.loggedInUser$;
  }

  requireLoggedInGuard(): Observable<boolean> {
    return this.getLoggedInUser().pipe(
      catchError((err) => {
        alert('Error getting logged-in user');
        return of(null);
      }),
      tap((maybeUser) => {
        if (maybeUser === null) {
          this.router.navigate(['/login']);
        }
      }),
      map((maybeUser) => maybeUser !== null)
    );
  }

  logIn(email: string, password: string): Observable<UserDTO> {
    return this.httpService
      .post<UserDTO>('auth/log_in', {
        email,
        password,
      })
      .pipe(
        tap({
          next: (user) => this.loggedInUserSubject$.next(user),
          error: (err) => this.loggedInUserSubject$.error(err),
        })
      );
  }

  logOut(): Observable<void> {
    return this.httpService.post<void>('auth/log_out', {}).pipe(
      tap({
        next: () => {
          return this.loggedInUserSubject$.next(null);
        },
        error: (err) => this.loggedInUserSubject$.error(err),
      })
    );
  }
}
