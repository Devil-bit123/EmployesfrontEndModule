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
import {MatCardModule} from '@angular/material/card';


//ReactiveForms
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//Solicitudes Http
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

//dayJS
import * as dayjs from 'dayjs';

//NG Zorro
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en'
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DrawerComponent } from './Components/drawer/drawer.component';

//Components
import { EmployesComponent } from './Components/employes/employes.component';
import { AddEditComponent } from './Components/employes/add-edit/add-edit.component';
import { DeleteComponent } from './Components/employes/delete/delete.component';
import { ReportComponent } from './Components/employes/report/report.component';
import { DashboardComponent } from './Components/graphics/dashboard/dashboard.component';
import { BarsGraphicComponent } from './Components/graphics/dashboard/bars-graphic/bars-graphic.component';
import { FiltersComponent } from './Components/graphics/dashboard/filters/filters.component';

registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    DrawerComponent,
    EmployesComponent,
    AddEditComponent,
    DeleteComponent,
    ReportComponent,
    DashboardComponent,
    BarsGraphicComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    //Material
    MatButtonModule,MatPaginatorModule,MatTableModule,ReactiveFormsModule,
    MatInputModule,MatSelectModule,MatDatepickerModule,NativeDateModule,
    MatSnackBarModule,MatIconModule,MatDialogModule,MatGridListModule,FormsModule,
    MatCardModule,

    //Http
    HttpClientModule,


    //NGZORRO
    NzDrawerModule,NzIconModule,NzButtonModule,


  ],
  providers: [
    provideAnimationsAsync(),
    { provide: NZ_I18N, useValue: en_US },
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
