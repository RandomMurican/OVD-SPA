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
import { AuthGuard } from './_guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { RoleGuard } from './_guards/role.guard';
import { VmComponent } from './vm/vm.component';

export const appRoutes: Routes = [
    { path: '', component: UserComponent },
    { path: 'vm/:id', component: VmComponent },
    { path: 'login', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [RoleGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'groups', component: GroupsComponent },
            { path: 'sessions', component: SessionsComponent },
            { path: 'edit/:id', component: NewGroupComponent },
            { path: 'edit/group/:id', component: NewGroupComponent },
            { path: 'group/:id', component: GroupComponent },
            { path: 'activity', component: ActivityComponent },
            { path: 'edit/users/:id', component: EditUsersComponent },
            { path: 'edit/vms/:id', component: EditConnectionsComponent },
            { path: 'new/vm', component: NewConnectionComponent }
        ]
    },
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }

    // { path: '', component: UserComponent },
    // { path: 'vm/:id', component: VmComponent },
    // { path: 'login', component: HomeComponent },
    // { path: 'dashboard', component: DashboardComponent },
    // { path: 'groups', component: GroupsComponent },
    // { path: 'sessions', component: SessionsComponent },
    // { path: 'edit/:id', component: NewGroupComponent },
    // { path: 'edit/group/:id', component: NewGroupComponent },
    // { path: 'group/:id', component: GroupComponent },
    // { path: 'activity', component: ActivityComponent },
    // { path: 'edit/users/:id', component: EditUsersComponent },
    // { path: 'edit/vms/:id', component: EditConnectionsComponent },
    // { path: 'new/vm', component: NewConnectionComponent },
    // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];
