import { Component, OnInit } from '@angular/core';
import { GroupService } from '../_services/group.service';
import { Router } from '@angular/router';
import { CloudService } from '../_services/cloud.service';
import { AlertifyService } from '../_services/alertify.service';
import { Group } from '../_models/group';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {
  group: Group = {
    id: 0,
    name: '',
    affinity: false,
    max: 1,
    type: 'Orginizational',
    connections: [],
    allUsers: true,
    users: {
      id: 0,
      users: []
    }
  };

  constructor(public groupService: GroupService, private router: Router,
    private cloudService: CloudService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    if (this.groupService.editingGroup != null) {
      // Get group
    }
  }

  update(onwards: boolean) {
    console.log(this.group.name);
    if (this.group.name.length === 0) {
      this.alertifyService.error('Name is mandatory', false);
    } else if (!/^[\w\-\s]+$/.test(this.group.name)) {
      this.alertifyService.error('Name can only be alphanumeric with hyphens.', false);
    } else if (this.group.max == null || this.group.max % 1 !== 0) {
      this.alertifyService.error('Max connections is invalid', false);
    } else if (this.group.max < 1) {
      this.alertifyService.error('Max connections cannot be less than 1', false);
    } else {
      this.groupService.create(this.group).subscribe((group: Group) => {
        if (group != null) {
          this.alertifyService.success('Created group ' + name, true);
          this.groupService.editingGroup = group.id;
          if (onwards) {
            this.router.navigate(['/edit/users']);
          } else {
            this.router.navigate(['/groups']);
          }
          return true;
        } else {
          this.alertifyService.error('Failed to create group ' + name, false);
        }
      }, error => {
        this.alertifyService.error('Couldn\'t connect to the service.', false);
        this.alertifyService.error('REMOVE THIS DUMMY!!!', false);
        if (onwards) {
          this.router.navigate(['/edit/users']);
        } else {
          this.router.navigate(['/groups']);
        }
        return true;
      });
    }
    return false;
  }

  // Clears the entire form and backs the user out of the page
  clearForm() {
    this.group.name = '';
    this.group.max = 1;
    this.group.affinity = false;
    this.group.type = 'Orginizational';
  }

}
