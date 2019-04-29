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
      connections: [
        {
          id: 3,
          name: 'sgs',
          maxConnections: 5,
          template: 'yes',
          service: 'yes',
          protocol: 'ssh',
        }
      ],
      users: {
        id: 1,
        users: []
      }
    },
    {
      id: 1,
      name: 'This Group',
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
          protocol: 'vnc',
        }
      ],
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
          protocol: 'rpdff',
        }
      ],
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
          protocol: 'rdp',
        },
        {
          id: 3,
          name: 'sgs',
          maxConnections: 5,
          template: 'yes',
          service: 'yes',
          protocol: 'rdp',
        }
      ],
      users: {
        id: 1,
        users: []
      }
    }
  ];

   // tslint:disable-next-line:max-line-length
   link = 'data:image/png;base64,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';
   // link = 'https://image.shutterstock.com/image-vector/lettering-logo-nope-hand-sketched-260nw-1137744716.jpg'
  constructor() { }

  ngOnInit() { }

   conType(connections: Connection[]) {
     if (connections.length === 0) {
       this.link = 'https://image.shutterstock.com/image-vector/lettering-logo-nope-hand-sketched-260nw-1137744716.jpg';
       return 'null';
     }
     if (connections.length === 1) {
        this.link = this.getImagePath(connections[0].protocol);
       return connections[0].protocol + '.image';
     }
     const previousProtocol = connections[0].protocol;
     // tslint:disable-next-line:prefer-const
     for (let connection of connections) {
      if (connection.protocol !== previousProtocol) {
        this.link = 'http://artmixedup.com/wp-content/uploads/2016/10/word_mixed.png';
        return 'mixed.image';
      }
     }
     this.link = this.getImagePath(previousProtocol);
     return previousProtocol + '.image';
     }
    getImagePath(con: string) {
      if (con === 'rdp') {
      // tslint:disable-next-line:max-line-length
      return 'data:image/png;base64,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';
      }
      if (con === 'vnc') {
        // tslint:disable-next-line:max-line-length
        return 'data:image/png;base64,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';
      }
      if (con === 'ssh') {
        return 'https://s24255.pcdn.co/wp-content/uploads/2016/11/ssh.png';
      }
      return 'https://image.shutterstock.com/image-vector/lettering-logo-nope-hand-sketched-260nw-1137744716.jpg';
    }
  }