import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, deleteDoc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Employee } from '../models/emplyee.model';
import { Observable } from 'rxjs';
import { setDoc } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  ;

  constructor(
    private firestore: Firestore = inject(Firestore)
  ) {}

  addEmployee(employee: Employee): Promise<any> {
    const employeeRef = collection(this.firestore, 'employees');
    return addDoc(employeeRef, employee)
  }

  getAllEmployees():  Observable<Employee[]> {
    const employeeRef = collection(this.firestore, 'employees')
    return collectionData(employeeRef, { idField: 'id'}) as Observable<Employee[]>;
  }

  async getEmployee (employeeId: string): Promise<Employee> {
  const employeeRef = doc(this.firestore, 'employees', employeeId)
    return (await getDoc(employeeRef)).data() as Promise<Employee>
  }

  deleteEmployee (employee: Employee): Promise<void> {
    const employeeDocRef = doc(this.firestore, `employees/${employee.id}`)
    return deleteDoc(employeeDocRef);
  }

  async updateEmployee(employeeId: string, employee: Employee): Promise<any> {
    const employeeDocRef = doc(this.firestore, 'employees', employeeId)
    return await setDoc(employeeDocRef, employee );
  }
}

