
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { NavComponent } from './core/nav/nav.component';
import { EmployeeComponent } from './views/employee/employee.component';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { EmployeeReadComponent } from './components/employee/employee-read/employee-read.component';
import { EmployeeUpdateComponent } from './components/employee/employee-update/employee-update.component'
import { EmployeeDeleteComponent } from './components/employee/employee-delete/employee-delete.component';

import localePt from '@angular/common/locales/pt'
import { registerLocaleData } from '@angular/common';
import { EmbarkComponent } from './views/embark/embark.component';
import { EmbarkCreateComponent } from './components/embark/embark-create/embark-create.component';
import { EmbarkReadComponent } from './components/embark/embark-read/embark-read.component';
import { EmbarkUpdateComponent } from './components/embark/embark-update/embark-update.component';

registerLocaleData(localePt)

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    EmployeeComponent,
    EmployeeCreateComponent,
    EmployeeReadComponent,
    EmployeeUpdateComponent,
    EmployeeDeleteComponent,
    EmbarkComponent,
    EmbarkCreateComponent,
    EmbarkReadComponent,
    EmbarkUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
