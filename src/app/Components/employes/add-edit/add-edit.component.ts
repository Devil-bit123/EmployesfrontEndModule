import { DepartmentsInterface } from './../../../Interfaces/Departments/departments-interface';
import { Component, OnInit } from '@angular/core';

import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as dayjs from 'dayjs'
import { DepartmentService } from '../../../Services/Departments/department.service';
import { EmployeService } from '../../../Services/Employes/employe.service';
import { EmployesInterface } from '../../../Interfaces/Employes/employes-interface';

import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
parse:{
  dateInpu:'DD/MM/YYYYY'
},
display:{
  dateInput:'DD/MM/YYYY',
  monthYearLabel:'MMMM YYYY',
  dateA11yLabel:'LL',
  monthYearA11yLabel:'MMMM YYYY'
}
}


@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.css',
  providers:[
    {provide:MAT_DATE_FORMATS, useValue:MY_DATE_FORMATS}
  ]
})

export class AddEditComponent implements OnInit {

  formEmploye : FormGroup;
  titleForm : string ="New";
  titleButton : string ="Save";
  departments :  DepartmentsInterface[]=[];

  /**
   *
   */
  constructor(
    private dialogRef : MatDialogRef<AddEditComponent>,
    private builder : FormBuilder,
    private _snackbar : MatSnackBar,
    private _departamentService : DepartmentService,
    private _employeService: EmployeService
  ) {

    this.formEmploye = this.builder.group({
      name:['',Validators.required],
      lastName:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      pay:['',[Validators.required]],
      contractDate:['',Validators.required],
      idDept:['',Validators.required]
    })

    this._departamentService.getAllDepts().subscribe({
      next:(data=>{
        console.log(data);
        this.departments=data;
      }),error:(e=>{

      })
    });

  }

  openSnackBar(message: string, action: string) {
    this._snackbar.open(message, action,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    });
  }

  addEdditEmploye(){
    console.log(this.formEmploye);
    console.log(this.formEmploye.value);

  }


  ngOnInit(){

  }

}
