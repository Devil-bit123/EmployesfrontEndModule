import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Filter } from '../../../../Interfaces/Filter/filter';
import dayjs from 'dayjs';

import { EmployeService } from '../../../../Services/Employes/employe.service';

import { EmployeBSService } from '../../../../Services/BehaviorSubjects/employe-bs.service';

const startmonth = dayjs().startOf('month').toDate();
const endmonth = dayjs().endOf('month').toDate();

interface downloadMenu {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
  providers: [provideNativeDateAdapter()],
  //imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule],
})
export class FiltersComponent {
  campaignTwo = new FormGroup({
    start: new FormControl(startmonth),
    end: new FormControl(endmonth),
    min_pay: new FormControl(),
    max_pay: new FormControl(),
    downloadMode: new FormControl(),
  });

  filter: Filter = {
    gte: '',
    lte: '',
    min_pay: undefined,
    max_pay: undefined,
    is_download: false,
  };

  options: downloadMenu[] = [
    { value: 'pdf', viewValue: 'PDF' },
    { value: 'excel', viewValue: 'Excel' },
  ];
  selectedValue: string = '';

  graphic: any;

  /**
   *
   */
  constructor(
    private _employeService: EmployeService,
    private _employeBSService: EmployeBSService
  ) {}

  ngOnInit(): void {
    //console.log('filtro', this.filter);
    this.campaignTwo.valueChanges.subscribe(this.handleFormChange.bind(this));
  }

  handleFormChange() {
    const formValues = this.campaignTwo.value; // Get form values

    // Convert start date to string in DD/MM/YYYY format
    const startDateString = dayjs(formValues.start).format('YYYY-MM-DD');

    // Convert end date to string in DD/MM/YYYY format
    const endDateString = dayjs(formValues.end).format('YYYY-MM-DD');

    // Update the filter object with the formatted date string
    this.filter.gte = startDateString;
    // Update the filter object with the formatted date string
    this.filter.lte = endDateString;

    this.filter.min_pay = this.campaignTwo.value.min_pay;
    this.filter.max_pay = this.campaignTwo.value.max_pay;

    this.filter.is_download = this.campaignTwo.value.downloadMode == 'excel';
  }

  // submitFilters() {
  //   console.log('filtro', this.filter);

  //   if (this.filter.is_download) {

  //     const fileName = "Employes_report_from_"+this.filter.gte+"_to_"+this.filter.lte+"_.xlsx"

  //     this._employeService.employesGraphic(this.filter).subscribe({
  //       next: (data) => {
  //         const blob1 = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //         const url = window.URL.createObjectURL(blob1);
  //         const b = document.createElement('b');

  //         b.href = url;
  //         b.download = fileName;
  //         document.body.appendChild(b);
  //         b.click();
  //         window.URL.revokeObjectURL(url);
  //         document.body.removeChild(b);
  //       },
  //       error: (e) => {
  //         console.log(e);
  //       },
  //     });


  //   } else {

  //     this._employeService.employesGraphic(this.filter).subscribe({
  //       next: (data) => {
  //         this.graphic = data;
  //         this._employeBSService.setEmployees(this.graphic);
  //       },
  //       error: (e) => {
  //         console.log(e);
  //       },
  //     });

  //   }
  // }

  submitFilters() {
    console.log('filtro', this.filter);

    if(!this.filter.is_download && this.campaignTwo.value.downloadMode=='pdf'){
      console.log('PDF');

      //Instalar plugin para exportar PDF
    }

    if (this.filter.is_download) {
      const fileName = "Employes_report_from_" + this.filter.gte + "_to_" + this.filter.lte + "_.xlsx";

      this._employeService.employesGraphic(this.filter).subscribe({
        next: (data: any) => {
          // Verificar si la respuesta es un Blob
          if (data instanceof Blob) {
            // Crear un objeto Blob
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            // Crear una URL para el Blob
            const url = window.URL.createObjectURL(blob);

            // Crear un enlace para descargar el archivo
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;

            // Agregar el enlace al cuerpo del documento y simular un clic en él
            document.body.appendChild(a);
            a.click();

            // Limpiar la URL creada
            window.URL.revokeObjectURL(url);

            // Eliminar el enlace del DOM después de la descarga
            a.remove();
          } else {
            // Manejar el caso en que la respuesta no es un Blob
            console.log("La respuesta no es un Blob.");
          }
        },
        error: (e) => {
          console.log(e);
        },
      });
    } else {
      this._employeService.employesGraphic(this.filter).subscribe({
        next: (data) => {
          // Manejar los datos recibidos cuando is_download es false
          this.graphic = data;
          this._employeBSService.setEmployees(this.graphic);
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }


  updateOption(departmentId: string) {
    const selectedDept = this.options.find(
      (dept) => dept.value === departmentId
    );
  }
}
