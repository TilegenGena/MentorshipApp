import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskDTO } from '../interfaces/task';
import { IMentor } from '../interfaces/mentor';

@Injectable({
  providedIn: 'root',
})
export class MentorService {
  constructor(private httpClient: HttpClient) {}

  async getMentors(): Promise<Observable<IMentor[]>> {
    return this.httpClient.get<IMentor[]>('mentorship/mentors');
  }
}
