import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  options: FormGroup;
  serverErrorMessage: string;
  router: Router;

  constructor(fb: FormBuilder, router: Router, private _authService: AuthService) {
    this.options = fb.group({
      'uname': new FormControl('', [Validators.email, Validators.required]),
      'password': new FormControl('', [Validators.minLength(8), Validators.required])
    });
    this.router = router;
  }

  ngOnInit() {
  }


  login() {
    this.router.navigate(['/nurse']);
  }
}
