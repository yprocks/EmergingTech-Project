import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import {HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';

import {User} from '../models/user.model';
import {forEach} from '@angular/router/src/utils/collection';
import {AuthService} from './auth.service';
import {Webhook} from '../commons/webhook';


@Injectable()
export class PatientService {

  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  removePatient(patientId: string) {
    return this.http.get(Webhook.URL + '/patient/remove/' + patientId + '?token=' + this.auth.token(), {headers: this.headers})
      .map((response) => response as any);
  }

  updatePatient(patientId: string, patient: any) {
    const body = JSON.stringify(patient);
    return this.http.post(Webhook.URL + '/patient/update/' + patientId + '?token=' + this.auth.token(), body, {headers: this.headers})
      .map((response) => response as any);
  }

  // Handle Patient medication
  addToMedication(patientId: string, patientMedication: any) {
    const body = JSON.stringify(patientMedication);
    return this.http.post(Webhook.URL + '/patient/add-to-medication/' + patientId + '?token=' + this.auth.token(),
      body, {headers: this.headers})
      .map((response) => response as any)
      .catch(error => Observable.throw(error as HttpErrorResponse));
  }

  completeMedication(patientId: string, medicationBody: any) {
    const body = JSON.stringify(medicationBody);
    return this.http.post(Webhook.URL + '/patient/complete-medication/' + patientId + '?token=' + this.auth.token(), body,
      {headers: this.headers})
      .map((response) => response as any)
      .catch(error => Observable.throw(error as HttpErrorResponse));
  }

  addDailyUpdate(patientId: string, patientJson: any) {
    const body = JSON.stringify(patientJson);
    return this.http.post(Webhook.URL + '/patient/add-daily-update/' + patientId + '?token=' + this.auth.token(), body,
      {headers: this.headers})
      .map((response) => response as any)
      .catch(error => Observable.throw(error as HttpErrorResponse));
  }

  // Patient History
  getPatientHistory(patientId: string) {
    return this.http.get(Webhook.URL + '/patient/history/' + patientId + '?token=' + this.auth.token(), {headers: this.headers})
      .map((response) => response as any[]);
  }

  getPatient(patientId: string) {
    return this.http.get(Webhook.URL + '/patient/' + patientId + '?token=' + this.auth.token(), {headers: this.headers})
      .map((response) => response as any);
  }

}
