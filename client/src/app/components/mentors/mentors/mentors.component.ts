import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { IMentor } from 'src/app/interfaces/mentor';
import { MentorDetailsModalComponent } from 'src/app/mentor-details-modal/mentor-details-modal.component';
import { MentorshipRequestComponent } from 'src/app/mentorship-request/mentorship-request-response';
import { MentorshipService } from 'src/app/services/mentorship.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.scss'],
})
export class MentorsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'action'];
  mentors!: IMentor[];
  disableButton$!: Observable<boolean>;

  constructor(
    private mentorService: UserService,
    private ngbModal: NgbModal,
    private mentroshipService: MentorshipService
  ) {}

  async ngOnInit(): Promise<void> {
    (await this.mentorService.getMentors()).toPromise().then((mentors) => {
      if (mentors) {
        this.mentors = mentors;
      }
    });
    this.disableButton$ = this.mentroshipService.hasCurrentMentorship();
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
