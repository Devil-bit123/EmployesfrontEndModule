import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { EmployesInterface } from '../../Interfaces/Employes/employes-interface';
import { EmployeService } from '../../Services/Employes/employe.service';

import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './add-edit/add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteComponent } from './delete/delete.component';
import { ReportComponent } from './report/report.component';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrl: './employes.component.css'
})
export class EmployesComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['name', 'lastName', 'email', 'pay','contractDate','nameDept','Actions'];

  dataSource = new MatTableDataSource<EmployesInterface>();

  constructor(private _employeService : EmployeService,
    public dialog: MatDialog,
    private _snackBar : MatSnackBar

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

newEmployeDialog() {
  this.dialog.open(AddEditComponent,{
    disableClose:true,
    width:'500px'
  }).afterClosed().subscribe(response =>{
    if(response==='created'){
      this.getEmployes();
    }
  });
}

updateEmployeDialog(dataEmploye : EmployesInterface) {
  //console.log('sss',dataEmploye);
  this.dialog.open(AddEditComponent,{
    disableClose:true,
    width:'500px',
    data:dataEmploye
  }).afterClosed().subscribe(response =>{
    if(response==='updated'){
      this.getEmployes();
    }
  });
}


openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    horizontalPosition: 'end',
    verticalPosition: 'top',
    duration: 3000,
  });
}


deleteEmployeDialog(dataEmploye : EmployesInterface) {
  //console.log('sss',dataEmploye);
  this.dialog.open(DeleteComponent,{
    disableClose:true,
    data:dataEmploye
  }).afterClosed().subscribe(response =>{
    if(response==='deleted'){
      this._employeService.deleteEmploye(dataEmploye.id).subscribe({
        next:(data=>{
          this.openSnackBar("Employe deleted!","Ok");
          this.getEmployes();
        }),error:(e=>{
          this.openSnackBar("We can't delete employe!","Ok");
        })
      });
    }
  });
}


reportEmployeDialog() {
  //console.log('sss',dataEmploye);
  this.dialog.open(ReportComponent,{
    disableClose:true
  }).afterClosed().subscribe(response =>{
    if(response==='reported'){
      this.openSnackBar("Report generated!","Ok");
    }
  });
}


}
