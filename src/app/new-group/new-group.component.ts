import { Component, OnInit } from '@angular/core';
import { GroupService } from '../_services/group.service';
import { Router } from '@angular/router';
import { CloudService } from '../_services/cloud.service';
import { Newgroup } from '../_models/newgroup';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {
  model: Newgroup = {
    name: '',
    total: 1,
    serviceoffering: '',
    protocol: '',
    template: '',
    hotspares: 0,
    max: 1,
    dawgtags: []
  };
  users = '';
  protocols: string[] = [];
  templates: string[] = [];
  services: string[] = [];


  constructor(public groupService: GroupService, private router: Router, private cloudService: CloudService,
    private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.parseArray();
    this.cloudService.getProtocols().subscribe((protocols: string[]) => {
      this.protocols = protocols;
      this.model.protocol = this.protocols[0];
    }, error => {
      this.alertifyService.error('Failed to load available protocols.', false);
      this.protocols = [''];
      this.model.protocol = this.protocols[0];
    });
    this.cloudService.getServiceOfferings().subscribe((services: string[]) => {
      this.services = services;
      this.model.serviceoffering = this.services[0];
    }, error => {
      this.alertifyService.error('Failed to load available service offerings.', false);
      this.services = [''];
      this.model.serviceoffering = this.services[0];
    });
    this.cloudService.getTemplates().subscribe((templates: string[]) => {
      this.templates = templates;
      this.model.template = this.templates[0];
    }, error => {
      this.alertifyService.error('Failed to load available templates.', false);
      this.templates = [''];
      this.model.template = this.templates[0];
    });
  }

  create() {
    this.users = this.users.trim();
    this.parseTextArea();
    if (this.model.name.length === 0) {
      this.alertifyService.error('Name is mandatory', false);
    } else if (!/^[\w\-\s]+$/.test(this.model.name)) {
      this.alertifyService.error('Name can only be alphanumeric with hyphens.', false);
    } else if (this.model.hotspares < 0) {
      this.alertifyService.error('Hotspares cannot be negative', false);
    } else if (this.model.max < 0) {
      this.alertifyService.error('Max connections cannot be negative', false);
    } else if (this.model.total < 0) {
      this.alertifyService.error('Total VMs cannot be negative', false);
    } else if (this.model.hotspares % 1 !== 0) {
      this.alertifyService.error('Hotspares is invalid', false);
    } else if (this.model.max % 1 !== 0) {
      this.alertifyService.error('Max connections is invalid', false);
    } else if (this.model.total % 1 !== 0) {
      this.alertifyService.error('Total VMs is invalid', false);
    } else if (this.model.dawgtags.length === 0) {
      this.alertifyService.error('No users were given', false);
    } else {
      let test = true;
      for (const dawgtag in this.model.dawgtags) {
        if (!/^[Ss][Ii][Uu]85[0-9]{7}$/.test(this.model.dawgtags[dawgtag])) {
          this.alertifyService.error(this.model.dawgtags[dawgtag] + ' is not a dawgtag.', false);
          test = false;
          break;
        }
      }
      if (test) {
        const name = this.model.name;
        this.groupService.create(this.model).subscribe((response: boolean) => {
          if (response) {
            this.alertifyService.success('Created group ' + name, true);
            this.router.navigate(['/groups']);
          } else {
            this.alertifyService.error('Failed to create group ' + name, false);
          }
        }, error => {
          this.alertifyService.error('Failed to create group ' + name, false);
        });
      }
    }
  }

  // Clears the entire form and backs the user out of the page
  clearForm() {
    this.model.name = '';
    this.model.total = 1;
    this.model.serviceoffering = '';
    this.model.protocol = '';
    this.model.template = '';
    this.model.hotspares = 0;
    this.model.max = 1;
    this.model.dawgtags = [];
  }

  parseArray() {
    this.users = '';
    this.model.dawgtags.forEach(user => {
      this.users += user + '\n';
    });
  }

  parseTextArea() {
    // Turn commas and spaces into new lines and convert into an array
    this.model.dawgtags = this.users.replace(/,/gi, '\n').replace(/ /gi, '\n').trim().toLowerCase().split('\n');
    let len = this.model.dawgtags.length;
    for (let index = 0; index < len; index++) {
      if (this.model.dawgtags[index] === '') {
        this.model.dawgtags.splice(index, 1);
        index--; len--;
      } else {
        this.model.dawgtags[index] = this.model.dawgtags[index].trim();
      }
    }
  }
}
