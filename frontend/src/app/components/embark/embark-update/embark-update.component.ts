import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Embark } from '../shipped.model';
import { Employee } from '../../employee/employee.model';
import { EmployeeService } from './../../employee/employee.service';
import { EmbarkService } from './../embark.service';
import { FormGroup,  Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-embark-update',
  templateUrl: './embark-update.component.html',
  styleUrls: ['./embark-update.component.css']
})
export class EmbarkUpdateComponent implements OnInit {

  employees: Observable<Employee[]>;
  embark: Embark
  public embarkForm: FormGroup;
  

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private embarkService: EmbarkService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.employees = this.employeeService.read();   

    this.embarkForm = this.formBuilder.group({
      employeeId: [null, [Validators.required]],
      shipmentStart: [null, [Validators.required]],
      shipmentEnd: [null, [Validators.required]],
    })

    this.route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        const embark$ = this.embarkService.readById(id);
        embark$.subscribe(embark => {
          this.loadForm(embark);
        });        
      }
    );
    
  }

  loadForm(embark: Embark): void {
    this.embark = embark;
    this.embarkForm.patchValue({      
      employeeId: embark.employeeId,
      shipmentStart: embark.shipmentStart,
      shipmentEnd: embark.shipmentEnd
    })
  }

  update(embarkFormValue): void {
    if (this.embarkForm.valid) {
      this.executeUpdateEmbark(embarkFormValue);
    }
  }
  
  private executeUpdateEmbark = (embarkFormValue) => {

    const param = this.route.snapshot.params['id'];

    let embark: Embark = {
      id: param,
      employeeId: embarkFormValue.employeeId,
      shipmentStart: embarkFormValue.shipmentStart,
      shipmentEnd: embarkFormValue.shipmentEnd
    }

    // console.log(embark);

    this.embarkService.update(embark).subscribe(() => {
      this.embarkService.showMessage('Embark updated!')
      this.router.navigate(['/embarks'])
    })
  }

  cancel(): void {
    this.router.navigate(['/embarks'])
  }
}
