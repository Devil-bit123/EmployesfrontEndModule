import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EmployesInterface } from '../../Interfaces/Employes/employes-interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeBSService {


  public employeBS = new BehaviorSubject<EmployesInterface[]>([]); // Inicializar con una lista vacía
  constructor() { }

  setEmployees(employees: EmployesInterface[]): void {
    this.employeBS.next(employees); // Actualizar el estado del BS con la lista de empleados
    console.log('employes desde BS',employees);
  }

}
