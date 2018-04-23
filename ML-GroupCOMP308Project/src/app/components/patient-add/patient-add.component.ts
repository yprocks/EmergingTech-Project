import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {PatientService} from '../../services/patient.service';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css']
})
export class PatientAddComponent implements OnInit {

  serverErrorMessage: string;
  successMessage: string;
  options: FormGroup;
  nurseId: string;

  constructor(fb: FormBuilder, private _authService: AuthService, private patientService: PatientService) {

    this.nurseId = 'nurse1';

    this.options = fb.group({
      'Name': new FormControl('', [Validators.minLength(3), Validators.maxLength(20), Validators.required]),
      'Email': new FormControl('', [Validators.email, Validators.required]),
      'Address': new FormControl('', [Validators.minLength(6),
        Validators.maxLength(50), Validators.required]),
      'Phone': new FormControl('', [
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^\\s*(?:\\+?\\d{1,3})?[- (]*\\d{3}(?:[- )]*\\d{3})?[- ]*\\d{4}(?: *[x/#]\\d+)?\\s*$'),
        Validators.required]),
      'Password': new FormControl('', [Validators.minLength(8), Validators.required]),
      'ConfirmPassword': new FormControl('', [Validators.minLength(8), Validators.required, this.passwordMatch]),
    });
  }

  ngOnInit() {
  }


  passwordMatch(fg: AbstractControl): { invalid: boolean } {
    const password = fg.root.get('Password');
    const confirmPassword = fg.value;
    if (password && password.value !== confirmPassword) {
      return {invalid: false};
    }
  }

  addPatient() {
    this.patientService.addPatient({
      id: `${Math.random() * 1000}`,
      name: this.options.get('Name').value,
      address: this.options.get('Address').value,
      email: this.options.get('Email').value,
      phone: this.options.get('Phone').value,
      nurseId: this.nurseId,
      isOnMedication: false,
      dateCreated: new Date()
    });

    this.options.reset();
    Object.keys(this.options.controls).forEach(key => {
      this.options.controls[key].setErrors(null);
    });


  }

}
