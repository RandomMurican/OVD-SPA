import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { Usergroup } from '../_models/usergroup';
import { Group } from '../_models/group';
import { Connection } from '../_models/connection';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  groups: Group[] = [
    {
      id: 0,
      name: 'Group Name',
      type: 'Orginizational',
      affinity: false,
      total: 0,
      max: 1,
      connections: [],
      users: {
        id: 1,
        users: []
      }
    },
    {
      id: 1,
      name: 'Other Group',
      type: 'Orginizational',
      affinity: false,
      total: 0,
      max: 1,
      connections: [],
      users: {
        id: 1,
        users: []
      }
    },
    {
      id: 2,
      name: 'Some Name',
      type: 'Orginizational',
      affinity: false,
      total: 0,
      max: 1,
      connections: [],
      users: {
        id: 1,
        users: []
      }
    },
    {
      id: 3,
      name: 'Square',
      type: 'Orginizational',
      affinity: false,
      total: 0,
      max: 1,
      connections: [
        {
          id: 3,
          name: 'sgs',
          maxConnections: 5,
          template: 'yes',
          service: 'yes',
          protocol: 'rpd',
        },
        {
          id: 3,
          name: 'sgs',
          maxConnections: 5,
          template: 'yes',
          service: 'yes',
          protocol: 'rpfdsfd',
        }
      ],
      users: {
        id: 1,
        users: []
      }
    }
  ];

  constructor() { }

  ngOnInit() { }

   conType(connections: Connection[]) {
     if (connections.length === 0){
       return 'null';
     }
     if (connections.length === 1){
       return connections[0].protocol;
     }
     const previousProtocol = connections[0].protocol;
     for (let connection of connections){
      if (connection.protocol != previousProtocol){
        return 'mixed';
      } 
     }
     return previousProtocol;
     }
  }
