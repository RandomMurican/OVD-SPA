import { Component, OnInit } from '@angular/core';
import { Group } from '../_models/group';
import { AlertifyService } from '../_services/alertify.service';
import { GroupService } from '../_services/group.service';
import { Router } from '@angular/router';
import { groupBy } from 'rxjs/operators';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {
  group: Group = {
    id: 0,
    name: 'Group Name for Test',
    type: 'Orginizational',
    affinity: false,
    max: 1,
    connections: [],
    allUsers: true,
    users: {
      id: 1,
      users: [
        'SIU853656388',
        'SIU852499440',
        'SIU853629603'
      ]
    }
  };
  usersText = '';
  check = false;

  constructor(private alertifyService: AlertifyService, private groupService: GroupService,
    private router: Router) { }

  ngOnInit() {
    // Get group
    this.check = this.group.allUsers;
    if (!this.check) {
      this.parseArray();
    }
  }

  changed() {
    this.group.allUsers = this.check;
    if (this.check) {
      this.usersText = '';
    } else {
      this.parseArray();
    }
  }

  update(onward: boolean) {
    this.usersText = this.usersText.trim();
    this.parseTextArea();
    if (this.parseTextArea()) {
      const name = this.group.name;
      // If connections is 0, set to null
      // Add users to group here
      this.alertifyService.success('Pretending like Updated users in "' + this.group.name + '"', true);
      if (onward) {
        this.router.navigate(['/edit/vms']);
      } else {
        // this.router.navigate(['/groups']);
      }
    }
  }

  clearForm() { }

  parseTextArea(): boolean {
    // Turn commas and spaces into new lines and convert into an array
    this.group.users.users = [];
    const dawgtags = this.usersText.replace(/,/gi, '\n').replace(/ /gi, '\n').trim().toLowerCase().split('\n');
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
    this.usersText = '';
    this.group.users.users.forEach(user => {
      this.usersText += user + '\n';
    });
  }

}
