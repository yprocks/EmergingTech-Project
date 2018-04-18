import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  messages: any;

  constructor() {
    this.messages = [{
      from: 'Yash Patel',
      subject: 'This is alert',
      date: new Date('1/1/2018')
    },
      {
        from: 'Vishvas Patel',
        subject: 'This is alert',
        date: new Date('1/1/2018')
      }];
  }

  ngOnInit() {
  }

  addNotification() {
  }
}
