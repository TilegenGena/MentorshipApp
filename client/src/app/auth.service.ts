import { Injectable } from '@angular/core';
import { Observable, Subject, firstValueFrom, merge } from 'rxjs';
import { UserDTO } from './interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import {
  catchError,
  map,
  tap,
  ignoreElements,
  shareReplay,
  retry,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUserSubject$ = new Subject<UserDTO | null>();

  private loggedInUser$: Observable<UserDTO | null> = merge(
    this._initialUserFetch().pipe(
      tap((maybeUser) => this.loggedInUserSubject$.next(maybeUser)),
      ignoreElements()
    ),
    this.loggedInUserSubject$
  ).pipe(shareReplay(1));

  constructor(private httpService: HttpClient, private router: Router) {}

  _initialUserFetch(): Observable<UserDTO | null> {
    return this.httpService
      .get<UserDTO | null>('/auth/get_logged_in_user')
      .pipe(
        retry({
          count: 5,
          delay: 1000,
        })
      );
  }

  getLoggedInUserPromise(): Promise<UserDTO | null> {
    return firstValueFrom(this.loggedInUserSubject$);
  }

  getLoggedInUser(): Observable<UserDTO | null> {
    return this.loggedInUser$;
  }

  getLoggedInUserObservable(): Observable<UserDTO | null> {
    return this.loggedInUser$;
  }

  // Returns whether the user is logged in, and redirects the user to the login
  // page if he/she is not:
  requireLoggedInGuard(): Observable<boolean> {
    return this.getLoggedInUser().pipe(
      // If there's an error, don't fail in the guard: alert the user but treat
      // it as being logged out:
      catchError((err) => {
        alert('Error getting logged-in user');
        return of(null);
      }),
      // If the user is logged out, redirect them to the login page:
      tap((maybeUser) => {
        if (maybeUser === null) {
          this.router.navigate(['/login']);
        }
      }),
      // Return true if the user is logged in and false otherwise:
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
