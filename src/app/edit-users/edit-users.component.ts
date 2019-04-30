import { Component, OnInit } from '@angular/core';
import { Group } from '../_models/group';
import { AlertifyService } from '../_services/alertify.service';
import { GroupService } from '../_services/group.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {
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
  parsedUsers: string[] = [];
  usersText = '';
  check = false;

  constructor(private alertifyService: AlertifyService, private groupService: GroupService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // Get group
    this.group.id = +this.route.snapshot.paramMap.get('id');
    if (this.group.id === 0) {
      this.alertifyService.error('Pick a group first', false);
      this.router.navigate(['/groups']);
    } else {
      this.groupService.getGroup(this.group.id).subscribe((group: Group) => {
        if (group != null && group.id > 0) {
          console.log(group);
          this.group = group;
          this.check = this.group.allUsers;
          if (!this.check) {
            this.parseArray();
          }
        } else {
          this.alertifyService.error('Failed to load group data', false);
          this.router.navigate(['/groups']);
        }
      }, error => {
        this.alertifyService.error('Failed to connect to server', false);
        this.router.navigate(['/groups']);
      });
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
    if (this.parseTextArea()) {
      // tslint:disable-next-line:prefer-const
      let deleted: string[] = [];
      this.group.users.users.forEach(user => {
        if (!this.parsedUsers.includes(user)) {
          deleted.push(user);
        }
      });
      // tslint:disable-next-line:prefer-const
      let added: string[] = [];
      this.parsedUsers.forEach(user => {
        if (!this.group.users.users.includes(user)) {
          added.push(user);
        }
      });
      this.groupService.updateUsers(this.group.id, added, deleted).subscribe((response: boolean) => {
        if (response) {
          this.alertifyService.success('Updated "' + this.group.name + '\'s" users', true);
          if (onward) {
            this.router.navigate(['/edit/vms/' + this.group.id]);
          } else {
            this.router.navigate(['/groups']);
          }
        } else {
          this.alertifyService.error('Failed to update group users', false);
        }
      }, error => {
        this.alertifyService.error('Failed to connect to server', false);
      });
    }
  }

  parseTextArea(): boolean {
    // Turn commas and spaces into new lines and convert into an array
    this.parsedUsers = [];
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
    if (this.parsedUsers.includes(dawgtag)) {
      this.alertifyService.error(dawgtag + ' was repeated. Duplicate skipped.', false);
    } else {
      this.parsedUsers.push(dawgtag);
    }
  }

  parseArray() {
    this.usersText = '';
    this.group.users.users.forEach(user => {
      this.usersText += user + '\n';
    });
  }

}
