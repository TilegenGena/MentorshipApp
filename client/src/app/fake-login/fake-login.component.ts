import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FakeUserService } from './fake-login.service';

@Component({
  selector: 'app-login',
  template: `
    <div>
      <h2>Login</h2>
      <form (ngSubmit)="login()">
        <mat-form-field appearance="fill">
          <mat-label>Enter your User ID</mat-label>
          <input
            matInput
            type="text"
            [(ngModel)]="userId"
            name="userId"
            required
          />
        </mat-form-field>
        <button class="btn btn-success" type="submit">Login</button>
      </form>
    </div>
  `,
})
export class FakeLoginComponent {
  userId!: number;

  constructor(private userService: FakeUserService, private router: Router) {}

  login() {
    this.userService.fakeLogin(this.userId).subscribe();
    this.router.navigate(['/dashboard']);
  }
}
