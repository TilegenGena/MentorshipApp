import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentorshipAppRootComponent } from '../mentorship-app-root/mentorship-app-root.component';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [MentorshipAppRootComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
  ], 
  exports: [
    MentorshipAppRootComponent
  ]
})
export class MentorshipAppModule { }
