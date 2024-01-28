import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRootComponent } from './login-root/login-root.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginRootComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class NoAuthModule {}
