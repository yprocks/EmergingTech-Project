import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {TestModel} from '../dummy/test.models';

const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable()
export class NotificationsService {

  constructor(private http: HttpClient, private model: TestModel) {
  }

  getAlerts(nurseId: string) {
    const messages = [];
    this.model.alertMessage.forEach(obj => {
      if (obj.nurseId === nurseId) {
        messages.push(obj);
      }
    });

    return Observable.of(messages);

    // return this.http.get('http://localhost:3000/nurse/' + nurseId + '/patients', {headers: headers})
    //   .map((response: Response) => response.json())
    //   .catch((error: Response) => Observable.throw(error.json()));
  }
}
