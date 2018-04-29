import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Webhook} from '../commons/webhook';


@Injectable()
export class SymptomsService {

  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  getSymptoms(){
    return this.http.get(Webhook.URL + '/symptoms/list?token=' + this.auth.token(), {headers: this.headers})
      .map((response) => {
        console.log(response);
        return response as any[];
      });
  }

  diagnoseSymptoms(jsonData: any) {
    const body = JSON.stringify(jsonData);

    return this.http.post(Webhook.URL + '/symptoms/ai/diagnose?token=' + this.auth.token(), body, {headers: this.headers})
      .map((response) => response as any);
  }
}
