import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {AuthService} from '../../services/auth.service';
import {PatientService} from '../../services/patient.service';
import {NurseService} from '../../services/nurse.service';

@Component({
  selector: 'app-nurse-home',
  templateUrl: './nurse-home.component.html',
  styleUrls: ['./nurse-home.component.css']
})
export class NurseHomeComponent implements OnInit, AfterViewInit {

  patients: any[];
  selection: SelectionModel<any>;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  @ViewChild(MatPaginator) pagination: MatPaginator;

  constructor(private _authService: AuthService, private nurseService: NurseService) {
  }


  ngOnInit(): void {
    this.nurseService.getPatientsOnMedication('nurse1')
      .subscribe(patients => this.patients = patients);
    console.log(this.patients);
    // this.patients = [
    //   {
    //     id: '1',
    //     name: 'Yash Patel',
    //     medication: 'Fever',
    //     start_date: new Date('12/4/2018'),
    //     end_date: null,
    //     isOnMedication: true
    //   },
    //   {
    //     id: '2',
    //     name: 'Vishvas Patel',
    //     medication: 'Gone Case',
    //     start_date: new Date('12/4/2018'),
    //     end_date: new Date('12/4/2019'),
    //     isOnMedication: false
    //   }
    // ];
    this.displayedColumns = ['select', 'name', 'medication_name', 'start_date', 'end_date', 'edit'];
    this.dataSource = new MatTableDataSource<any>(this.patients);
    this.selection = new SelectionModel<any>(true, []);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.pagination;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected(): boolean {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //     this.selection.clear() :
  //     this.dataSource.data.forEach(row => this.selection.select(row));
  // }

}
