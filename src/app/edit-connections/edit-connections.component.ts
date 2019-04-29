import { Component, OnInit } from '@angular/core';
import { Connection } from '../_models/connection';
import { Group } from '../_models/group';

@Component({
  selector: 'app-edit-connections',
  templateUrl: './edit-connections.component.html',
  styleUrls: ['./edit-connections.component.css']
})
export class EditConnectionsComponent implements OnInit {
  group: Group = {
    id: 0,
    name: 'Group Name for Test',
    type: 'Orginizational',
    affinity: false,
    max: 1,
    connections: [
      {
        id: 2,
        name: 'Virtual Machine 2',
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
        id: 7,
        name: 'Ubuntu Machine 2',
        maxConnections: 0,
        template: '',
        service: '',
        protocol: ''
      }
    ],
    allUsers: false,
    users: {
      id: 1,
      users: [
        'SIU853656388',
        'SIU852499440',
        'SIU853629603'
      ]
    }
  };
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
  connectionsInGroup: number[] = [];

  constructor() { }

  ngOnInit() {
    this.group.connections.forEach(connection => {
      this.connectionsInGroup.push(connection.id);
    });
  }

  update() {

  }

}
