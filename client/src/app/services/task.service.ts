import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private httpService: HttpClient) {}

  async getTasks(): Promise<Observable<ITask[]>> {
    return this.httpService.get<ITask[]>('task/all-task');
  }

  async getTask(id: number): Promise<Observable<ITask>> {
    return this.httpService.get<ITask>(`task/${id}`);
  }

  async createTask(param: ITask): Promise<Observable<ITask>> {
    return this.httpService.post<ITask>('task', param);
  }

  async editTask(param: ITask): Promise<Observable<ITask>> {
    return this.httpService.put<ITask>(`task/${param.id}`, param);
  }

  async deleteTask(id: number): Promise<Observable<ITask>> {
    return this.httpService.delete<ITask>(`tasks/${id}`);
  }
}
