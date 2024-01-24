import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MentorshipRequestService } from '../services/mentorship-request.service';

@Component({
  selector: 'app-mentorship-request',
  templateUrl: './mentorship-request.component.html',
  styleUrls: ['./mentorship-request.component.scss'],
})
export class MentorshipRequestComponent implements OnInit {
  @Input() data!: any;

  requestForm!: FormGroup;
  submitting!: Promise<void>;
  constructor(
    private mentorshipRequest: MentorshipRequestService,
    protected activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.requestForm = new FormGroup({
      mentorId: new FormControl(
        this.data ? this.data.id : '',
        Validators.required
      ),
      requestMessage: new FormControl(
        this.data ? this.data.requestMessage : '',
        Validators.required
      ),
      startDate: new FormControl({
        value: this.data ? this.data.startDate : '',
      }),
      endDate: new FormControl({
        value: this.data ? this.data.endDate : '',
      }),
    });
  }

  async submitForm() {
    if (this.requestForm.valid) {
      (await this.mentorshipRequest.requestMentorship(this.requestForm.value))
        .toPromise()
        .then(() => {
          this.activeModal.close(this.requestForm.value);
        });
    }
  }
}
