import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMentor } from 'src/app/interfaces/mentor';
import { MentorDetailsModalComponent } from 'src/app/mentor-details-modal/mentor-details-modal.component';
import { MentorshipRequestComponent } from 'src/app/mentorship-request/mentorship-request-response';
import { MentorService } from 'src/app/services/mentor.service';

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.scss'],
})
export class MentorsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'action'];
  mentors!: IMentor[];

  constructor(
    private mentorService: MentorService,
    private ngbModal: NgbModal
  ) {}

  async ngOnInit(): Promise<void> {
    (await this.mentorService.getMentors()).toPromise().then((mentors) => {
      if (mentors) {
        this.mentors = mentors;
      }
    });
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
