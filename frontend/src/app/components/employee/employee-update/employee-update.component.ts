import { Employee } from './../employee.model';
import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from './../employee.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  public employeeForm: FormGroup;

  employee: Employee;

  constructor(
    private employeeService: EmployeeService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')

    this.employeeService.readById(id).subscribe(employee => {
      this.employee = employee
    })

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

  updateEmployee(employeeFormValue): void {
    if (this.employeeForm.valid) {
      this.executeEmployeeUpdate(employeeFormValue);
    }
  }

  private executeEmployeeUpdate = (employeeFormValue) => {
    let employee: Employee = {
      name: employeeFormValue.name,
      occupation: employeeFormValue.occupation,
      company: employeeFormValue.company
    }
 
    this.employeeService.update(this.employee).subscribe(() => {
      this.employeeService.showMessage('Employee updated!')
      this.router.navigate(['/employees'])
    })  
  }

  cancel(): void {
    this.router.navigate(['/employees'])
  }

}
