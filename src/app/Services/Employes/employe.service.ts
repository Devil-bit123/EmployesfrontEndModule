import { Filter } from './../../Interfaces/Filter/filter';
import { EmployesInterface } from './../../Interfaces/Employes/employes-interface';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private http: HttpClient) { }

  public baseUrl = environment.baseURL;
  private urlAPI = this.baseUrl + "employes/";

  getAllEmployes(): Observable<EmployesInterface[]> {
    return this.http.get<EmployesInterface[]>(`${this.urlAPI}list`);
  }

  addEmploye(model: EmployesInterface): Observable<EmployesInterface> {
    return this.http.post<EmployesInterface>(`${this.urlAPI}save`, model);
  }

  updateEmploye(idEmploye:number, model: EmployesInterface): Observable<EmployesInterface> {
    return this.http.put<EmployesInterface>(`${this.urlAPI}update/${idEmploye}`, model);

  }

  deleteEmploye(idEmploye: number): Observable<void> {
    return this.http.delete<void>(`${this.urlAPI}delete/${idEmploye}`);

  }


  downloadReportEmploye(gte: string, lte: string): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { gte, lte };
    return this.http.post(`${this.urlAPI}report`, body, {
      headers: headers,
      responseType: 'blob'  // Indicamos que esperamos un archivo binario
    });
  }

  employesGraphic(filter:Filter): Observable<any> {

    if(filter.is_download==true){
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const body=filter;
      return this.http.post(`${this.urlAPI}graphic`, body, {
        headers: headers,
        responseType: 'blob'  // Indicamos que esperamos un archivo binario
      });
    }else{
      return this.http.post<void>(`${this.urlAPI}graphic`,filter);
    }

  }



}

