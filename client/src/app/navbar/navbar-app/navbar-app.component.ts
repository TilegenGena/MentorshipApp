import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { UserModalComponent } from 'src/app/components/user-modal/user-modal/user-modal.component';
import { FakeUserService } from 'src/app/fake-login/fake-login.service';
import { UserDTO } from 'src/app/interfaces/user';
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

  constructor(
    private userService: UserService,
    private ModalService: NgbModal,
    private menteeService: SharedService,
    private fakeUserService: FakeUserService,
    private router: Router
  ) {}

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
    this.fakeUserService.logout();
    this.router.navigate(['/login']);
  }
}
