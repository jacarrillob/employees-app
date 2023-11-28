import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Employee } from '../../models/emplyee.model'
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent {

  createEmployee: FormGroup
  submited = false
  loading = false

  constructor(
    private fb: FormBuilder,
    private _employeeService: EmployeeService,
    private router: Router,
    private toastr: ToastrService
    ) {

    this.createEmployee = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      id_document: ['', Validators.required],
      salary: ['', Validators.required]
    })
  }

  addEmployee() {
    this.submited = true
    if(this.createEmployee.invalid) return

    const employee: Employee = {
      name: this.createEmployee.value.name,
      last_name: this.createEmployee.value.last_name,
      id_document: this.createEmployee.value.id_document,
      salary: this.createEmployee.value.salary,
      create_date: new Date(),
      update_date: new Date()
    }

    this.loading = true

    this._employeeService.addEmployee(employee).then(() => {
      this.toastr.success('El empleado fue registrado conéxito..!', 'Empleado registrado', {
        positionClass: 'toast-bottom-right'
      });
      this.router.navigate(['list-employees'])
    }).catch(error => {
      this.loading = false
      console.log('Error', error);
    })
  }

}
