import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MentorshipRequestCreateDTO } from '../interfaces/mentorship-request';

@Injectable({
  providedIn: 'root',
})
export class MentorshipRequestService {
  constructor(private httpService: HttpClient) {}

  async requestMentorship(
    body: MentorshipRequestCreateDTO
  ): Promise<Observable<MentorshipRequestCreateDTO>> {
    return this.httpService.post<MentorshipRequestCreateDTO>(
      'mentorship-request',
      body
    );
  }
}
