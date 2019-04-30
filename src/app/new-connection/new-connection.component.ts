import { Component, OnInit } from '@angular/core';
import { Connection } from '../_models/connection';
import { CloudService } from '../_services/cloud.service';
import { AlertifyService } from '../_services/alertify.service';
import { VmService } from '../_services/vm.service';
import { Router } from '@angular/router';

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
    protocol: '',
    hasGroup: false
  };
  protocols: string[] = [];
  templates: string[] = [];
  services: string[] = [];
  total = 1;

  constructor(private cloudService: CloudService, private alertifyService: AlertifyService,
    private vmService: VmService, private router: Router) { }

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
    if (!/^[\w\-\s]+$/.test(this.model.name)) {
      this.alertifyService.error('Name can only be alphanumeric with hyphens.', false);
    } else if (this.model.maxConnections < 0 || this.model.maxConnections % 1 !== 0) {
      this.alertifyService.error('Invalid max connections.', false);
    } else if (this.total < 1 || this.total % 1 !== 0) {
      this.alertifyService.error('Invalid connection quantity.', false);
    } else {
      const name = this.model.name;
      for (let i = 0; i < this.total; i++) {
        this.model.name = name + ' ' + i;
        this.vmService.createConnection(this.model).subscribe((response: Connection) => {
          if (response != null) {
            this.alertifyService.success('Created VM ' + response.name, true);
          } else {
            this.alertifyService.error('Failed to create VM under ' + name, true);
          }
        }, error => {
          this.alertifyService.error('Couldn\'t connect to the service.', false);
        });
      }
      this.router.navigate(['/edit/vms']);
    }
  }

  clearForm() {

  }

}
