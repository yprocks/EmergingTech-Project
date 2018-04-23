import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-daily-updates',
  templateUrl: './daily-updates.component.html',
  styleUrls: ['./daily-updates.component.css']
})
export class DailyUpdatesComponent implements OnInit {

  options: FormGroup;

  constructor(private _authService: AuthService, fb: FormBuilder) {
    this.options = fb.group({
    'bodyTemperature': new FormControl('', [Validators.min(10), Validators.required]),
    'heartRate': new FormControl('', [Validators.min(10), Validators.required]),
    'bloodPressure': new FormControl('', [Validators.min(10), Validators.required]),
    'respiratoryRate': new FormControl('', [Validators.min(10), Validators.required]),
  });
  }

  ngOnInit() {
  }

  updatePatient() {
    // this.bodyTemperature = this.options.get('bodyTemperature').value;
    // this.bloodPressure = this.options.get('bloodPressure').value;
    // this.heartRate = this.options.get('heartRate').value;
    // this.respiratoryRate = this.options.get('respiratoryRate').value;

    this.options.reset();
    Object.keys(this.options.controls).forEach(key => {
      this.options.controls[key].setErrors(null);
    });
  }

}
