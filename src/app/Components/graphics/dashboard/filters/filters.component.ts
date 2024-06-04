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

const startmonth = dayjs().startOf('month').toDate();
const endmonth = dayjs().endOf('month').toDate();

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
  });

  filter: Filter = {
    gte: '',
    lte: '',
    min_pay: undefined,
    max_pay: undefined,
  };

  graphic:any;

  /**
   *
   */
  constructor(private _employeService: EmployeService) {}

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
  }

  submitFilters() {
    console.log('filtro',this.filter);
    this._employeService.employesGraphic(this.filter).subscribe({
      next:(data=>{
        this.graphic= data;
      }),error:(e=>{
        console.log(e);
      })
    });
  }



}
