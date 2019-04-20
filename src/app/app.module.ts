import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GroupsComponent } from './groups/groups.component';
import { NewGroupComponent } from './new-group/new-group.component';
import { FormsModule } from '@angular/forms';
import { appRoutes } from './routes';
import { SessionsComponent } from './sessions/sessions.component';
import { GroupComponent } from './group/group.component';

@NgModule({
   declarations: [
      AppComponent,
      GroupsComponent,
      NewGroupComponent,
      SessionsComponent,
      GroupComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes),
      BsDropdownModule.forRoot()
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
