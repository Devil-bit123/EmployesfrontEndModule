import { EmployesInterface } from './../../Interfaces/Employes/employes-interface';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor( private http:HttpClient) { }

  private readonly baseUrl = environment.baseURL;
  private urlAPI = this.baseUrl+"departments/";

  getAllEmployes():Observable<EmployesInterface>{
    return this.http.get<EmployesInterface>(`${this.urlAPI}list`);
  }

 addEmploye(model:EmployesInterface):Observable<EmployesInterface>{
  return  this.http.post<EmployesInterface>(`${this.urlAPI}save`,model);
 }

 updateEmploye(idEmploye:number,model:EmployesInterface):Observable<EmployesInterface>{
  return  this.http.put<EmployesInterface>(`${this.urlAPI}update/{idEmploye}`,model);
 }

 deleteEmploye(idEmploye:number):Observable<void>{
  return  this.http.delete<void>(`${this.urlAPI}delete/{idEmploye}`);
 }


}
