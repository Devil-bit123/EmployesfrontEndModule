import { Component } from '@angular/core';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import dayjs from 'dayjs';

import { EmployeService } from '../../../Services/Employes/employe.service';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
  providers: [provideNativeDateAdapter()],
  //imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule],
})
export class ReportComponent {

  /**
   *
   */
  constructor(private _employeService : EmployeService) {


  }

  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });


  genReport() {
    // Definir explícitamente el tipo de response con tipos más específicos
    const response: { gte: string, lte: string } = {
      gte: dayjs(this.campaignTwo.value.start).format('DD/MM/YYYY'),
      lte: dayjs(this.campaignTwo.value.end).format('DD/MM/YYYY')
    };

    const fileName = "Employes_contract_report_from_"+response.gte+"_to_"+response.lte+"_.xlsx"

    this._employeService.downloadReportEmploye(response.gte, response.lte).subscribe(response => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, error => {
      console.error('Error al descargar el reporte:', error);
    });

    console.log(response);
  }



}
