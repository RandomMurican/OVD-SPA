import { Routes } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { NewGroupComponent } from './new-group/new-group.component';
import { SessionsComponent } from './sessions/sessions.component';
import { GroupComponent } from './group/group.component';
import { ActivityComponent } from './activity/activity.component';

export const appRoutes: Routes = [
    { path: '', component: GroupsComponent },
    { path: 'sessions', component: SessionsComponent },
    { path: 'new', component: NewGroupComponent },
    { path: 'group/:id', component: GroupComponent },
    { path: 'activity', component: ActivityComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
