import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root',
})
export class GeneratePDFService {
  constructor() {}

  async generatePdf(reportContainer: string, reportNameWextention: string,reportTitle:string) {
    const data = document.getElementById(reportContainer);

    if (data) {
      const canvas = await html2canvas(data);
      const imgData = canvas.toDataURL('image/png');

      // const pdf = new jsPDF('p', 'mm', 'a4');
      // const imgProps = pdf.getImageProperties(imgData);
      // const pdfWidth = pdf.internal.pageSize.getWidth();
      // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      // pdf.save(reportNameWextention);

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth/1.1;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      const x = ((pdfWidth - imgWidth) )/4;
      const y = ((pdfHeight - imgHeight)/4);
      pdf.text(reportTitle, 10, 10);
      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      pdf.save(reportNameWextention);
    }
  }
}
