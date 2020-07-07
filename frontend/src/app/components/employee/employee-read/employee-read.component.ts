import { Component, OnInit } from '@angular/core';

import { Employee } from './../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-read',
  templateUrl: './employee-read.component.html',
  styleUrls: ['./employee-read.component.css']
})
export class EmployeeReadComponent implements OnInit {

  employees: Employee[] 
  displayedColumns = ['id', 'name', 'occupation', 'company', 'action']

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.read().subscribe(employees => {
      this.employees = employees
      console.log(employees)
    })
  }

}
