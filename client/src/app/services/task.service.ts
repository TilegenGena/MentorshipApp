import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskDTO } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private httpService: HttpClient) {}

  getTasks(menteeId: number): Observable<TaskDTO[]> {
    return this.httpService.get<TaskDTO[]>(`task/${menteeId}`);
  }

  async getTask(id: number): Promise<Observable<TaskDTO>> {
    return this.httpService.get<TaskDTO>(`task/${id}`);
  }

  async createTask(param: TaskDTO): Promise<Observable<TaskDTO>> {
    return this.httpService.post<TaskDTO>('task/task', param);
  }

  async editTask(param: TaskDTO): Promise<Observable<TaskDTO>> {
    return this.httpService.put<TaskDTO>(`task/${param.id}`, param);
  }

  async deleteTask(id: number): Promise<Observable<TaskDTO>> {
    return this.httpService.delete<TaskDTO>(`task/${id}`);
  }
}
