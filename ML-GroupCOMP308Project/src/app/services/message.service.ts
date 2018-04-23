import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {TestModel} from '../dummy/test.models';
import 'rxjs/add/observable/of';

const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable()
export class MessageService {

  constructor(private http: HttpClient, private model: TestModel) { }

  // motivation message crud
  updateMotivationalMessage(message: any) {
    this.model.motivationalMessage.push(message);
    return this.getMotivationalMessage();
    // const body = JSON.stringify(message);
    // return this.http.post('http://localhost:3000/auth/register', body, {headers: headers})
    //   .map((response: Response) => response.json())
    //   .catch((error: Response) => Observable.throw(error.json()));
  }

  deleteMotivationalMessage(id: string) {
      delete this.model.motivationalMessage[id];
      return id;
    // const body = JSON.stringify(message);
    // return this.http.post('http://localhost:3000/auth/register', body, {headers: headers})
    //   .map((response: Response) => response.json())
    //   .catch((error: Response) => Observable.throw(error.json()));
  }

  getMotivationalMessage(): Observable<any> {
    const message = this.model.motivationalMessage[this.model.motivationalMessage.length - 1];
    return Observable.of(message);
    // return this.http.get('http://localhost:3000/message', {headers: headers})
    //   .map((response: Response) => response.json())
    //   .catch((error: Response) => Observable.throw(error.json()));
  }

  getAlerts(nurseId: string) {
    const messages = [];
    this.model.alertMessage.forEach(obj => {
      if (obj.nurseId === nurseId) { messages.push(obj); }
    });
    return Observable.of(messages);
    // return this.http.get('http://localhost:3000/message', {headers: headers})
    //   .map((response: Response) => response.json())
    //   .catch((error: Response) => Observable.throw(error.json()));
  }

  // alerts
  sendAlert(message: any) {
    this.model.alertMessage.push(message);
    // const body = JSON.stringify(message);
    // return this.http.post('http://localhost:3000/alert/' + patientId + '/' + nurseId, body, {headers: headers})
    //   .map((response: Response) => response.json())
    //   .catch((error: Response) => Observable.throw(error.json()));
  }

}
