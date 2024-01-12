import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NavbarAppComponent } from './navbar-app/navbar-app.component';

@NgModule({
  declarations: [NavbarAppComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
  ], 
  exports: [
    NavbarAppComponent
  ]
})
export class MentorshipAppModule { }
