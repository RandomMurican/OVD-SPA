import { Component, OnInit } from '@angular/core';
import { SessionService } from '../_services/session.service';
import { Session } from '../_models/session';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {
  math = Math;
  displayNames: string[] = ['', ''];
  displayType: number[];
  sessions: Session[];
  sortedSessions: Session[];
  test: number[];

  constructor(private sessionService: SessionService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.displayType = [0, 0, -1, -1];
    this.loadSessions();
  }

  loadSessions() {
    this.sessionService.getSessions().subscribe((sessions: Session[]) => {
      this.sessions = sessions;
      this.sortSessions();
    }, error => {
      this.alertifyService.error('Failed to load sessions.', false);
    });
  }

  sortSessions() {
    this.sortedSessions = [];
    this.sessions.forEach(session => {
      // This doozy checks if the session is active or not as preferred and the group/user matches any searches
      // tslint:disable-next-line:triple-equals
      if ((this.displayType[0] == 0 || (session.active && this.displayType[0] == 1) || (!session.active && this.displayType[0] == 2)) &&
        // tslint:disable-next-line:triple-equals
        ((this.displayType[2] < 0) || (session.userId == this.displayType[2])) &&
        // tslint:disable-next-line:triple-equals
        ((this.displayType[3] < 0) || (session.groupId == this.displayType[3]))) {
          if (Math.abs(this.displayType[1]) === 1) {
            this.sortByUserPush(session);
          } else if (Math.abs(this.displayType[1]) === 2) {
            this.sortByGroupPush(session);
          } else if (Math.abs(this.displayType[1]) === 3) {
            this.sortByTimePush(session);
          } else if (Math.abs(this.displayType[1]) === 4) {
            this.sortByStartPush(session);
          } else {
            this.sortByIdPush(session);
          }
      }
    });
  }

  sort(parameter: number) {
    if (parameter > 4 || parameter < 1) { this.displayType[1] = 0;
    } else {
      if (this.displayType[1] === parameter) {
        this.displayType[1] = -parameter;
      } else {
        this.displayType[1] = parameter;
      }
    }
    this.sortSessions();
  }

  displayUser(id: number, name: string) {
    this.displayType[2] = id;
    this.displayNames[0] = name;
    this.sortSessions();
  }

  displayGroup(id: number, group: string) {
    console.log(id);
    this.displayType[3] = id;
    this.displayNames[1] = group;
    this.sortSessions();
  }

  removeFilter(parameter: number) {
    this.displayType[parameter + 2] = -1;
    this.sortSessions();
  }

  kill(id: number) {
    this.alertifyService.error('I\'m sorry Dave, I can\'t let you do that.', false);
  }

  sortByIdPush(newSession: Session) {
    const position = this.sortedSessions.findIndex((session: Session) => {
      if (this.displayType[1] > 0) {
        return session.id >= newSession.id;
      }
      return session.id <= newSession.id;
    });
    if (position === -1) {
      this.sortedSessions.push(newSession);
    } else {
      this.sortedSessions.splice(position, 0, newSession);
    }
  }

  sortByUserPush(newSession: Session) {
    const position = this.sortedSessions.findIndex((session: Session) => {
      if (this.displayType[1] > 0) {
        return session.user >= newSession.user;
      }
      return session.user <= newSession.user;
    });
    if (position === -1) {
      this.sortedSessions.push(newSession);
    } else {
      this.sortedSessions.splice(position, 0, newSession);
    }
  }

  sortByGroupPush(newSession: Session) {
    const position = this.sortedSessions.findIndex((session: Session) => {
      if (this.displayType[1] > 0) {
        return session.group >= newSession.group;
      }
      return session.group <= newSession.group;
    });
    if (position === -1) {
      this.sortedSessions.push(newSession);
    } else {
      this.sortedSessions.splice(position, 0, newSession);
    }
  }

  sortByTimePush(newSession: Session) {
    const position = this.sortedSessions.findIndex((session: Session) => {
      if (this.displayType[1] > 0) {
        return session.time >= newSession.time;
      }
      return session.time <= newSession.time;
    });
    if (position === -1) {
      this.sortedSessions.push(newSession);
    } else {
      this.sortedSessions.splice(position, 0, newSession);
    }
  }

  sortByStartPush(newSession: Session) {
    const position = this.sortedSessions.findIndex((session: Session) => {
      if (this.displayType[1] > 0) {
        return session.start >= newSession.start;
      }
      return session.start <= newSession.start;
    });
    if (position === -1) {
      this.sortedSessions.push(newSession);
    } else {
      this.sortedSessions.splice(position, 0, newSession);
    }
  }

  convertTime(num: number) {
    if (num > 60) {
      num /= 60;
    } else {
      return Math.round(num) + ' s';
    }
    if (num > 60) {
      num /= 60;
    } else {
      return Math.round(num) + ' min';
    }
    if (num > 24) {
      num /= 24;
    } else {
      return Math.round(num) + ' h';
    }
    return Math.round(num) + ' days';
  }
}
