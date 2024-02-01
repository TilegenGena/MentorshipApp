import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Mentorship } from '../interfaces/mentorship-request';

@Injectable({
  providedIn: 'root',
})
export class MentorshipService {
  constructor(private httpService: HttpClient) {}

  getCurrentMentorship(): Observable<Mentorship> {
    return this.httpService.get<Mentorship>('mentorship');
  }

  hasCurrentMentorship(): Observable<boolean> {
    return this.getCurrentMentorship().pipe(map((mentorship) => !!mentorship));
  }
}
