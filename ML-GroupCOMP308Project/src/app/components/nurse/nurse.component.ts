import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit {
  options: FormGroup;
  links: any[];
  notifications: number;

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
        link: 'patient',
        name: 'Patients'
      },
      {
        link: 'notifications',
        name: 'Notifications',
        notification: true
      }
    ];
  }
  ngOnInit() {
  }

}
