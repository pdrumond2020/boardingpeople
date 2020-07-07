import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee.model';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly baseUrl = `${environment.API}employee`;  

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success'] 
    })
  }

  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, employee).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  read(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  readById(id: number): Observable<Employee> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Employee>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  update(employee: Employee): Observable<Employee> {
    const url = `${this.baseUrl}/${employee.id}`
    return this.http.put<Employee>(url, employee).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  delete(id: number): Observable<Employee> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Employee>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    console.log(e)
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY
  }
}