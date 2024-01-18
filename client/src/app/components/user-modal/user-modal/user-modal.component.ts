import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDTO } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
  @Input() user!: UserDTO;

  userForm!: FormGroup;
  submitting!: Promise<void>;
  constructor(
    private userService: UserService,
    protected activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.userForm = new FormGroup({
      id: new FormControl(this.user.id),
      firstName: new FormControl(
        this.user ? this.user.firstName : '',
        Validators.required
      ),
      lastName: new FormControl(
        this.user ? this.user.lastName : '',
        Validators.required
      ),
      email: new FormControl({
        value: this.user ? this.user.email : '',
        disabled: true,
      }),
      bio: new FormControl(this.user ? this.user.bio : '', Validators.required),
      userType: new FormControl({
        value: this.user ? this.user.userType : '',
        disabled: true,
      }),
    });
  }

  async submitForm() {
    if (this.userForm.valid) {
      (await this.userService.editUser(this.userForm.value))
        .toPromise()
        .then(() => {
          this.activeModal.close(this.userForm.value);
        });
    }
  }
}
