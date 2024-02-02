import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRootComponent } from './login-root/login-root.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RegistrationComponent } from '../components/registration/registration.component';

@NgModule({
  declarations: [LoginRootComponent, RegistrationComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxSpinnerModule],
})
export class NoAuthModule {}
