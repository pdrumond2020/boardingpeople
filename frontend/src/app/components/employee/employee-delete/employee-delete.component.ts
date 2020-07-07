import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from './../employee.service';
import { Employee } from './../employee.model';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {

  employee: Employee

  constructor(
    private employeeService: EmployeeService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.employeeService.readById(id).subscribe(employee => {
      this.employee = employee
    })
  }

  deleteEmployee(): void {
    this.employeeService.delete(this.employee.id).subscribe(() => {
      this.employeeService.showMessage('Employee deleted!')
      this.router.navigate(['/employees'])
    })
  }

  cancel(): void {
    this.router.navigate(['/employees'])
  }

}
