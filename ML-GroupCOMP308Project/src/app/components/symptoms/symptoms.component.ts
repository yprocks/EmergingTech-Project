import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {forEach} from '@angular/router/src/utils/collection';
import {AuthService} from '../../services/auth.service';
import {SymptomsService} from '../../services/symptoms.service';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.css']
})
export class SymptomsComponent implements OnInit {

  options: FormGroup;
  diagnoseResults: string;
  totalChecboxClicked: number;
  symptoms: any[];
  selectedValues: any;
  loading: boolean;

  constructor(fb: FormBuilder, private _authService: AuthService, private symptomsService: SymptomsService) {
    this.totalChecboxClicked = 0;
    this.loading = true;
    this.options = fb.group({
      'symptoms': new FormControl()
    });
  }

  ngOnInit() {
    this.symptomsService.getSymptoms().subscribe(r => {
      this.symptoms = r;
      this.loading = false;
    });

    this.selectedValues = {
      'symptoms': []
    };
  }

  checkSymptoms() {
    this.symptomsService.diagnoseSymptoms(this.selectedValues).subscribe(r => {
      // console.log(r);
      this.diagnoseResults = r;
    });

  }

  checkboxClicked(event) {
    if (event.source._checked) {
      this.totalChecboxClicked++;
      this.selectedValues.symptoms.push(event.source.value);
    } else {
      this.selectedValues.symptoms.pop(event.source.value);
      this.totalChecboxClicked--;
    }

  }
}
