import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { Employee } from '../models/emplyee.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  ;

  constructor(
    private firestore: Firestore = inject(Firestore)
  ) {}

  addEmployee(employee: Employee) {
    const employeeRef = collection(this.firestore, 'employees');
    return addDoc(employeeRef, employee)
  }

  getEmployees():  Observable<Employee[]> {
    const employeeRef = collection(this.firestore, 'employees')
    return collectionData(employeeRef, { idField: 'id'}) as Observable<Employee[]>;
  }

  deleteEmployee (employee: Employee) {
    const employeeDocRef = doc(this.firestore, `employees/${employee.id}`)
    return deleteDoc(employeeDocRef)
  }
}

