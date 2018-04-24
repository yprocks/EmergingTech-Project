import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {TestModel} from '../dummy/test.models';
import 'rxjs/add/observable/of';
import {AuthService} from './auth.service';

const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable()
export class MessageService {

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  updateMotivationalMessage(message: any) {
    const body = JSON.stringify(message);
    return this.http.post('http://localhost:3000/quote/add?token=' + this.auth.token(), body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  deleteMotivationalMessage(messageId: string) {
    return this.http.get('http://localhost:3000/quote/remove/' + messageId + '?token=' + this.auth.token(), {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getMotivationalMessage(patientId: string) {
    return this.http.get('http://localhost:3000/quote/' + patientId + '?token=' + this.auth.token(), {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getAlerts(nurseId: string) {
    return this.http.get('http://localhost:3000/alert/' + nurseId + '?token=' + this.auth.token(), {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  sendAlert(patientId: string, message: any) {
    const body = JSON.stringify(message);
    return this.http.post('http://localhost:3000/alert/add?token=' + this.auth.token(), body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

}
