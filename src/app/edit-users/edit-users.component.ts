import { Component, OnInit } from '@angular/core';
import { Group } from '../_models/group';
import { AlertifyService } from '../_services/alertify.service';
import { GroupService } from '../_services/group.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {
  group: Group = {
    id: 0,
    name: 'Group Name',
    type: 'Orginizational',
    affinity: false,
    total: 0,
    max: 1,
    connections: [],
    users: {
      id: 1,
      users: [
        'SIU853656388',
        'SIU852499440',
        'SIU853629603'
      ]
    }
  };
  users = '';
  check = false;

  constructor(private alertifyService: AlertifyService, private groupService: GroupService) { }

  ngOnInit() {
    this.parseArray();
  }

  update() {
    this.users = this.users.trim();
    this.parseTextArea();
    if (this.group.name.length === 0) {
      this.alertifyService.error('Name is mandatory', false);
    } else if (!/^[\w\-\s]+$/.test(this.group.name)) {
      this.alertifyService.error('Name can only be alphanumeric with hyphens.', false);
    } else if (this.group.total < 0) {
      this.alertifyService.error('Max connections cannot be negative', false);
    } else if (this.group.total < 0) {
      this.alertifyService.error('Total VMs cannot be negative', false);
    } else if (this.group.total % 1 !== 0) {
      this.alertifyService.error('Max connections is invalid', false);
    } else if (this.group.total % 1 !== 0) {
      this.alertifyService.error('Total VMs is invalid', false);
    } else if (this.group.users.users.length === 0) {
      this.alertifyService.error('No users were given', false);
    } else if (this.parseTextArea()) {
      const name = this.group.name;
      // If connections is 0, set to null
      this.groupService.create(this.group).subscribe((response: boolean) => {
        if (response) {
          this.alertifyService.success('Created group ' + name, true);
        } else {
          this.alertifyService.error('Failed to create group ' + name, false);
        }
      }, error => {
        this.alertifyService.error('Couldn\'t connect to the service.', false);
      });
    }
  }

  clearForm() { }

  parseTextArea(): boolean {
    // Turn commas and spaces into new lines and convert into an array
    this.group.users.users = [];
    const dawgtags = this.users.replace(/,/gi, '\n').replace(/ /gi, '\n').trim().toLowerCase().split('\n');
    for (let index = 0; index < dawgtags.length; index++) {
      if (/^[0-9]{7}$/.test(dawgtags[index])) {
        this.addDawgtag('siu85' + dawgtags[index]);
      } else if (/^85[0-9]{7}$/.test(dawgtags[index])) {
        this.addDawgtag('siu' + dawgtags[index]);
      } else if (/^[s][i][u]85[0-9]{7}$/.test(dawgtags[index])) {
        this.addDawgtag(dawgtags[index]);
      } else if (dawgtags[index] === '') {
        // Skip white space
      } else {
        this.alertifyService.error(dawgtags[index] + ' is not a dawgtag.', false);
        return false;
      }
    }
    return true;
  }

  addDawgtag(dawgtag: string) {
    if (this.group.users.users.includes(dawgtag)) {
      this.alertifyService.error(dawgtag + ' was repeated. Duplicate skipped.', false);
    } else {
      this.group.users.users.push(dawgtag);
    }
  }

  parseArray() {
    this.users = '';
    this.group.users.users.forEach(user => {
      this.users += user + '\n';
    });
  }

}
