import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {PatientService} from '../../services/patient.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  options: FormGroup;
  patient_id: string;
  bodyTemperature: number;
  heartRate: number;
  bloodPressure: number;
  respiratoryRate: number;
  patientName: string;

  serverErrorMessage: string;

  medications: any[];
  patientDailyUpdate: any;

  loading: boolean;

  constructor(private route: ActivatedRoute, private router: Router, fb: FormBuilder,
              private _authService: AuthService, public snackBar: MatSnackBar,
              private patientService: PatientService) {
    this.route.params.subscribe(params => {
      this.patient_id = params.id;
    });
    this.loading = true;

    this.options = fb.group({
      'bodyTemperature': new FormControl('', [Validators.min(10), Validators.required]),
      'heartRate': new FormControl('', [Validators.min(10), Validators.required]),
      'bloodPressure': new FormControl('', [Validators.min(10), Validators.required]),
      'respiratoryRate': new FormControl('', [Validators.min(10), Validators.required]),
    });

    this.patientService.getPatient(this.patient_id).subscribe(r => {
      this.patientName = r.name;
    });

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.patient_id = params.id;
    });

    this.getPatientHistory();
  }

  getPatientHistory() {
    this.patientService.getPatientHistory(this.patient_id)
      .subscribe(medications => {
        this.medications = medications;
        this.loading = false;
      });
  }

  updatePatient() {
    const jsonObj = {
      bodyTemperature: this.options.get('bodyTemperature').value,
      bloodPressure: this.options.get('bloodPressure').value,
      heartRate: this.options.get('heartRate').value,
      respiratoryRate: this.options.get('respiratoryRate').value
    };
    this.patientService.addDailyUpdate(this.patient_id, jsonObj).subscribe(r => {
        this.snackBar.open('Daily update added', 'Dismiss', {duration: 3000});
        this.getPatientHistory();
        this.options.reset();
        Object.keys(this.options.controls).forEach(key => {
          this.options.controls[key].setErrors(null);
        });
        this.serverErrorMessage = null;
      },
      error => {
        this.serverErrorMessage = error.error.message;
      });
  }
}
