import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import {HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

import {User} from '../models/user.model';

const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private location: Location) {
  }

  register(user: any) {
    const body = JSON.stringify(user);
    return this.http.post('http://localhost:3000/auth/register', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  login(user: any) {
    const body = JSON.stringify(user);
    return this.http.post('http://localhost:3000/auth/login', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  userName() {
    return localStorage.getItem('email');
  }

  fullName() {
    return localStorage.getItem('name');
  }

  token() {
    return localStorage.getItem('token');
  }
}
