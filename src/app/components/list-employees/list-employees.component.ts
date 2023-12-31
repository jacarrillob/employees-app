import { Component, OnInit, inject } from '@angular/core';
import { Firestore,  collection, collectionData } from '@angular/fire/firestore'
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/emplyee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss']
})
export class ListEmployeesComponent implements OnInit{

  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;

  employees: Employee[] = []
  loading = false

  constructor(
    private _employeeService: EmployeeService,
    private toastr: ToastrService
  ) {
    const aCollection = collection(this.firestore, 'employees')
    this.items$ = collectionData(aCollection);
  }
  ngOnInit(): void {
      this.getEmployees()
  }

  getEmployees () {
    this.loading = true
    this._employeeService.getAllEmployees().subscribe((data: any) => {
      this.employees = []
      this.employees = data
      this.loading = false
    });
  }

  deleteEmploye(employee: Employee) {
    this._employeeService.deleteEmployee(employee).then(() => {
      this.toastr.warning('Empleado eliminado correctamente..!', 'Eliminado..', {
        positionClass: 'toast-bottom-right'
      });
    }).catch(error => {
      console.error(error)
    })
  }

  }


