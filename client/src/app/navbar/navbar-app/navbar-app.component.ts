import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModalComponent } from 'src/app/components/user-modal/user-modal/user-modal.component';
import { UserDTO } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'navbar-app-root',
  templateUrl: 'navbar-app.component.html',
  styleUrls: ['navbar-app.component.scss'],
  providers: [UserService],
})
export class NavbarAppComponent {
  user: UserDTO | undefined;
  constructor(
    private userService: UserService,
    private ModalService: NgbModal
  ) {}

  async ngOnInit(): Promise<void> {
    const user = (await this.userService.getLoggedInUser()).toPromise();
    user.then((user) => {
      this.user = user;
    });
  }

  editUser() {
    const modalRef = this.ModalService.open(UserModalComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.user = this.user;
    modalRef.result.then((result) => {
      if (result) {
        // TODO: make API call instead of reloading
        location.reload();
      }
    });
  }
}
