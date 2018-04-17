import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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

  constructor(private route: ActivatedRoute, private router: Router, fb: FormBuilder) {
    this.route.params.subscribe(params => {
      this.patient_id = params.id;
      });
    this.patientName = 'Yash Patel';
    this.options = fb.group({
      'bodyTemperature': new FormControl('', [Validators.min(10), Validators.required]),
      'heartRate': new FormControl('', [Validators.min(10), Validators.required]),
      'bloodPressure': new FormControl('', [Validators.min(10), Validators.required]),
      'respiratoryRate': new FormControl('', [Validators.min(10), Validators.required]),
    });
  }

  updatePatient() {
    this.bodyTemperature = this.options.get('bodyTemperature').value;
    this.bloodPressure = this.options.get('bloodPressure').value;
    this.heartRate = this.options.get('heartRate').value;
    this.respiratoryRate = this.options.get('respiratoryRate').value;
  }

  ngOnInit() {
  }

}
