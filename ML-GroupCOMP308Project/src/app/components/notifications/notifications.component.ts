import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NotificationsService} from '../../services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  messages: any;

  constructor(private _authService: AuthService, private notificationService: NotificationsService) {
    this.notificationService.getAlerts('nurse1')
      .subscribe(messages => this.messages = messages);
    // this.messages = [{
    //   from: 'Yash Patel',
    //   subject: 'This is alert',
    //   date: new Date('1/1/2018')
    // },
    //   {
    //     from: 'Vishvas Patel',
    //     subject: 'This is alert',
    //     date: new Date('1/1/2018')
    //   }];
  }

  ngOnInit() {
  }

  addNotification() {
  }
}
