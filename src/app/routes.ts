import { Routes } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { NewGroupComponent } from './new-group/new-group.component';
import { SessionsComponent } from './sessions/sessions.component';
import { GroupComponent } from './group/group.component';
import { ActivityComponent } from './activity/activity.component';
import { UserComponent } from './user/user.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { EditConnectionsComponent } from './edit-connections/edit-connections.component';
import { NewConnectionComponent } from './new-connection/new-connection.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const appRoutes: Routes = [
    { path: '', component: GroupsComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'sessions', component: SessionsComponent },
    { path: 'edit/group', component: NewGroupComponent },
    { path: 'group/:id', component: GroupComponent },
    { path: 'activity', component: ActivityComponent },
    { path: 'user', component: UserComponent },
    { path: 'edit/users', component: EditUsersComponent },
    { path: 'edit/vms', component: EditConnectionsComponent },
    { path: 'new/vm', component: NewConnectionComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
