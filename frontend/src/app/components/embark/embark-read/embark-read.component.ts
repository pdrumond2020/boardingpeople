import { EmployeeService } from './../../employee/employee.service';
import { Component, OnInit } from '@angular/core';

import { Embark } from './../shipped.model';
import { EmbarkService } from '../embark.service';
import { Employee } from '../../employee/employee.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-embark-read',
  templateUrl: './embark-read.component.html',
  styleUrls: ['./embark-read.component.css']
})
export class EmbarkReadComponent implements OnInit {

  embarks: Embark[] 
  displayedColumns = ['id', 'employeeId', 'shipmentStart', 'shipmentEnd', 'action']

  employeeIdSelected: number;

  employees: Observable<Employee[]>;
  
  constructor(private embarkService: EmbarkService, private employeeService: EmployeeService) { }

  ngOnInit(): void {

    this.employees = this.employeeService.read();

    this.embarkService.read().subscribe(embarks => {
      this.embarks = embarks;

      this.embarks.forEach((item) => {
        this.employeeService.readById(item.employeeId).subscribe(employee => {
          item.employeeName = employee.name;
        });
      });    

    })
  }

  onChangeFilter(ob): void {
    let employeeIdSelected = ob.value;
    this.embarkService.filter(employeeIdSelected).subscribe(embarks => {
      this.embarks = embarks;
      
      this.embarks.forEach((item) => {
        this.employeeService.readById(item.employeeId).subscribe(employee => {
          item.employeeName = employee.name;
        });
      });   
    })
  }

}
