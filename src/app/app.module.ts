import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

//Material components
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NativeDateModule } from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';


//ReactiveForms
import { ReactiveFormsModule } from '@angular/forms';

//Solicitudes Http
import { HttpClientModule } from '@angular/common/http';

//dayJS
import * as dayjs from 'dayjs'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    //Material
    MatButtonModule,MatPaginatorModule,MatTableModule,ReactiveFormsModule,
    MatInputModule,MatSelectModule,MatDatepickerModule,NativeDateModule,
    MatSnackBarModule,MatIconModule,MatDialogModule,MatGridListModule,

    //Http
    HttpClientModule,




  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
