import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITask } from 'src/app/interfaces/task';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent {
  @Input() task!: ITask;
  taskForm!: FormGroup;
  constructor(protected activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.taskForm = new FormGroup({
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

  submitForm() {
    if (this.taskForm.valid) {
      this.activeModal.close(this.taskForm.value);
    }
  }
}
