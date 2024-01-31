import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AdviceWallComponent } from './components/advice-wall/advice-wall/advice-wall.component';
import { MentorsComponent } from './components/mentors/mentors/mentors.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginRootComponent } from './no-auth/login-root/login-root.component';
import { AuthService } from './auth.service';

const authGuard = () => inject(AuthService).requireLoggedInGuard();

const routes: Routes = [
  { path: 'login', component: LoginRootComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'advice-wall',
    component: AdviceWallComponent,
    canActivate: [authGuard],
  },
  { path: 'mentors', component: MentorsComponent, canActivate: [authGuard] },
  { path: 'registration', component: RegistrationComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
