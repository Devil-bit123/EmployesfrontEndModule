import { DepartmentsInterface } from './../../../Interfaces/Departments/departments-interface';
import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import dayjs from 'dayjs';
import { DepartmentService } from '../../../Services/Departments/department.service';
import { EmployeService } from '../../../Services/Employes/employe.service';
import { EmployesInterface } from '../../../Interfaces/Employes/employes-interface';

import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInpu: 'DD/MM/YYYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.css',
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class AddEditComponent implements OnInit {
  formEmploye: FormGroup;
  titleForm: string = 'New';
  titleButton: string = 'Save';
  departments: DepartmentsInterface[] = [];

  /**
   *
   */
  constructor(
    private dialogRef: MatDialogRef<AddEditComponent>,
    private builder: FormBuilder,
    private _snackbar: MatSnackBar,
    private _departamentService: DepartmentService,
    private _employeService: EmployeService,
    @Inject(MAT_DIALOG_DATA) public dataEmploye: EmployesInterface
  ) {
    this.formEmploye = this.builder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pay: ['', [Validators.required]],
      contractDate: ['', Validators.required],
      idDept: ['', Validators.required],
    });

    this._departamentService.getAllDepts().subscribe({
      next: (data) => {
        //console.log(data);
        this.departments = data;
      },
      error: (e) => {},
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackbar.open(message, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  addEdditEmploye() {
    //console.log(this.formEmploye.value);

    const nEmploye: EmployesInterface = {
      id: 0,
      name: this.formEmploye.value.name,
      lastName: this.formEmploye.value.lastName,
      email: this.formEmploye.value.email,
      pay: this.formEmploye.value.pay,
      contractDate: dayjs(this.formEmploye.value.contractDate).format(
        'DD/MM/YYYY'
      ),
      idDept: this.formEmploye.value.idDept,
    };

    if (this.dataEmploye == null) {
      //console.log('add', this.dataEmploye);
      this._employeService.addEmploye(nEmploye).subscribe({
        next: (data) => {
          this.openSnackBar('Employe created!', 'Ok');
          this.dialogRef.close('created');
        },
        error: (e) => {
          this.openSnackBar("We can't create employe!", 'Ok');
        },
      });
    } else {
      //console.log('update', this.dataEmploye);
      this._employeService
        .updateEmploye(this.dataEmploye.id, nEmploye)
        .subscribe({
          next: (data) => {
            this.openSnackBar('Employe updated!', 'Ok');
            this.dialogRef.close('updated');
          },
          error: (e) => {
            this.openSnackBar("We can't update employe!", 'Ok');
          },
        });
    }
  }

  ngOnInit() {
    if (this.dataEmploye) {
      this.titleForm = 'Edit';
      this.titleButton = 'Update';
      //console.log(this.dataEmploye.idDept)
      this.formEmploye.patchValue({
        idDept: this.dataEmploye.idDept,
        name: this.dataEmploye.name,
        lastName: this.dataEmploye.lastName,
        email: this.dataEmploye.email,
        pay: this.dataEmploye.pay,
        contractDate: dayjs(this.dataEmploye.contractDate).toDate(),
      });
      //console.log(this.formEmploye.value);
    }
  }

  updateDepartment(departmentId: number) {
    const selectedDept = this.departments.find(
      (dept) => dept.id === departmentId
    );
    if (selectedDept) {
      this.formEmploye.patchValue({
        nameDept: selectedDept.name,
      });
    }
  }


}
