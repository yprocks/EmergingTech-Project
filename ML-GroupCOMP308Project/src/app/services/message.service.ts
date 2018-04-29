import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {AuthService} from './auth.service';
import {Webhook} from '../commons/webhook';

@Injectable()
export class MessageService {

  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  updateMotivationalMessage(message: any) {
    const body = JSON.stringify(message);
    return this.http.post(Webhook.URL + '/quotes/add?token=' + this.auth.token(), body, {headers: this.headers})
      .map((response) => response as any);
  }

  deleteMotivationalMessage(messageId: string) {
    return this.http.get(Webhook.URL + '/quotes/remove/' + messageId + '?token=' + this.auth.token(), {headers: this.headers})
      .map((response) => response as any);
  }

  getMotivationalMessageForPatient(patientId: string) {
    return this.http.get(Webhook.URL + '/quotes/patient/' + patientId + '?token=' + this.auth.token(), {headers: this.headers})
      .map((response) => response as any);
  }

  getMotivationalMessage(nurseId: string) {
    return this.http.get(Webhook.URL + '/quotes/' + nurseId + '?token=' + this.auth.token(), {headers: this.headers})
      .map((response) => response as any);
  }


  getAlerts(nurseId: string) {
    return this.http.get(Webhook.URL + '/alert/' + nurseId + '?token=' + this.auth.token(), {headers: this.headers})
      .map((response) => response as any[]);
  }

  sendAlert(message: any) {
    const body = JSON.stringify(message);
    return this.http.post(Webhook.URL + '/alert/add?token=' + this.auth.token(), body, {headers: this.headers})
      .map((response) => response as any);
  }

}
