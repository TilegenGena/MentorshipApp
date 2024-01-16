import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './components/task-list/task-list/task-list.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { NavbarAppComponent } from './navbar/navbar-app/navbar-app.component';
import { TaskModalComponent } from './components/task-modal/task-modal/task-modal.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    DashboardComponent,
    NavbarAppComponent,
    TaskModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent],
})
export class AppModule {}
