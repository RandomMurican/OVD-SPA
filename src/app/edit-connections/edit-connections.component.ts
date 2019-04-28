import { Component, OnInit } from '@angular/core';
import { Connection } from '../_models/connection';

@Component({
  selector: 'app-edit-connections',
  templateUrl: './edit-connections.component.html',
  styleUrls: ['./edit-connections.component.css']
})
export class EditConnectionsComponent implements OnInit {
  availableConnections: Connection[] = [
    {
      id: 1,
      name: 'Virtual Machine 1',
      maxConnections: 0,
      template: '',
      service: '',
      protocol: ''
    },
    {
      id: 2,
      name: 'Virtual Machine 2',
      maxConnections: 0,
      template: '',
      service: '',
      protocol: ''
    },
    {
      id: 3,
      name: 'Ubuntu Machine 1',
      maxConnections: 0,
      template: '',
      service: '',
      protocol: ''
    },
    {
      id: 4,
      name: 'Ubuntu Machine 2',
      maxConnections: 0,
      template: '',
      service: '',
      protocol: ''
    },
    {
      id: 5,
      name: 'Ubuntu Machine 2',
      maxConnections: 0,
      template: '',
      service: '',
      protocol: ''
    },
    {
      id: 6,
      name: 'Ubuntu Machine 2',
      maxConnections: 0,
      template: '',
      service: '',
      protocol: ''
    },
    {
      id: 7,
      name: 'Ubuntu Machine 2',
      maxConnections: 0,
      template: '',
      service: '',
      protocol: ''
    },
    {
      id: 8,
      name: 'Ubuntu Machine 2',
      maxConnections: 0,
      template: '',
      service: '',
      protocol: ''
    }
  ];
  connectionsInGroup: number[] = [2, 4];
  groupName = 'Test Group for Edit';

  constructor() { }

  ngOnInit() { }

  update() {

  }

}
