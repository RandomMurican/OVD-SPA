import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Group } from '../_models/group';
import { GroupService } from '../_services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  group: Group[] = [];

  constructor(private route: ActivatedRoute, private groupService: GroupService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadGroup(id);
  }

  loadGroup(id: number | string) {
    this.groupService.getGroups().subscribe((groups: Group[]) => {
      const index = groups.findIndex((group: Group) => {
        return group.id === +id;
      });
      this.group.push(groups[index]);
    }, error => {
      console.log('ERROR: ' + error);
    });
  }

}
