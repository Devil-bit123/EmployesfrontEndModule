import { Component } from '@angular/core';


import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
  providers: [provideNativeDateAdapter()],
  //imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule],
})
export class FiltersComponent {

  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });

}
