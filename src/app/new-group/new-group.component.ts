import { Component, OnInit } from '@angular/core';
import { GroupService } from '../_services/group.service';
import { Router } from '@angular/router';
import { CloudService } from '../_services/cloud.service';
import { Group } from '../_models/group';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {
  model: Group;
  protocols: string[] = [];
  templates: string[] = [];
  services: string[] = [];


  constructor(public groupService: GroupService, private router: Router, private cloudService: CloudService) { }

  ngOnInit() {
    this.cloudService.getProtocols().subscribe((protocols: string[]) => {
      this.protocols = protocols;
    }, error => {
      console.log(error);
      this.protocols = ['ssh', 'rdp'];
    });
    this.cloudService.getServiceOfferings().subscribe((services: string[]) => {
      this.services = services;
    }, error => {
      console.log(error);
      this.services = ['Option 1', 'Option 2', 'Option 3'];
    });
    this.cloudService.getTemplates().subscribe((templates: string[]) => {
      this.templates = templates;
    }, error => {
      console.log(error);
      this.templates = ['Option 1', 'Option 2', 'Option 3'];
    });
  }

  create() {

  }

  // Clears the entire form and backs the user out of the page
  clearForm() {
    console.log('clearing form');
    this.model.name = '';
    this.model.template = '';
  }
}
