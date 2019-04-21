import { Component, OnInit } from '@angular/core';
import { GroupService } from '../_services/group.service';
import { Router } from '@angular/router';
import { CloudService } from '../_services/cloud.service';
import { Newgroup } from '../_models/newgroup';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {
  model: Newgroup = {
    name: '',
    total: 0,
    serviceoffering: '',
    protocol: '',
    template: '',
    hotspares: 0,
    max: 0
  };
  protocols: string[] = [];
  templates: string[] = [];
  services: string[] = [];


  constructor(public groupService: GroupService, private router: Router, private cloudService: CloudService) { }

  ngOnInit() {
    this.cloudService.getProtocols().subscribe((protocols: string[]) => {
      this.protocols = protocols;
      this.model.protocol = this.protocols[0];
    }, error => {
      console.log(error);
      this.protocols = ['ssh', 'rdp'];
      this.model.protocol = this.protocols[0];
    });
    this.cloudService.getServiceOfferings().subscribe((services: string[]) => {
      this.services = services;
      this.model.serviceoffering = this.services[0];
    }, error => {
      console.log(error);
      this.services = ['Fake 1', 'Fake 2', 'Fake 3'];
      this.model.serviceoffering = this.services[0];
    });
    this.cloudService.getTemplates().subscribe((templates: string[]) => {
      this.templates = templates;
      this.model.template = this.templates[0];
    }, error => {
      console.log(error);
      this.templates = ['Fake 1', 'Fake 2', 'Fake 3'];
      this.model.template = this.templates[0];
    });
  }

  create() {
    if (this.model.name.length === 0) {
      console.log('No name included for CREATE');
    }
    this.groupService.create(this.model);
  }

  // Clears the entire form and backs the user out of the page
  clearForm() {
    console.log('clearing form');
    this.model.name = '';
    this.model.total = 0;
    this.model.serviceoffering = '';
    this.model.protocol = '';
    this.model.template = '';
    this.model.hotspares = 0;
    this.model.max = 0;
  }
}
