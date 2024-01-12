import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MentorshipAppModule } from './navbar/navbar-app.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdviceWallComponent } from './advice-wall/advice-wall.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AdviceWallComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    MentorshipAppModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
