import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  ignoreElements,
  merge,
  shareReplay,
  tap,
} from 'rxjs';
import { TaskDTO } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksForMenteeSubject$ = new Subject<TaskDTO[]>();
  tasksForMentee$ = merge(
    this.getTasks().pipe(
      tap({
        error: (err) => this.tasksForMenteeSubject$.error(err),
      }),
      ignoreElements()
    ),
    this.tasksForMenteeSubject$
  ).pipe(shareReplay(1));

  constructor(private httpService: HttpClient) {}

  getTasksAsObservable(): Observable<TaskDTO[]> {
    return this.tasksForMentee$;
  }

  getTasks(): Observable<TaskDTO[]> {
    return this.httpService
      .get<TaskDTO[]>(`task`)
      .pipe(
        tap((tasksForMentee$) =>
          this.tasksForMenteeSubject$.next(tasksForMentee$)
        )
      );
  }

  getTask(id: number): Observable<TaskDTO[]> {
    return this.httpService.get<TaskDTO[]>(`task/${id}`);
  }

  createTask(param: TaskDTO): Observable<TaskDTO[]> {
    return this.httpService
      .post<TaskDTO[]>('task', param)
      .pipe(tap((tasks) => this.tasksForMenteeSubject$.next(tasks)));
  }

  editTask(param: TaskDTO): Observable<TaskDTO[]> {
    return this.httpService
      .put<TaskDTO[]>(`task/${param.id}`, param)
      .pipe(tap((tasks) => this.tasksForMenteeSubject$.next(tasks)));
  }

  deleteTask(id: number): Observable<TaskDTO[]> {
    return this.httpService
      .delete<TaskDTO[]>(`task/${id}`)
      .pipe(tap((tasks) => this.tasksForMenteeSubject$.next(tasks)));
  }
}
