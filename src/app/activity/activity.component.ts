import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  constructor(private alertifyService: AlertifyService) { }

  ngOnInit() {
  }

  getMessages() {
    return this.alertifyService.getMessages();
  }

}
