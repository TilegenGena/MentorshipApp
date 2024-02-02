import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { MentorshipRequestModalComponent } from 'src/app/components/mentorship-request-modal/mentorship-request-modal.component';
import { UserModalComponent } from 'src/app/components/user-modal/user-modal/user-modal.component';
import { Mentorship } from 'src/app/interfaces/mentorship-request';
import { TaskDTO } from 'src/app/interfaces/task';
import { UserDTO } from 'src/app/interfaces/user';
import { MentorshipService } from 'src/app/services/mentorship.service';
import { SelectedMenteeService } from 'src/app/services/selected-mentee.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'navbar-app-root',
  templateUrl: 'navbar-app.component.html',
  styleUrls: ['navbar-app.component.scss'],
  providers: [UserService],
})
export class NavbarAppComponent {
  userProfile: UserDTO | undefined | null;
  selectedMenteeName: string = 'Mentorship';
  requests!: any[];
  length!: number;
  currentMentorship: Mentorship | undefined;
  mentees$!: Observable<UserDTO[]>;
  mentor$!: Observable<UserDTO | null>;
  mentee$!: Observable<UserDTO | null>;

  tasksForMentor$!: Observable<TaskDTO[]>;
  menteesForMentor$!: Observable<UserDTO[] | null>;

  constructor(
    private userService: UserService,
    private ModalService: NgbModal,
    private selectedMenteeService: SelectedMenteeService,
    private router: Router,
    private authService: AuthService,
    private mentorshipService: MentorshipService,
    private spinnerService: NgxSpinnerService
  ) {
    this.mentees$ = this.userService.getMenteesAsObservable();
  }

  async ngOnInit(): Promise<void> {
    this.mentor$ = this.userService.getLoggedInMentorAsObservable().pipe(
      tap((user) => {
        this.userProfile = user;
        this.menteesForMentor$ = this.userService.getMenteesForMentor().pipe(
          tap((mentees) => {
            if (mentees.length) {
              this.selectedMenteeName = `${mentees[0].firstName} ${mentees[0].lastName}`;
              this.selectedMenteeService.updateSelectedMentee(mentees[0].id);
            }
          })
        );
      })
    );

    this.mentee$ = this.userService.getLoggedInMenteeAsObservable().pipe(
      tap((user) => {
        if (user) {
          this.userProfile = user;
          this.getCurrentMentorship();
        }
      })
    );
  }

  onSelectMentee(mentee: any): void {
    this.selectedMenteeName = `${mentee.firstName} ${mentee.lastName}`;
    this.selectedMenteeService.updateSelectedMentee(mentee.id);
  }

  editUser() {
    const modalRef = this.ModalService.open(UserModalComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.user = this.userProfile;
    modalRef.result.then(async (result) => {
      if (result) {
        this.userProfile = result;
      }
    });
  }

  logout() {
    this.authService.logOut().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  openNotification() {
    const modalRef = this.ModalService.open(MentorshipRequestModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.requests = this.requests;
    modalRef.componentInstance.length = this.length;
  }

  getCurrentMentorship() {
    this.mentorshipService
      .getCurrentMentorship()
      .toPromise()
      .then((currentMentorship) => {
        if (currentMentorship) {
          this.currentMentorship = currentMentorship;
        }
      });
  }
}
