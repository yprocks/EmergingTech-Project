import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.css']
})
export class PatientHomeComponent implements OnInit {

  motivationalMessage: any;
  patient: string;

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.patient = 'Yash Patel';

    this.motivationalMessage = {
      quote: 'Time is limited! Don\'t waste it in someone else\'s life',
      author: 'Steve Jobs',
      dateAdded: new Date('1/1/2017')
    };
  }

  sendAlert() {
    this.snackBar.open('Alert Sent!', 'Dismiss', {  duration: 3000 });
  }
}
