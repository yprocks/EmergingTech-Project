import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  options: FormGroup;
  serverErrorMessage: string;
  router: Router;
  bgColor: string;

  constructor(fb: FormBuilder, router: Router) {
    this.options = fb.group({
      'uname': new FormControl('', [Validators.email, Validators.required]),
      'password': new FormControl('', [Validators.minLength(8), Validators.required])
    });
    this.router = router;
  }

  ngOnInit() {
    this.bgColor = '#5a6268';
  }

  login() {
    this.router.navigate(['nurse']);
  }
}
