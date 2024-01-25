import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskDTO } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';
import { TaskModalComponent } from '../../task-modal/task-modal/task-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [TaskService],
})
export class TaskListComponent implements OnInit {
  tasks: TaskDTO[] | undefined = [];
  constructor(private taskService: TaskService, private ngbModal: NgbModal) {}

  async ngOnInit(): Promise<void> {
    const tasks = (await this.taskService.getTasks()).toPromise();
    tasks.then((tasks) => {
      this.tasks = tasks;
    });
  }

  deleteTask(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f44336',
      cancelButtonColor: '#ff9800',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        (await this.taskService.deleteTask(id)).toPromise().then(() => {
          Swal.fire({
            title: 'Deleted!',
            text: 'Item has been deleted.',
            icon: 'success',
          }).then(async (value) => {
            if (value.isConfirmed) {
              (await this.taskService.getTasks()).toPromise().then((tasks) => {
                this.tasks = tasks;
              });
            }
          });
        });
      }
    });
  }

  editTask(task: TaskDTO) {
    const modalRef = this.ngbModal.open(TaskModalComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.task = task;
    modalRef.result.then(async (result) => {
      if (result) {
        (await this.taskService.getTasks()).toPromise().then((tasks) => {
          this.tasks = tasks;
        });
      }
    });
  }

  createTask() {
    const modalRef = this.ngbModal.open(TaskModalComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.result.then(async (result) => {
      if (result) {
        (await this.taskService.getTasks()).toPromise().then((tasks) => {
          this.tasks = tasks;
        });
      }
    });
  }
}
