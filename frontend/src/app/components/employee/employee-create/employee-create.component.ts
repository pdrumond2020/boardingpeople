import { Component, OnInit } from '@angular/core';

import { Employee } from './../../../components/employee/employee.model';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  public employeeForm: FormGroup;

   employee: Employee = {
    name: '',
    occupation: '',
    company: ''
  }

  constructor(private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      $key: new FormControl(null),
      name: new FormControl('', Validators.required),
      occupation: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required)  
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.employeeForm.controls[controlName].hasError(errorName);
  }

  createEmployee(employeeFormValue): void {
    if (this.employeeForm.valid) {
      this.executeEmployeeCreation(employeeFormValue);
    }
  }

  private executeEmployeeCreation = (employeeFormValue) => {
    let employee: Employee = {
      name: employeeFormValue.name,
      occupation: employeeFormValue.occupation,
      company: employeeFormValue.company
    }
 
    this.employeeService.create(employee).subscribe(() => {
        this.employeeService.showMessage('Employee created!')
        this.router.navigate(['/employees'])
    })    
  }

  cancelEmployee(): void {
    this.router.navigate(['/employees'])
  }

}
