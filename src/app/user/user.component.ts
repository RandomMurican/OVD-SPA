import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { Usergroup } from '../_models/usergroup';

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
      connections: [],
      users: {}
    },
    {
      id: 1,
      name: 'Other Group',
      type: 'Orginizational',
      affinity: false,
      total: 0,
      connections: [],
      users: {}
    },
    {
      id: 2,
      name: 'Some Name',
      type: 'Orginizational',
      affinity: false,
      total: 0,
      connections: [],
      users: {}
    },
    {
      id: 3,
      name: 'Square',
      type: 'Orginizational',
      affinity: false,
      total: 0,
      connections: [],
      users: {}
    }
  ];

  constructor() { }

  ngOnInit() { }

}
