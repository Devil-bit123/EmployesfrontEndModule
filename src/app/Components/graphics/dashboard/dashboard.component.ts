import { EmployesInterface } from './../../../Interfaces/Employes/employes-interface';
import { Component } from '@angular/core';
import { BarsGraphicComponent } from './bars-graphic/bars-graphic.component';

import { EmployeService } from '../../../Services/Employes/employe.service';

import { GeneratePDFService } from '../../../Services/Utils/generate-pdf.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private pdfGeneratorService: GeneratePDFService) { }

  generatePDF(){
    //console.log('Tengo que generar un pdf');

    this.pdfGeneratorService.generatePdf('ReportDashboard','Emplyes_Report.pdf','Emplyes Report');


  }

}
