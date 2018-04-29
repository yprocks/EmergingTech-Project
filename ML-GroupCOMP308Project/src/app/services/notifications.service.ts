import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {Webhook} from '../commons/webhook';

@Injectable()
export class NotificationsService {

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  headers = new HttpHeaders({'Content-Type': 'application/json'});

  getAlerts(nurseId: string) {
    return this.http.get(Webhook.URL + '/alert/' + nurseId + '?token=' + this.auth.token(), {headers: this.headers})
      .map((response) => response as any);
  }
}
