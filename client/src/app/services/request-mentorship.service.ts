import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  MentorshipRequestCreateDTO,
  MentorshipRequestGetDTO,
} from '../interfaces/mentorship-request';

@Injectable({
  providedIn: 'root',
})
export class RequestMentorshipService {
  constructor(private httpService: HttpClient) {}

  requestMentorship(
    body: MentorshipRequestCreateDTO
  ): Observable<MentorshipRequestCreateDTO> {
    return this.httpService.post<MentorshipRequestCreateDTO>(
      'mentorship-request',
      body
    );
  }

  getRequest(mentorId: number): Observable<MentorshipRequestGetDTO[]> {
    return this.httpService.get<MentorshipRequestGetDTO[]>(
      `mentorship-request/requests/${mentorId}`
    );
  }

  acceptRequest(requestId: number): Observable<MentorshipRequestCreateDTO> {
    return this.httpService.post<MentorshipRequestCreateDTO>(
      `mentorship/accept`,
      { requestId }
    );
  }
}
