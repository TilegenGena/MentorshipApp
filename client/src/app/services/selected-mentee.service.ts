import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectedMenteeService {
  public menteeChanged = new Subject<number>();
  menteeChanged$ = this.menteeChanged.asObservable();

  updateSelectedMentee(menteeId: number): void {
    this.menteeChanged.next(menteeId);
  }
}
