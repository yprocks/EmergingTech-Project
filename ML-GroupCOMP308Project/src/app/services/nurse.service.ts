import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {AuthService} from './auth.service';
import {Webhook} from '../commons/webhook';


@Injectable()
export class NurseService {

  headers = new HttpHeaders({'Content-Type': 'application/json', 'responseType': 'application/json'});

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  getPatients(nurseId: string) {
    return this.http.get(Webhook.URL + '/nurse/' + nurseId + '/patients?token=' + this.auth.token(),
      {headers: this.headers})
      .map((response) => {
        return response as any[];
      });
  }

  getPatientsOnMedication(nurseId: string) {
    return this.http.get(Webhook.URL + '/nurse/' + nurseId + '/patients-on-medication?token=' + this.auth.token(),
      {headers: this.headers})
      .map((response) => {
        return response as any[];
      });
  }
}
