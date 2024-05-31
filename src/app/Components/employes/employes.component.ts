import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { EmployesInterface } from '../../Interfaces/Employes/employes-interface';
import { EmployeService } from '../../Services/Employes/employe.service';

import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './add-edit/add-edit.component';


@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrl: './employes.component.css'
})
export class EmployesComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['name', 'lastName', 'email', 'pay','contractDate','nameDept','Actions'];

  dataSource = new MatTableDataSource<EmployesInterface>();

  constructor(private _employeService : EmployeService,
    public dialog: MatDialog

  ) {


  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(){

    this.getEmployes();

  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

getEmployes(){
  this._employeService.getAllEmployes().subscribe({
    next:(data =>{
      //console.log(data)
      this.dataSource.data=data;
    }),error:(e =>{})
  })
}

openDialog() {
  this.dialog.open(AddEditComponent,{
    disableClose:true,
    width:'500px'
  });
}


}
