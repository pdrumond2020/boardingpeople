import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Employee } from './../../employee/employee.model';
import { Embark } from './../shipped.model';

import { EmployeeService } from './../../employee/employee.service';
import { EmbarkService } from '../embark.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-embark-create',
  templateUrl: './embark-create.component.html',
  styleUrls: ['./embark-create.component.css']
})
export class EmbarkCreateComponent implements OnInit {

  employees: Observable<Employee[]>;

  public embarkForm: FormGroup;

  lastEmbark: Embark = {
    employeeId: null,
    shipmentStart: null,
    shipmentEnd: null
  }

  embark: Embark = {
    employeeId: null,
    shipmentStart: null,
    shipmentEnd: null
  }
  

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private embarkService: EmbarkService
  ) { }

  ngOnInit(): void {
    this.employees = this.employeeService.read();

    this.embarkForm = this.formBuilder.group({
      employeeId: [null, [Validators.required]],
      shipmentStart: [null, [Validators.required]],
      shipmentEnd: [null, [Validators.required]]
    })
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.embarkForm.controls[controlName].hasError(errorName);
  }

  create(embarkFormValue): void {
    if (this.embarkForm.valid) {
      this.executeCreateForm(embarkFormValue);
    }
  }

  executeCreateForm(embarkFormValue): void {

    let embark: Embark = {
      employeeId: embarkFormValue.employeeId,
      shipmentStart: embarkFormValue.shipmentStart,
      shipmentEnd: embarkFormValue.shipmentEnd
    }

    this.embarkService.last(this.embark.employeeId).subscribe(lastEmbark => {

        if (lastEmbark != null) {

          var lastEndEmbark = new Date(lastEmbark.shipmentEnd);
          var startNewEmbarkDate = new Date(embark.shipmentStart);          
          var endNewEmbarkDate = new Date(embark.shipmentEnd);  
          var daysEmbark = endNewEmbarkDate.getDate() - startNewEmbarkDate.getDate();
          let daysDiff =  startNewEmbarkDate.getDate() - lastEndEmbark.getDate();

          if (daysDiff <= 7) {
            this.embarkService.showMessage('There can be at least 7 days off to board.', true);
          }
          else if (daysEmbark < 0) {
            this.embarkService.showMessage('Start date cannot be greater than end date.', true);
          }
          else if (daysEmbark > 15) {
            this.embarkService.showMessage('Select a maximum of 15 days to embark.', true);
          }
          else {
            this.createEmbark(embark);
          }
        }
        else {
          this.createEmbark(embark);
        }
    });
  }

  createEmbark(embark: Embark) : void {
    this.embarkService.create(this.embark).subscribe(() => {
      this.embarkService.showMessage('Embark created!')
      this.router.navigate(['/embarks'])
    })  
  }

  cancel(): void {
    this.router.navigate(['/embarks'])
  }

}

