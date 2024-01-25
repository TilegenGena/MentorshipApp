import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskDTO } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';
import { TaskModalComponent } from '../../task-modal/task-modal/task-modal.component';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/shared.service';
import { Observable, Subscription } from 'rxjs';
import { FakeUserService } from 'src/app/fake-login/fake-login.service';
import { UserDTO } from 'src/app/interfaces/user';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [TaskService],
})
export class TaskListComponent implements OnInit {
  tasks: TaskDTO[] | undefined = [];
  private subscription!: Subscription;
  activeMenteeId!: number;
  user$: Observable<UserDTO | null | undefined> = this.fakeUserService.user$;

  constructor(
    private taskService: TaskService,
    private ngbModal: NgbModal,
    private sharedService: SharedService,
    protected fakeUserService: FakeUserService
  ) {}

  async ngOnInit(): Promise<void> {
    this.user$.subscribe(async (user) => {
      if (user && !this.fakeUserService.isMentor()) {
        this.activeMenteeId = user.id;
        this.getTasksForMentee();
      }
    });

    this.subscription = this.sharedService.menteeChanged$.subscribe(
      async (menteeId: number) => {
        this.activeMenteeId = menteeId;
        this.getTasksForMentee();
      }
    );
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
              this.getTasksForMentee();
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
        this.getTasksForMentee();
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
        this.getTasksForMentee();
      }
    });
  }

  async getTasksForMentee() {
    const tasks = await this.taskService
      .getTasks(this.activeMenteeId)
      .toPromise();
    this.tasks = tasks;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
