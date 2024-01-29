import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, interval } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { MentorshipRequestModalComponent } from 'src/app/components/mentorship-request-modal/mentorship-request-modal.component';
import { UserModalComponent } from 'src/app/components/user-modal/user-modal/user-modal.component';
import { FakeUserService } from 'src/app/fake-login/fake-login.service';
import { UserDTO } from 'src/app/interfaces/user';
import { RequestResponseService } from 'src/app/request-response.service';
import { UserService } from 'src/app/services/user.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'navbar-app-root',
  templateUrl: 'navbar-app.component.html',
  styleUrls: ['navbar-app.component.scss'],
  providers: [UserService],
})
export class NavbarAppComponent {
  userProfile: UserDTO | undefined | null;
  mentees!: UserDTO[] | undefined;
  selectedMenteeName: string = 'Mentorship';
  user$: Observable<UserDTO | null | undefined> = this.fakeUserService.user$;
  requests!: any[];
  length!: number;

  constructor(
    private userService: UserService,
    private ModalService: NgbModal,
    private menteeService: SharedService,
    private fakeUserService: FakeUserService,
    private router: Router,
    private requestService: RequestResponseService,
    private authService: AuthService
  ) {
    // TODO: Decrease it to 10 seconds
    interval(1000000).subscribe((x) => {
      this.user$.subscribe((user) => {
        if (user) {
          if (user?.userType === 'Mentor') {
            this.requestService.getRequest(user.id).subscribe((requests) => {
              this.requests = requests;
              this.length = requests.length;
            });
          } else {
            this.requestService.getRequest(user.id).subscribe((requests) => {});
          }
        }
      });
    });
  }

  async ngOnInit(): Promise<void> {
    this.user$.subscribe(async (user) => {
      this.userProfile = user;
      if (user && this.fakeUserService.isMentor()) {
        const mentees = await this.userService
          .getMenteesForMentor(user.id)
          .toPromise();

        this.mentees = mentees;
      }
    });
  }

  onSelectMentee(mentee: any): void {
    this.selectedMenteeName = mentee.firstName + ' ' + mentee.lastName;
    this.menteeService.updateSelectedMentee(mentee.id);
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
}
