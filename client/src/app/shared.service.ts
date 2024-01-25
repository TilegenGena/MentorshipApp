import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private menteeChanged = new Subject<number>();
  menteeChanged$ = this.menteeChanged.asObservable();

  updateSelectedMentee(menteeName: number): void {
    this.menteeChanged.next(menteeName);
  }
}
