import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {PatientService} from '../../services/patient.service';
import {NurseService} from '../../services/nurse.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit, AfterViewInit {

  nurse = this._authService.fullName();
  selection: SelectionModel<any>;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  @ViewChild(MatPaginator) pagination: MatPaginator;
  patients = [];

  serverErrorMessage: string;
  successMessage: string;
  options: FormGroup;
  nurseId: string;

  loading: boolean;

  constructor(fb: FormBuilder, private _authService: AuthService, private nurseService: NurseService,
              private _patientsService: PatientService, public snackBar: MatSnackBar) {
    this.getPatients();
    this.displayedColumns = ['name', 'email', 'address', 'phone', 'isOnMedication', 'delete', 'history'];
    this.selection = new SelectionModel<any>(true, []);

    this.nurseId = this._authService.nurseId();

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
      'Password': new FormControl('', [Validators.minLength(4), Validators.required]),
      'ConfirmPassword': new FormControl('', [Validators.minLength(4), Validators.required, this.passwordMatch]),
    });
  }

  ngOnInit(): void {
    this.loading = true;
  }

  getPatients() {
    this.nurseService.getPatients(this._authService.nurseId())
      .subscribe(patients => {
        this.patients = patients;
        this.dataSource = new MatTableDataSource<any>(this.patients);
        this.dataSource.paginator = this.pagination;
        this.loading = false;
      });
  }

  delete(id: string) {
    this._patientsService.removePatient(id).subscribe(r => {
      this.snackBar.open('User Deleted!', 'Dismiss', {duration: 3000});
      this.getPatients();
    });
  }

  ngAfterViewInit(): void {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  passwordMatch(fg: AbstractControl): { invalid: boolean } {
    const password = fg.root.get('Password');
    const confirmPassword = fg.value;
    if (password && password.value !== confirmPassword) {
      return {invalid: false};
    }
  }

  addPatient() {
    this._authService.register({
      name: this.options.get('Name').value,
      address: this.options.get('Address').value,
      email: this.options.get('Email').value,
      phone: this.options.get('Phone').value,
      password: this.options.get('Password').value,
      nurseId: this.nurseId,
      isNurse: false
    }).subscribe(r => {
        this.snackBar.open('User Added!', 'Dismiss', {duration: 3000});
        this.getPatients();

        this.options.reset();
        Object.keys(this.options.controls).forEach(key => {
          this.options.controls[key].setErrors(null);
        });

        this.serverErrorMessage = null;

      },
      error => {
        console.log(error);
        this.serverErrorMessage = error.error.message;
      });
  }
}
