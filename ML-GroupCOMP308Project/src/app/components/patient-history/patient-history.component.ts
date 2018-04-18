import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {FormGroup} from '@angular/forms';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css']
})
export class PatientHistoryComponent implements OnInit, AfterViewInit {

  medications: any[];
  patient_id: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe( params => {
        this.patient_id = params.id;
    });

  }
  ngOnInit() {
    this.medications = [
      {
        name: 'Fever',
        date_start: new Date('1/1/16'),
        date_end: new Date('2/2/16'),
        checkups: [
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
        checkups: [
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
        checkups: [
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



    // this.dataSource = new MatTableDataSource<any>(this.medications.checkups);

  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.pagination;
  }

  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  //   this.medications.checkups.filter = filterValue;
  // }
}
