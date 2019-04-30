import { Component, OnInit } from '@angular/core';
import { GroupService } from '../_services/group.service';
import { Router, ActivatedRoute } from '@angular/router';
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
    type: 'BALANCING',
    connections: [],
    allUsers: false,
    users: {
      id: 0,
      users: []
    }
  };

  constructor(public groupService: GroupService, private router: Router,
    private cloudService: CloudService, private alertifyService: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.group.id = +this.route.snapshot.paramMap.get('id');
    if (this.group.id === 0) {
      // create new
    } else {
      this.groupService.getGroup(this.group.id).subscribe((group: Group) => {
        if (group != null) {
          this.group = group;
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

  update(onwards: boolean) {
    console.log(this.group.name);
    if (this.group.name.length === 0) {
      this.alertifyService.error('Name is mandatory', false);
    } else if (!/^[\w\-\s]+$/.test(this.group.name)) {
      this.alertifyService.error('Name can only be alphanumeric with hyphens.', false);
    } else if (this.group.max == null || this.group.max % 1 !== 0) {
      this.alertifyService.error('Max connections is invalid', false);
    } else if (this.group.max < 0) {
      this.alertifyService.error('Max connections cannot be less than 0', false);
    } else {
      this.groupService.create(this.group).subscribe((group: Group) => {
        console.log(group);
        if (group != null) {
          this.alertifyService.success('Created group ' + name, true);
          if (onwards) {
            this.router.navigate(['/edit/users/' + this.group.id]);
          } else {
            this.router.navigate(['/groups']);
          }
          return true;
        } else {
          this.alertifyService.error('Failed to create group ' + name, false);
        }
      }, error => {
        this.alertifyService.error('Couldn\'t connect to the service.', false);
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
