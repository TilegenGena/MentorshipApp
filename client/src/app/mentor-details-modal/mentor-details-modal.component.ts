import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IMentor } from '../interfaces/mentor';

@Component({
  selector: 'app-mentor-details-modal',
  templateUrl: './mentor-details-modal.component.html',
  styleUrls: ['./mentor-details-modal.component.scss'],
})
export class MentorDetailsModalComponent {
  @Input() mentor!: IMentor;
  taskForm!: FormGroup;
  submitting!: Promise<void>;
  currentMentor!: IMentor;
  constructor(protected activeModal: NgbActiveModal) {}
}
