import { Component, OnInit } from '@angular/core';
import { GroupService } from '../_services/group.service';
import { AlertifyService } from '../_services/alertify.service';
import { Group } from '../_models/group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups: Group[] = [];
  sortedGroups: Group[] = [];
  sortParameter = 0;

  constructor(private groupService: GroupService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {
    this.groupService.getGroups().subscribe((groups: Group[]) => {
      this.groups = groups;
      this.sortGroups();
    }, error => {
      this.alertifyService.error('There was an error loading the groups.', false);
    });
  }

  sortGroups() {
    this.sortedGroups = [];
    this.groups.forEach(group => {
      if (Math.abs(this.sortParameter) === 1) {
        this.sortByNamePush(group);
      } else if (Math.abs(this.sortParameter) === 2) {
        this.sortByVmPush(group);
      } else if (Math.abs(this.sortParameter) === 3) {
        // this.sortByActivePush(group);
      } else if (Math.abs(this.sortParameter) === 4) {
        // this.sortByCpuPush(group);
      } else if (Math.abs(this.sortParameter) === 5) {
        // this.sortByRamPush(group);
      } else if (Math.abs(this.sortParameter) === 6) {
        // this.sortByDiskPush(group);
      } else {
        this.sortByIdPush(group);
      }
    });
  }

  sortByNamePush(newGroup: Group) {
    const position = this.sortedGroups.findIndex((group: Group) => {
      if (this.sortParameter > 0) {
        return group.name >= newGroup.name;
      }
      return group.name <= newGroup.name;
    });
    if (position === -1) {
      this.sortedGroups.push(newGroup);
    } else {
      this.sortedGroups.splice(position, 0, newGroup);
    }
  }

  sortByVmPush(newGroup: Group) {
    const position = this.sortedGroups.findIndex((group: Group) => {
      if (this.sortParameter > 0) {
        return group.total >= newGroup.total;
      }
      return group.total <= newGroup.total;
    });
    if (position === -1) {
      this.sortedGroups.push(newGroup);
    } else {
      this.sortedGroups.splice(position, 0, newGroup);
    }
  }

  /*
  sortByActivePush(newGroup: Group) {
    const position = this.sortedGroups.findIndex((group: Group) => {
      if (this.sortParameter > 0) {
        return group.active >= newGroup.active;
      }
      return group.active <= newGroup.active;
    });
    if (position === -1) {
      this.sortedGroups.push(newGroup);
    } else {
      this.sortedGroups.splice(position, 0, newGroup);
    }
  }

  sortByCpuPush(newGroup: Group) {
    const position = this.sortedGroups.findIndex((group: Group) => {
      if (this.sortParameter > 0) {
        return group.cpu >= newGroup.cpu;
      }
      return group.cpu <= newGroup.cpu;
    });
    if (position === -1) {
      this.sortedGroups.push(newGroup);
    } else {
      this.sortedGroups.splice(position, 0, newGroup);
    }
  }

  sortByRamPush(newGroup: Group) {
    const position = this.sortedGroups.findIndex((group: Group) => {
      if (this.sortParameter > 0) {
        return group.ram >= newGroup.ram;
      }
      return group.ram <= newGroup.ram;
    });
    if (position === -1) {
      this.sortedGroups.push(newGroup);
    } else {
      this.sortedGroups.splice(position, 0, newGroup);
    }
  }

  sortByDiskPush(newGroup: Group) {
    const position = this.sortedGroups.findIndex((group: Group) => {
      if (this.sortParameter > 0) {
        return group.memory >= newGroup.memory;
      }
      return group.memory <= newGroup.memory;
    });
    if (position === -1) {
      this.sortedGroups.push(newGroup);
    } else {
      this.sortedGroups.splice(position, 0, newGroup);
    }
  } */

  sortByIdPush(newGroup: Group) {
    const position = this.sortedGroups.findIndex((group: Group) => {
      return group.id >= newGroup.id;
    });
    if (position === -1) {
      this.sortedGroups.push(newGroup);
    } else {
      this.sortedGroups.splice(position, 0, newGroup);
    }
  }

  remove(id: number | string) {
    this.groupService.delete(id).subscribe((response: boolean) => {
      if (response) {
        this.alertifyService.success('Deleted group id:' + id, true);
        this.sortGroups();
      } else {
        this.alertifyService.error('Failed to delete group id:' + id, false);
      }
    }, error => {
      this.alertifyService.error('Failed to delete group id:' + id, false);
    });
  }

  sort(parameter: number | string) {
    parameter = +parameter;
    if (parameter > 4 || parameter < 1) {
      parameter = 0;
    }
    if (this.sortParameter === parameter) {
      this.sortedGroups.reverse();
    } else {
      this.sortParameter = parameter;
      this.sortGroups();
    }
  }

}
