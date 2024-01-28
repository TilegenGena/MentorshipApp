import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationDTO } from 'src/app/interfaces/registration';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  // @Input() user!: RegistrationDTO;
  registrationForm!: FormGroup;
  submitting!: Promise<void>;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.registrationForm = new FormGroup(
      {
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        password2: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        bio: new FormControl(''),
        userType: new FormControl('', Validators.required),
      },
      { validators: [confirmPasswordValidator] }
    );
  }

  async submitForm() {
    if (this.registrationForm.valid) {
      this.userService.createUser(this.registrationForm.value).subscribe(() => {
        this.router.navigate(['/login']);
      });
    }
  }
}

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const password2 = control.get('password2')?.value;

  return password === password2 ? null : { PasswordNoMatch: true };
};
