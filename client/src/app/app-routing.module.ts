import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AdviceWallComponent } from './components/advice-wall/advice-wall/advice-wall.component';
import { MentorsComponent } from './components/mentors/mentors/mentors.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'advice-wall', component: AdviceWallComponent },
  { path: 'mentors', component: MentorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
