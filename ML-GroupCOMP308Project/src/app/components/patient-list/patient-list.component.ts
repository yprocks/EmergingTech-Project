import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatTableDataSource} from '@angular/material';
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

  nurse = 'Jenni Lee';
  selection: SelectionModel<any>;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  @ViewChild(MatPaginator) pagination: MatPaginator;
  patients: any[];

  constructor(private _authService: AuthService, private nurseService: NurseService) {
  }

  ngOnInit(): void {
    this.nurseService.getPatients('nurse1')
      .subscribe(patients => this.patients = patients);

    // this.patients = [
    //   {
    //     id: '1',
    //     name: 'Yash Patel',
    //     email: 'yash@gmail.com',
    //     address: '17 Craters Avenue',
    //     phone: '4678677678',
    //     isOnMedication: 'true',
    //     date_created: new Date('12/4/2018')
    //   },
    //   {
    //     id: '2',
    //     name: 'Vishvas Patel',
    //     email: 'vishvas@gmail.com',
    //     address: '24 Marks Avenue',
    //     phone: '6278231167',
    //     isOnMedication: true,
    //     date_created: new Date('12/6/2017')
    //   },
    //   {
    //     id: '3',
    //     name: 'John Doe',
    //     email: 'john@gmail.com',
    //     address: '4 Marks Avenue',
    //     phone: '6289081167',
    //     isOnMedication: false,
    //     date_created: new Date('12/6/2017')
    //   }
    // ];

    this.displayedColumns = ['name', 'email', 'address', 'phone', 'dateCreated', 'isOnMedication', 'delete'];
    this.dataSource = new MatTableDataSource<any>(this.patients);
    this.selection = new SelectionModel<any>(true, []);
  }

  delete(id: number) {
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
