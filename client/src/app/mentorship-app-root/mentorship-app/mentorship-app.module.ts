import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentorshipAppRootComponent } from '../mentorship-app-root.component';
import {  MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [MentorshipAppRootComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
  ], 
  exports: [
    MentorshipAppRootComponent
  ]
})
export class MentorshipAppModule { }
