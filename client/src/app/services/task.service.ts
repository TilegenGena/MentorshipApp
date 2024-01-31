import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskDTO } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private httpService: HttpClient) {}

  getTasks(): Observable<TaskDTO[]> {
    return this.httpService.get<TaskDTO[]>(`task`);
  }

  getTasksForMentee(menteeId: number): Observable<TaskDTO[]> {
    return this.httpService.get<TaskDTO[]>(`task/${menteeId}`);
  }

  getTask(id: number): Observable<TaskDTO> {
    return this.httpService.get<TaskDTO>(`task/${id}`);
  }

  createTask(param: TaskDTO): Observable<TaskDTO> {
    return this.httpService.post<TaskDTO>('task', param);
  }

  editTask(param: TaskDTO): Observable<TaskDTO> {
    return this.httpService.put<TaskDTO>(`task/${param.id}`, param);
  }

  deleteTask(id: number): Observable<TaskDTO> {
    return this.httpService.delete<TaskDTO>(`task/${id}`);
  }
}
