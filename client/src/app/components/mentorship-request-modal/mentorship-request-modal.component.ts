import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-stacked',
  standalone: true,
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Details of the request</h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      ></button>
    </div>
    <div class="modal-body">
      <p>Message: {{ userInfo.requestMessage }}</p>
      <p>Start Date: {{ userInfo.startDate }}</p>
      <p>End Date: {{ userInfo.endDate }}</p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-dark"
        (click)="activeModal.close('Close click')"
      >
        Close
      </button>
    </div>
  `,
})
export class NgbdModal1Content {
  @Input() userInfo!: any;
  constructor(protected activeModal: NgbActiveModal) {}
}

import { Component, Input } from '@angular/core';
import { MentorshipRequestGetDTO } from 'src/app/interfaces/mentorship-request';
import { RequestResponseService } from 'src/app/request-response.service';

@Component({
  selector: 'app-mentorship-request-modal',
  templateUrl: './mentorship-request-modal.component.html',
  styleUrls: ['./mentorship-request-modal.component.scss'],
})
export class MentorshipRequestModalComponent {
  @Input() requests!: MentorshipRequestGetDTO[];
  @Input() length!: number;
  displayedColumns: string[] = ['fullName', 'actions'];

  constructor(
    protected activeModal: NgbActiveModal,
    private ngbModal: NgbModal,
    private requestResponseService: RequestResponseService
  ) {}

  open(userInfo: any) {
    const modalRef = this.ngbModal.open(NgbdModal1Content);
    modalRef.componentInstance.userInfo = userInfo;
  }

  accept(row: any) {
    this.requestResponseService.acceptRequest(row.id).subscribe(() => {
      this.activeModal.close();
    });
  }
}