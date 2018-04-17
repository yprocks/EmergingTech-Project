import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  options: FormGroup;
  links: any[];

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      'fixed': true,
      'top': 0,
      'bottom': 0,
    });
    this.links = [
      {
        link: 'home',
        name: 'Home'
      },
      {
        link: 'games',
        name: 'Games'
      },
      {
        link: 'symptoms',
        name: 'Symptoms'
      },
      {
        link: 'history',
        params: '1',
        name: 'History'
      }
    ];
  }

  ngOnInit() {
  }

}
