import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RegistrationDTO } from 'src/app/interfaces/registration';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  @Input() user!: RegistrationDTO;
  registrationForm!: FormGroup;
  submitting!: Promise<void>;

  ngOnInit() {
    this.registrationForm = new FormGroup(
      {
        id: new FormControl(),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password1: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        password2: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        bio: new FormControl(''),
        userType: new FormControl('', Validators.required),
      },
      { validators: [confirmPasswordValidator] }
    );
  }

  async submitForm() {
    //TODO need to update and connect with server endpoint
    console.log('Registered successfully');
    console.log(this.registrationForm.value);
  }
}

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value.password1 === control.value.password2
    ? null
    : { PasswordNoMatch: true };
};
