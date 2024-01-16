import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskDTO } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent {
  @Input() task!: TaskDTO;
  taskForm!: FormGroup;
  submitting!: Promise<void>;
  constructor(
    protected activeModal: NgbActiveModal,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.taskForm = new FormGroup({
      id: new FormControl(this.task ? this.task.id : null),
      title: new FormControl(
        this.task ? this.task.title : '',
        Validators.required
      ),
      description: new FormControl(
        this.task ? this.task.description : '',
        Validators.required
      ),
      status: new FormControl(
        this.task ? this.task.status : '',
        Validators.required
      ),
      dueDate: new FormControl(
        this.task ? this.task.dueDate : '',
        Validators.required
      ),
    });
  }

  async submitForm() {
    if (this.taskForm.valid) {
      if (!this.taskForm.value.id) {
        (await this.taskService.createTask(this.taskForm.value))
          .toPromise()
          .then(() => {
            this.activeModal.close(this.taskForm.value);
          });
      } else {
        (await this.taskService.editTask(this.taskForm.value))
          .toPromise()
          .then(() => {
            this.activeModal.close(this.taskForm.value);
          });
      }
    }
  }
}
