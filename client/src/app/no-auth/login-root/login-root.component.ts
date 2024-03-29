import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login-root',
  templateUrl: './login-root.component.html',
  styleUrls: ['./login-root.component.scss'],
})
export class LoginRootComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submitLoginForm() {
    if (this.loginForm.valid) {
      this.spinnerService.show();
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.authService.logIn(email, password).subscribe((user) => {
        this.router.navigate(['/dashboard']);
        this.spinnerService.hide();
      });
    }
  }
}
