import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MentorshipResponseDTOGet } from '../interfaces/metorship-response';

@Injectable({
  providedIn: 'root',
})
export class ResponseMentorshipService {
  constructor(private httpService: HttpClient) {}

  getResponse(): Observable<MentorshipResponseDTOGet[]> {
    return this.httpService.get<MentorshipResponseDTOGet[]>(
      'mentorship-response/get-responses-for-mentee'
    );
  }

  setResponseAsSeen(responseId: number): Observable<any> {
    return this.httpService.post(
      `mentorship-response/set-response-as-seen/${responseId}`,
      {}
    );
  }
}
