import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MentorshipResponseDTOGet } from '../interfaces/metorship-response';

@Injectable({
  providedIn: 'root',
})
export class ResponseMentorshipService {
  constructor(private httpService: HttpClient) {}

  getResponse(menteeId: number): Observable<MentorshipResponseDTOGet[]> {
    return this.httpService.get<MentorshipResponseDTOGet[]>(
      `mentorship-request/get-responses-for-mentee/${menteeId}`
    );
  }
}
