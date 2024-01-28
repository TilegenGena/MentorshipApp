import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  MentorshipRequestCreateDTO,
  MentorshipRequestGetDTO,
} from './interfaces/mentorship-request';
import { UserDTO } from './interfaces/user';
import { FakeUserService } from './fake-login/fake-login.service';
import { MentorshipResponseDTOGet } from './interfaces/metorship-response';

@Injectable({
  providedIn: 'root',
})
export class RequestResponseService {
  user$: Observable<UserDTO | null | undefined> = this.fakeUserService.user$;

  constructor(
    private httpService: HttpClient,
    private fakeUserService: FakeUserService
  ) {}

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
      `mentorship-accept/one`,
      { requestId }
    );
  }
}
