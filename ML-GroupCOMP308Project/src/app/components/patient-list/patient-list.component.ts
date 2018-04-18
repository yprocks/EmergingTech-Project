import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit, AfterViewInit {

  nurse = 'Jenni Lee';
  patients: any[];
  selection: SelectionModel<any>;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  @ViewChild(MatPaginator) pagination: MatPaginator;
  options: FormGroup;
  serverErrorMessage: string;
  successMessage: string;

  constructor(fb: FormBuilder) {
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

  passwordMatch(fg: AbstractControl): { invalid: boolean } {
    const password = fg.root.get('Password');
    const confirmPassword = fg.value;
    if (password && password.value !== confirmPassword) {
      return {invalid: false};
    }
  }

  ngOnInit(): void {
    this.patients = [
      {
        id: '1',
        name: 'Yash Patel',
        email: 'yash@gmail.com',
        address: '17 Craters Avenue',
        phone: '4678677678',
        isOnMedication: 'true',
        date_created: new Date('12/4/2018')
      },
      {
        id: '2',
        name: 'Vishvas Patel',
        email: 'vishvas@gmail.com',
        address: '24 Marks Avenue',
        phone: '6278231167',
        isOnMedication: true,
        date_created: new Date('12/6/2017')
      },
      {
        id: '3',
        name: 'John Doe',
        email: 'john@gmail.com',
        address: '4 Marks Avenue',
        phone: '6289081167',
        isOnMedication: false,
        date_created: new Date('12/6/2017')
      }
    ];
    this.displayedColumns = ['name', 'email', 'address', 'phone', 'date_created', 'onMedication', 'delete'];
    this.dataSource = new MatTableDataSource<any>(this.patients);
    this.selection = new SelectionModel<any>(true, []);
  }

  delete(id: number) {
  }

  addPatient() {
    this.options.reset();
    Object.keys(this.options.controls).forEach(key => {
      this.options.controls[key].setErrors(null);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.pagination;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  addMedication(id: any) {
  }
}
