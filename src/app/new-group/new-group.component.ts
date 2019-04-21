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
      this.protocols = ['ssh', 'rdp'];
      this.model.protocol = this.protocols[0];
    });
    this.cloudService.getServiceOfferings().subscribe((services: string[]) => {
      this.services = services;
      this.model.serviceoffering = this.services[0];
    }, error => {
      this.alertifyService.error('Failed to load available service offerings.', false);
      this.services = ['Fake 1', 'Fake 2', 'Fake 3'];
      this.model.serviceoffering = this.services[0];
    });
    this.cloudService.getTemplates().subscribe((templates: string[]) => {
      this.templates = templates;
      this.model.template = this.templates[0];
    }, error => {
      this.alertifyService.error('Failed to load available templates.', false);
      this.templates = ['Fake 1', 'Fake 2', 'Fake 3'];
      this.model.template = this.templates[0];
    });
  }

  create() {
    this.parseTextArea();
    const name = this.model.name;
    if (this.model.name.length === 0) {
      this.alertifyService.error('Invalid name', false);
    }
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
    this.model.dawgtags = this.users.split('\n');
    this.model.dawgtags.pop();
  }
}
