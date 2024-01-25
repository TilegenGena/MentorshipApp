import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AdviceWallComponent } from './components/advice-wall/advice-wall/advice-wall.component';
import { MentorsComponent } from './components/mentors/mentors/mentors.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FakeLoginComponent } from './fake-login/fake-login.component';

const routes: Routes = [
  { path: 'login', component: FakeLoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'advice-wall', component: AdviceWallComponent },
  { path: 'mentors', component: MentorsComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
