import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { appRoutes } from './routes';

import { AppComponent } from './app.component';
import { GroupsComponent } from './groups/groups.component';
import { NewGroupComponent } from './new-group/new-group.component';
import { SessionsComponent } from './sessions/sessions.component';
import { GroupComponent } from './group/group.component';
import { NavComponent } from './nav/nav.component';
import { ActivityComponent } from './activity/activity.component';
import { UserComponent } from './user/user.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { EditConnectionsComponent } from './edit-connections/edit-connections.component';
import { NewConnectionComponent } from './new-connection/new-connection.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

@NgModule({
   declarations: [
      AppComponent,
      GroupsComponent,
      NewGroupComponent,
      SessionsComponent,
      GroupComponent,
      NavComponent,
      ActivityComponent,
      UserComponent,
      EditUsersComponent,
      EditConnectionsComponent,
      NewConnectionComponent,
      DashboardComponent,
      HomeComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes),
      BsDropdownModule.forRoot(),
      ChartsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
