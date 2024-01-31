import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskDTO } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';
import { TaskModalComponent } from '../../task-modal/task-modal/task-modal.component';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { FakeUserService } from 'src/app/fake-login/fake-login.service';
import { UserDTO } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [TaskService],
})
export class TaskListComponent implements OnInit {
  tasks: TaskDTO[] | undefined = [];
  activeMenteeId!: number;
  user$: Observable<UserDTO | null | undefined> =
    this.authService.getLoggedInUser();
  tasks$!: Observable<TaskDTO[]>;

  constructor(
    private taskService: TaskService,
    private ngbModal: NgbModal,
    protected fakeUserService: FakeUserService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.tasks$ = this.taskService.getTasksAsObservable();
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
        this.taskService.deleteTask(id).subscribe();
        Swal.fire({
          title: 'Deleted!',
          text: 'Item has been deleted.',
          icon: 'success',
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
    modalRef.result.then((value) => {
      if (value) {
        this.taskService.editTask(value).subscribe();
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
        this.taskService.createTask(result).subscribe();
      }
    });
  }
}
