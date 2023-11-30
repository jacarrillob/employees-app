import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Employee } from '../../models/emplyee.model'
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent  implements OnInit{

  title = 'Agregar Empleado'
  btnText = 'Agregar'
  createEmployee: FormGroup
  submited = false
  loading = false
  employeeId: string | null

  constructor(
    private fb: FormBuilder,
    private _employeeService: EmployeeService,
    private router: Router,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute
    ) {

    this.createEmployee = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      id_document: ['', Validators.required],
      salary: ['', Validators.required]
    })

    this.employeeId = this.activeRoute.snapshot.paramMap.get('id')
    if (this.employeeId) {
      this._employeeService.getEmployee(this.employeeId).then((response) => {
        console.log(response);
      })
    }

  }

  ngOnInit(): void {
    this.isEditEmployee()
}

  addEditEmployee() {
    this.submited = true
    if(this.createEmployee.invalid) return

    if(!this.employeeId) {
      this.addEmployee()
    } else {
      this.editEmployee()
    }


  }

  addEmployee() {
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
      console.error('Error', error);
    })
  }

  editEmployee() {
    const employee: any = {
      name: this.createEmployee.value.name,
      last_name: this.createEmployee.value.last_name,
      id_document: this.createEmployee.value.id_document,
      salary: this.createEmployee.value.salary,
      update_date: new Date()
    }

    this.loading = true
    if(!this.employeeId) return
    this._employeeService.updateEmployee(this.employeeId, employee).then(() => {
      this.loading = false
      this.toastr.info('Empleado actualizado correctamente..!', 'Actualización...', {
        positionClass: 'toast-bottom-right'
      });
      this.router.navigate(['list-employees'])
    })
  }

  isEditEmployee() {
    if(!this.employeeId) return
    this.title = 'Editar empleado'
    this.btnText = 'Editar'
    this.loading = true
    this._employeeService.getEmployee(this.employeeId).then((response) => {
      this.loading = false
     this.createEmployee.setValue({
      name: response.name,
      last_name: response.last_name,
      id_document: response.id_document,
      salary: response.salary
     })
    })
  }

}
