import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  ReplaySubject,
  Subject,
  ignoreElements,
  merge,
  shareReplay,
  tap,
} from 'rxjs';
import { TaskCreateDTO, TaskUpdateDTO } from '../interfaces/task';
import { TaskDTO } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksForMenteeSubject$ = new Subject<TaskDTO[]>();
  tasksForMentorReplaySubject$ = new ReplaySubject<TaskDTO[]>(1);
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

  getTasksForMentorObservable(): Observable<TaskDTO[] | null> {
    return this.tasksForMentorReplaySubject$;
  }

  getTasksForMentor(menteeId: number): Observable<TaskDTO[]> {
    return this.httpService.get<TaskDTO[]>(`task/${menteeId}`).pipe(
      tap({
        next: (mentees) => this.tasksForMentorReplaySubject$.next(mentees),
        error: (err) => this.tasksForMentorReplaySubject$.error(err),
      })
    );
  }

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

  createTask(param: TaskCreateDTO): Observable<TaskDTO[]> {
    return this.httpService
      .post<TaskDTO[]>('task', param)
      .pipe(tap((tasks) => this.tasksForMenteeSubject$.next(tasks)));
  }

  editTask(param: TaskUpdateDTO): Observable<TaskDTO[]> {
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
