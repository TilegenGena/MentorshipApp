import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRootComponent } from './login-root/login-root.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [LoginRootComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxSpinnerModule],
})
export class NoAuthModule {}
