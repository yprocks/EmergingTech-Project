import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css']
})
export class PatientHistoryComponent implements OnInit {

  medications: any[];
  patient_id: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe( params => {
        this.patient_id = params.id;
    });

    this.medications = [
      {
        name: 'Fever',
        date_start: new Date('1/1/16'),
        date_end: new Date('2/2/16'),
        regular_updates: [
          {
            date: new Date('2/2/16'),
            bodyTemperature: 37,
            heartRate: 90,
            bloodPressure: 170,
            respiratoryRate: 100
          },
          {
            date: new Date('1/2/16'),
            bodyTemperature: 37,
            heartRate: 90,
            bloodPressure: 170,
            respiratoryRate: 100
          }
          ]
      },
      {
        name: 'Cold',
        date_start: new Date('1/1/15'),
        date_end: new Date('2/2/15'),
        regular_updates: [
          {
            date: new Date('2/2/15'),
            bodyTemperature: 37,
            heartRate: 90,
            bloodPressure: 170,
            respiratoryRate: 100
          },
          {
            date: new Date('1/2/15'),
            bodyTemperature: 37,
            heartRate: 90,
            bloodPressure: 170,
            respiratoryRate: 100
          }
        ]
      },
      {
        name: 'Flu',
        date_start: new Date('1/1/14'),
        date_end: new Date('2/2/14'),
        regular_updates: [
          {
            date: new Date('2/2/14'),
            bodyTemperature: 37,
            heartRate: 90,
            bloodPressure: 170,
            respiratoryRate: 100
          },
          {
            date: new Date('1/2/14'),
            bodyTemperature: 37,
            heartRate: 90,
            bloodPressure: 170,
            respiratoryRate: 100
          }
        ]
      }
    ];
  }
  ngOnInit() {
  }

}
