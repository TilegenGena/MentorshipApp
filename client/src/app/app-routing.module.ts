import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdviceWallComponent } from './advice-wall/advice-wall.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'advice-wall', component: AdviceWallComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
