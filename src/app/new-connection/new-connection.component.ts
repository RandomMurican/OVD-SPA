import { Component, OnInit } from '@angular/core';
import { Connection } from '../_models/connection';
import { CloudService } from '../_services/cloud.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-new-connection',
  templateUrl: './new-connection.component.html',
  styleUrls: ['./new-connection.component.css']
})
export class NewConnectionComponent implements OnInit {
  model: Connection = {
    id: 0,
    name: '',
    maxConnections: 0,
    template: '',
    service: '',
    protocol: ''
  };
  protocols: string[] = [];
  templates: string[] = [];
  services: string[] = [];
  total = 1;

  constructor(private cloudService: CloudService, private alertifyService: AlertifyService) { }

  ngOnInit() {
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
      this.model.service = this.services[0];
    }, error => {
      this.alertifyService.error('Failed to load available service offerings.', false);
      this.services = [''];
      this.model.service = this.services[0];
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

  }

  clearForm() {

  }

}
