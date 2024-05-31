import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployesInterface } from '../../../Interfaces/Employes/employes-interface';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  titleForm: string = 'Delete';
  titleButton: string = 'Delete';

  /**
   *
   */
  constructor(
    private dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataEmploye: EmployesInterface
  ) {


  }

  ngOnInit():void{


  }

  confirmDelete(){
    if(this.dataEmploye){
      this.dialogRef.close('deleted');
    }
  }

}
