import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { IMentor } from 'src/app/interfaces/mentor';
import { MentorDetailsModalComponent } from 'src/app/mentor-details-modal/mentor-details-modal.component';
import { MentorshipRequestComponent } from 'src/app/mentorship-request/mentorship-request-response';
import { RequestResponseService } from 'src/app/request-response.service';
import { MentorService } from 'src/app/services/mentor.service';

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.scss'],
})
export class MentorsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'action'];
  mentors!: IMentor[];
  data$!: Observable<any>;
  disableButton$!: Observable<boolean>;

  constructor(
    private mentorService: MentorService,
    private ngbModal: NgbModal,
    private requestResponseService: RequestResponseService
  ) {}

  async ngOnInit(): Promise<void> {
    (await this.mentorService.getMentors()).toPromise().then((mentors) => {
      if (mentors) {
        this.mentors = mentors;
      }
    });
    this.disableButton$ = this.requestResponseService.hasCurrentMentorship();
  }

  seeDetails(mentor: IMentor) {
    const modalRef = this.ngbModal.open(MentorDetailsModalComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.mentor = mentor;
  }

  requestMentorship(data: any) {
    const modalRef = this.ngbModal.open(MentorshipRequestComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.data = data;
  }
}
