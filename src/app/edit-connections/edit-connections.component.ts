import { Component, OnInit } from '@angular/core';
import { Connection } from '../_models/connection';
import { Group } from '../_models/group';
import { ConnectionService } from '../_services/connection.service';
import { AlertifyService } from '../_services/alertify.service';
import { GroupService } from '../_services/group.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-connections',
  templateUrl: './edit-connections.component.html',
  styleUrls: ['./edit-connections.component.css']
})
export class EditConnectionsComponent implements OnInit {
  group: Group = {
    id: 0,
    name: '',
    type: '',
    affinity: false,
    max: 1,
    connections: [],
    allUsers: false,
    users: {
      id: 0,
      users: []
    }
  };
  availableConnections: Connection[] = [];
  selectedConnections: number[] = [];

  constructor(private connectionService: ConnectionService, private alertifyService: AlertifyService,
    private groupService: GroupService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.group.id = +this.route.snapshot.paramMap.get('id');
    if (this.group.id === 0) {
      this.router.navigate(['/groups']);
    } else {
      this.groupService.getGroup(this.group.id).subscribe((group: Group) => {
        if (group != null && group.id > 0) {
          this.group = group;
          this.connectionService.getConnections().subscribe((connections: Connection[]) => {
            this.availableConnections = connections;
            this.group.connections.forEach(connection => {
              this.selectedConnections.push(connection.id);
            });
          }, error => {
            this.alertifyService.error('Failed to load connections', false);
            this.router.navigate(['/group/' + this.group.id]);
          });
        } else {
          this.alertifyService.error('Failed to load group', false);
          this.router.navigate(['/groups']);
        }
      }, error => {
        this.alertifyService.error('Failed to load group', false);
        this.router.navigate(['/groups']);
      });
    }
  }

  change(connection: Connection) {
    if (this.selectedConnections.includes(connection.id)) {
      this.selectedConnections.splice(this.selectedConnections.indexOf(connection.id), 1);
      connection.hasGroup = false;
    } else {
      this.selectedConnections.push(connection.id);
      connection.hasGroup = true;
    }
  }

  update() {
    // tslint:disable-next-line:prefer-const
    let connectionsRemoved = [];
    this.group.connections.forEach(connection => {
      if (!this.selectedConnections.includes(connection.id)) {
        connectionsRemoved.push(connection.id);
      }
    });
    // tslint:disable-next-line:prefer-const
    let connectionsAdded = [];
    this.selectedConnections.forEach(connection => {
      let contains = false;
      for (const conn of this.group.connections) {
        if (conn.id === connection) {
          contains = true;
          break;
        }
      }
      if (!contains) {
        connectionsAdded.push(connection);
      }
    });

    this.groupService.updateVMs(this.group.id, connectionsAdded, connectionsRemoved).subscribe((response: boolean) => {
      if (response) {
        this.alertifyService.success('Updated the group VMs', false);

      } else {
        this.alertifyService.error('Failed to update group VMs', false);
      }
    }, error => {
      this.alertifyService.error('Failed to load group', false);
    });
  }

  disabledCheck(connection: Connection) {
    if (this.selectedConnections.includes(connection.id)) {
      return false;
    }
    if (this.selectedConnections.length !== 0) {
      for (let i = 0; i < this.availableConnections.length; i++) {
        if (this.availableConnections[i].id === this.selectedConnections[0]) {
          // tslint:disable-next-line:triple-equals
          if (this.availableConnections[i].protocol == connection.protocol) {
            return connection.hasGroup;
          } else {
            return true;
          }
        }
      }
      return false;
    }
    return connection.hasGroup;
  }

}
