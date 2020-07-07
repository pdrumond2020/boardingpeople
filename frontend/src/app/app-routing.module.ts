import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component'
import { EmployeeComponent } from './views/employee/employee.component'
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { EmployeeDeleteComponent } from './components/employee/employee-delete/employee-delete.component';
import { EmployeeUpdateComponent } from './components/employee/employee-update/employee-update.component';
import { EmbarkComponent } from './views/embark/embark.component';
import { EmbarkCreateComponent } from './components/embark/embark-create/embark-create.component';
import { EmbarkUpdateComponent } from './components/embark/embark-update/embark-update.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'employees',
    component: EmployeeComponent
  },
  {
    path: 'employee/create',
    component: EmployeeCreateComponent
  },
  {
    path: 'employee/update/:id',
    component: EmployeeUpdateComponent
  },
  {
    path: 'employee/delete/:id',
    component: EmployeeDeleteComponent
  },
  {
    path: 'embarks',
    component: EmbarkComponent
  },
  {
    path: 'embark/create',
    component: EmbarkCreateComponent
  },
  {
    path: 'embark/update/:id',
    component: EmbarkUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
