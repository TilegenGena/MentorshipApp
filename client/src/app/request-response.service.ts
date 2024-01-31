import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  Mentorship,
  MentorshipRequestCreateDTO,
  MentorshipRequestGetDTO,
} from './interfaces/mentorship-request';
import { MentorshipResponseDTOGet } from './interfaces/metorship-response';

@Injectable({
  providedIn: 'root',
})
export class RequestResponseService {
  constructor(private httpService: HttpClient) {}

  getRequest(mentorId: number): Observable<MentorshipRequestGetDTO[]> {
    return this.httpService.get<MentorshipRequestGetDTO[]>(
      `mentorship-request/requests/${mentorId}`
    );
  }

  getResponse(menteeId: number): Observable<MentorshipResponseDTOGet[]> {
    return this.httpService.get<MentorshipResponseDTOGet[]>(
      `mentorship-request/get-responses-for-mentee/${menteeId}`
    );
  }

  acceptRequest(requestId: number): Observable<MentorshipRequestCreateDTO> {
    return this.httpService.post<MentorshipRequestCreateDTO>(
      `mentorship/accept`,
      { requestId }
    );
  }

  getCurrentMentorship(): Observable<Mentorship> {
    return this.httpService.get<Mentorship>('mentorship');
  }

  hasCurrentMentorship(): Observable<boolean> {
    return this.getCurrentMentorship().pipe(map((mentorship) => !!mentorship));
  }
}
