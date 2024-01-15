import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITask } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';
import { TaskModalComponent } from '../../task-modal/task-modal/task-modal.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [TaskService],
})
export class TaskListComponent {
  tasks: ITask[] | undefined = [];
  constructor(private taskService: TaskService, private ngbModal: NgbModal) {}

  createTask() {
    const modalRef = this.ngbModal.open(TaskModalComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.result.then((result) => {
      console.log(result);
    });
  }
}
