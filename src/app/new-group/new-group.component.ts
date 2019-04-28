import { Component, OnInit } from '@angular/core';
import { GroupService } from '../_services/group.service';
import { Router } from '@angular/router';
import { CloudService } from '../_services/cloud.service';
import { Newgroup } from '../_models/newgroup';
import { AlertifyService } from '../_services/alertify.service';
import { Group } from '../_models/group';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {
  model: Group = {
    id: 0,
    name: '',
    affinity: false,
    total: 0,
    type: '',
    connections: [],
    users: {
      id: 0,
      users: []
    }
  };


  constructor(public groupService: GroupService, private router: Router, private cloudService: CloudService,
    private alertifyService: AlertifyService) { }

  ngOnInit() { }

  update() {

  }

  // Clears the entire form and backs the user out of the page
  clearForm() {
    this.model.name = '';
    this.model.total = 1;
    this.model.affinity = false;
    this.model.type = '';
  }

}
