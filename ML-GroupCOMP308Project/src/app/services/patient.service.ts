import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import {HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

import {User} from '../models/user.model';
import {TestModel} from '../dummy/test.models';
import {forEach} from '@angular/router/src/utils/collection';

const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable()
export class PatientService {

  constructor(private http: HttpClient, private model: TestModel) {
  }

  // Basic Crud Operation
  addPatient(patient: any) {
    this.model.patient.push(patient);
    return patient;
    // const body = JSON.stringify(user);
    // return this.http.post('http://localhost:3000/auth/register', body, {headers: headers})
    //   .map((response: Response) => response.json())
    //   .catch((error: Response) => Observable.throw(error.json()));
  }

  removePatient(id: string) {
    delete this.model.patient[id];
    return id;
    // return this.http.get('http://localhost:3000/patient/remove/' + id, {headers: headers})
    //   .map((response: Response) => response.json())
    //   .catch((error: Response) => Observable.throw(error.json()));
  }

  updatePatient(id: string, patient: any) {

    this.model.patient.forEach(obj => {
      if (obj.id === id) {
        obj.address = patient.address;
        obj.email = patient.email;
        obj.phone = patient.phone;
        return;
      }
    });


    // const body = JSON.stringify(user);
    // return this.http.post('http://localhost:3000/patient/update/' + id, body, {headers: headers})
    //   .map((response: Response) => response.json())
    //   .catch((error: Response) => Observable.throw(error.json()));
  }

  // Handle Patient medication
  addToMedication(id: string, patientMedication: any) {
    this.model.patient.forEach(obj => {
      if (obj.id === id) {
        obj.isOnMedication = true;
        this.model.medications.push(patientMedication);
        return;
      }
    });
    // const body = JSON.stringify(patientJson);
    // return this.http.post('http://localhost:3000/patient/update-medication/' + id, body, {headers: headers})
    //   .map((response: Response) => response.json())
    //   .catch((error: Response) => Observable.throw(error.json()));
  }

  completeMedication(id: string, medicationId: string) {
    this.model.patient.forEach(obj => {
      if (obj.id === id) {
        obj.isOnMedication = false;
        this.model.medications.forEach(med => {
          if (med.id === medicationId) {
            med.date_end = new Date();
            return;
          }
        });
        return;
      }
    });


    // return this.http.get('http://localhost:3000/patient/history' + patientId, {headers: headers})
    //   .map((response: Response) => response.json())
    //   .catch((error: Response) => Observable.throw(error.json()));
  }

  addDailyUpdate(medicationId: string, patientJson: any) {

    this.model.medications.forEach(med => {
      if (med.id === medicationId) {
        med.checkups.push(patientJson);
        return;
      }
    });

    // const body = JSON.stringify(patientJson);
    // return this.http.post('http://localhost:3000/auth/register', body, {headers: headers})
    //   .map((response: Response) => response.json())
    //   .catch((error: Response) => Observable.throw(error.json()));
  }

  // Patient History
  getPatientHistory(patientId: string) {
    const history =  [];
    this.model.medications.forEach(obj => {
      if (obj.patientId === patientId) {
        history.push(obj);
      }
    });
    return Observable.of(history);
    //   return this.http.get('http://localhost:3000/patient/history' + patientId, {headers: headers})
    //     .map((response: Response) => response.json())
    //     .catch((error: Response) => Observable.throw(error.json()));
  }

}
