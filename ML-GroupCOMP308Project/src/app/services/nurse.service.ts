import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {User} from '../models/user.model';
import {TestModel} from '../dummy/test.models';

const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable()
export class NurseService {

  constructor(private http: HttpClient, private model: TestModel) {
  }

  // patients
  getPatients(nurseId: string) {
    const patients = [];
    this.model.patient.forEach(obj => {
      if (obj.nurseId === nurseId) {
        patients.push(obj);
      }
    });
    return Observable.of(patients.map(data => data));
    // return this.http.get('http://localhost:3000/nurse/' + nurseId + '/patients', {headers: headers})
    //   .map((response: Response) => response.json())
    //   .catch((error: Response) => Observable.throw(error.json()));
  }

  getPatientsOnMedication(nurseId: string) {
    const patients = [];
    let patientObj: any;
    this.model.patient.forEach(obj => {
      if (obj.nurseId === nurseId && obj.isOnMedication) {
        patientObj = obj;
        this.model.medications.forEach(medication => {
          if (obj.id === medication.patientId && !medication.hasCompleted) {
            patientObj.medication_name = medication.name;
            patientObj.start_date = medication.date_start;
            patientObj.end_date = medication.date_end;
          }
        });
        patients.push(patientObj);
      }
    });
    return Observable.of(patients);
    // return this.http.get('http://localhost:3000/nurse/' + nurseId + '/patients', {headers: headers})
    //   .map((response: Response) => response.json())
    //   .catch((error: Response) => Observable.throw(error.json()));
  }


}
