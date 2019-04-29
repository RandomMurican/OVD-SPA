import { Component, OnInit } from '@angular/core';
import { Connection } from '../_models/connection';
import { Group } from '../_models/group';
import { ConnectionService } from '../_services/connection.service';
import { AlertifyService } from '../_services/alertify.service';
import { GroupService } from '../_services/group.service';

@Component({
  selector: 'app-edit-connections',
  templateUrl: './edit-connections.component.html',
  styleUrls: ['./edit-connections.component.css']
})
export class EditConnectionsComponent implements OnInit {
  group: Group = {
    id: 0,
    name: '',
    type: 'Balancing',
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
  connectionsInGroup: number[] = [];

  constructor(private connectionService: ConnectionService, private alertifyService: AlertifyService,
    private groupService: GroupService) { }

  ngOnInit() {
    if (this.groupService.editingGroup == null) {
      // redirect to groups
    } else {
      this.groupService.getGroup(this.groupService.editingGroup).subscribe((group: Group) => {
        this.group = group;
      }, error => {
        this.alertifyService.error('Failed to load group', false);
        // redirect to groups
      });
      this.connectionService.getConnections().subscribe((connections: Connection[]) => {
        this.availableConnections = connections;
        this.group.connections.forEach(connection => {
          this.connectionsInGroup.push(connection.id);
        });
      }, error => {
        this.alertifyService.error('Failed to load connections', false);
        // redirect to groups
      });
    }
  }

  update() {

  }

}
