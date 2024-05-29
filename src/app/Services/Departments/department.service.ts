
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { DepartmentsInterface } from '../../Interfaces/Departments/departments-interface';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private readonly baseUrl = environment.baseURL;
  private urlAPI = this.baseUrl+"departments/";

  constructor( private http: HttpClient) { }

  getAllDepts():Observable<DepartmentsInterface>{
    return this.http.get<DepartmentsInterface>(`${this.urlAPI}list`);
  }



}
