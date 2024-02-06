import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResponseMentorshipService } from 'src/app/services/response-mentorship.service';

@Component({
  selector: 'app-mentorship-response-modal',
  templateUrl: './mentorship-response-modal.component.html',
  styleUrls: ['./mentorship-response-modal.component.scss'],
})
export class MentorshipResponseModalComponent {
  @Input() responses!: any[];
  @Input() responseLength!: number;

  constructor(private responseMentorshipService: ResponseMentorshipService) {}

  activeModal = inject(NgbActiveModal);

  setNotificationAsSeen(responseId: number) {
    this.responseMentorshipService
      .setResponseAsSeen(responseId)
      .subscribe(() => {
        this.activeModal.close(responseId);
      });
  }
}
